"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useAuth } from "@/hooks/use-auth";
import { usePermissions } from "@/hooks/use-permissions";
import { useSearch } from "@/hooks/use-search";
import { learningProgressService } from "@/features/learning-progress";
import type {
  TrainingAssignment,
  EnrichedTrainingRecord,
  MemberGroup,
} from "@/features/learning-progress";
import {
  TrainingCard,
  ProgressRing,
  CurriculumModal,
  EditProgressModal,
  ExtensionModal,
  AssignTrainingModal,
  BulkAssignModal,
  LPExtensionRequestsModal,
} from "@/features/learning-progress/components";
import { Icon } from "@/components/ui/icon";
import { useToast } from "@/components/ui/toast";
import { Badge, Card, PageHeader, Spinner } from "@/components";

// ─── Enrichment Logic ────────────────────────────────────────────────────────

function enrichRecord(record: TrainingAssignment): EnrichedTrainingRecord {
  const now = new Date();
  const endDate = record.target_date ? new Date(record.target_date) : null;
  const startDate = record.assigned_date ? new Date(record.assigned_date) : null;

  let progress = 0;
  if (record.status === "Completed") {
    progress = 100;
  } else if (record.curriculum && record.curriculum.length > 0) {
    const completed = record.curriculum.filter((c) => c.status === "Completed").length;
    progress = Math.round((completed / record.curriculum.length) * 100);
  } else if (record.status === "In Progress" && startDate && endDate) {
    const total = endDate.getTime() - startDate.getTime();
    const elapsed = now.getTime() - startDate.getTime();
    progress = Math.min(Math.max(Math.round((elapsed / total) * 100), 0), 99);
  }

  let isDelayed = false;
  const delayedWeeks: { week: number; incomplete: number; total: number }[] = [];

  if (record.curriculum && record.curriculum.length > 0 && record.status === "In Progress" && startDate) {
    const msPerWeek = 7 * 24 * 60 * 60 * 1000;
    const currentWeek = Math.ceil((now.getTime() - startDate.getTime()) / msPerWeek);
    const weekItems: Record<number, typeof record.curriculum> = {};
    record.curriculum.forEach((c) => {
      const w = Number(c.week) || 1;
      if (!weekItems[w]) weekItems[w] = [];
      weekItems[w].push(c);
    });
    Object.entries(weekItems).forEach(([week, items]) => {
      const w = parseInt(week);
      if (w < currentWeek) {
        const incomplete = items.filter((i) => i.status !== "Completed").length;
        if (incomplete > 0) {
          isDelayed = true;
          delayedWeeks.push({ week: w, incomplete, total: items.length });
        }
      }
    });
  }

  if (record.status !== "Completed" && endDate && now > endDate) isDelayed = true;
  if (record.status !== "Completed" && (record.extension_status === "pending" || record.extension_status === "approved")) isDelayed = true;

  const effective_status =
    progress === 100 && record.status !== "Completed"
      ? "Completed"
      : progress > 0 && progress < 100 && record.status === "Not Started"
        ? "In Progress"
        : record.status;

  return {
    ...record,
    progress,
    isDelayed,
    delayedWeeks,
    effective_status,
    display_name: record.user_name || record.user_id || record.user_email || "Unknown",
    display_course: record.training || record.course_name || "Unnamed Course",
    display_team: record.team || "N/A",
  };
}

function groupByMember(records: EnrichedTrainingRecord[]): MemberGroup[] {
  const groups: Record<string, MemberGroup> = {};
  records.forEach((r) => {
    if (!groups[r.user_email]) {
      groups[r.user_email] = {
        email: r.user_email,
        name: r.display_name,
        team: r.display_team,
        records: [],
        stats: { completed: 0, inProgress: 0, notStarted: 0, overdue: 0 },
        totalProgress: 0,
      };
    }
    groups[r.user_email].records.push(r);
    if (r.effective_status === "Completed") groups[r.user_email].stats.completed++;
    else if (r.effective_status === "In Progress") groups[r.user_email].stats.inProgress++;
    else groups[r.user_email].stats.notStarted++;
    if (r.isDelayed) groups[r.user_email].stats.overdue++;
  });
  return Object.values(groups).map((g) => ({
    ...g,
    totalProgress: g.records.length > 0
      ? Math.round(g.records.reduce((sum, r) => sum + r.progress, 0) / g.records.length)
      : 0,
  }));
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function LearningProgressPage() {
  const { user } = useAuth();
  const { isAdmin, isManagerOrAbove, role } = usePermissions();
  const { query, debouncedQuery, setQuery } = useSearch();
  const { toast } = useToast();

  const [records, setRecords] = useState<EnrichedTrainingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [statusFilter, setStatusFilter] = useState("");
  const [teamFilter, setTeamFilter] = useState("");
  const [extensionFilter, setExtensionFilter] = useState("");
  const [memberFilter, setMemberFilter] = useState("");

  // Expanded members (for admin/manager grouped view)
  const [expandedMembers, setExpandedMembers] = useState<Set<string>>(new Set());

  // Modal state
  const [curriculumRecord, setCurriculumRecord] = useState<EnrichedTrainingRecord | null>(null);
  const [editRecord, setEditRecord] = useState<EnrichedTrainingRecord | null>(null);
  const [extensionRecord, setExtensionRecord] = useState<EnrichedTrainingRecord | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [showExtRequestsModal, setShowExtRequestsModal] = useState(false);

  // Load data
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const items = await learningProgressService.list();
      const map = new Map<string, TrainingAssignment>();
      items.forEach((r) => {
        const key = `${r.user_email}_${r.course_name || r.training}`;
        const existing = map.get(key);
        if (!existing || new Date(r.assigned_date || 0) > new Date(existing.assigned_date || 0)) {
          map.set(key, r);
        }
      });
      setRecords(Array.from(map.values()).map(enrichRecord));
    } catch (err) {
      setError("Failed to load learning progress data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  // Delete handler
  const handleDelete = useCallback(async (progressId: string) => {
    if (!confirm("Are you sure you want to delete this record?")) return;
    try {
      await learningProgressService.delete(progressId);
      setRecords((prev) => prev.filter((r) => r.progress_id !== progressId));
    } catch (err) {
      toast({ message: "Failed to delete record.", variant: "error" });
    }
  }, [toast]);

  // Filter logic
  const filtered = useMemo(() => {
    return records.filter((r) => {
      if (statusFilter) {
        if (statusFilter === "Delayed") { if (!r.isDelayed) return false; }
        else if (r.effective_status !== statusFilter) return false;
      }
      if (teamFilter && r.display_team !== teamFilter) return false;
      if (memberFilter && r.user_email !== memberFilter) return false;
      if (extensionFilter === "pending" && r.extension_status !== "pending") return false;
      if (extensionFilter === "approved" && r.extension_status !== "approved") return false;
      if (extensionFilter === "rejected" && r.extension_status !== "rejected") return false;
      if (extensionFilter === "none" && (r.extension_status === "pending" || r.extension_status === "approved" || r.extension_status === "rejected")) return false;
      if (extensionFilter === "delayed" && !r.isDelayed) return false;
      if (debouncedQuery) {
        const q = debouncedQuery.toLowerCase();
        const searchable = `${r.display_name} ${r.display_course} ${r.user_email} ${r.display_team}`.toLowerCase();
        if (!searchable.includes(q)) return false;
      }
      return true;
    });
  }, [records, statusFilter, teamFilter, extensionFilter, debouncedQuery]);

  const teams = useMemo(() => [...new Set(records.map((r) => r.display_team))].filter((t) => t !== "N/A").sort(), [records]);
  const uniqueMembers = useMemo(() => {
    const map = new Map<string, string>();
    records.forEach((r) => map.set(r.user_email, r.display_name));
    return Array.from(map.entries()).sort(([, a], [, b]) => a.localeCompare(b));
  }, [records]);
  const memberGroups = useMemo(() => groupByMember(filtered), [filtered]);

  const toggleMember = useCallback((email: string) => {
    setExpandedMembers((prev) => {
      const next = new Set(prev);
      if (next.has(email)) next.delete(email); else next.add(email);
      return next;
    });
  }, []);

  const clearFilters = () => { setStatusFilter(""); setTeamFilter(""); setExtensionFilter(""); setMemberFilter(""); setQuery(""); };

  // Export to CSV
  const handleExport = useCallback(() => {
    const csv = ["User,Email,Course,Status,Progress,Start,End,Team"].concat(
      filtered.map((r) => `"${r.display_name}","${r.user_email}","${r.display_course}","${r.effective_status}","${r.progress}%","${r.assigned_date || ""}","${r.target_date || ""}","${r.display_team}"`)
    ).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `learning-progress-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [filtered]);

  if (loading) {
    return <div className="flex h-64 items-center justify-center"><Spinner size="lg" /></div>;
  }

  if (error) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-2">
        <Icon name="xCircle" size="lg" className="text-red-500" />
        <p className="text-sm text-slate-600 dark:text-slate-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] space-y-6">
      {/* ── Header with action buttons ── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <PageHeader
          title="Learning Progress"
          description={`${filtered.length} training record${filtered.length !== 1 ? "s" : ""}`}
        />
        <div className="flex flex-wrap gap-2">
          {isManagerOrAbove && (
            <button onClick={() => setShowExtRequestsModal(true)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-[#2D3640] dark:bg-[#242B33] dark:text-slate-300">
              <Icon name="clock" size="sm" className="mr-1 inline" /> Extension Requests
            </button>
          )}
          {isAdmin && (
            <button onClick={() => setShowAssignModal(true)} className="rounded-lg bg-[#1b2a49] px-3 py-2 text-xs font-medium text-white hover:bg-[#2a3d5f]">
              <Icon name="plus" size="sm" className="mr-1 inline" /> Assign Training
            </button>
          )}
          {isAdmin && (
            <button onClick={() => setShowBulkModal(true)} className="rounded-lg border border-[#1b2a49] px-3 py-2 text-xs font-medium text-[#1b2a49] hover:bg-[#1b2a49]/5 dark:border-[#ff9472] dark:text-[#ff9472]">
              <Icon name="users" size="sm" className="mr-1 inline" /> Bulk Assign
            </button>
          )}
          {isManagerOrAbove && (
            <button onClick={handleExport} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-[#2D3640] dark:bg-[#242B33] dark:text-slate-300">
              <Icon name="download" size="sm" className="mr-1 inline" /> Export
            </button>
          )}
        </div>
      </div>

      {/* ── Filters ── */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Icon name="search" size="sm" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, course, or email..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-[#4CCBBF] focus:ring-1 focus:ring-[#4CCBBF] dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white"
            />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white">
            <option value="">All Status</option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Delayed">Delayed</option>
          </select>
          {teams.length > 0 && isManagerOrAbove && (
            <select value={teamFilter} onChange={(e) => setTeamFilter(e.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white">
              <option value="">All Teams</option>
              {teams.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          )}
          {isManagerOrAbove && uniqueMembers.length > 0 && (
            <select value={memberFilter} onChange={(e) => setMemberFilter(e.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white">
              <option value="">All Members</option>
              {uniqueMembers.map(([email, name]) => <option key={email} value={email}>{name}</option>)}
            </select>
          )}
          {isManagerOrAbove && (
            <select value={extensionFilter} onChange={(e) => setExtensionFilter(e.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white">
              <option value="">All Extensions</option>
              <option value="pending">Pending Approval</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="none">No Extension</option>
              <option value="delayed">Delayed</option>
            </select>
          )}
          {(statusFilter || teamFilter || extensionFilter || memberFilter || query) && (
            <button onClick={clearFilters} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-[#2D3640]">
              Clear
            </button>
          )}
        </div>
      </Card>

      {/* ── Content ── */}
      {filtered.length === 0 ? (
        <div className="flex h-40 flex-col items-center justify-center gap-2 text-slate-400">
          <Icon name="clipboard" size="lg" />
          <p className="text-sm">No training records found</p>
        </div>
      ) : role === "member" ? (
        <div className="space-y-3">
          {filtered.map((r) => (
            <TrainingCard
              key={r.progress_id}
              record={r}
              userRole={role}
              userEmail={user?.email || ""}
              onViewCurriculum={setCurriculumRecord}
              onEditProgress={setEditRecord}
              onRequestExtension={setExtensionRecord}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {memberGroups.map((group) => (
            <MemberGroupCard
              key={group.email}
              group={group}
              isExpanded={expandedMembers.has(group.email)}
              onToggle={() => toggleMember(group.email)}
              userRole={role}
              userEmail={user?.email || ""}
              onViewCurriculum={setCurriculumRecord}
              onEditProgress={setEditRecord}
              onRequestExtension={setExtensionRecord}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* ── Modals ── */}
      {curriculumRecord && (
        <CurriculumModal
          record={curriculumRecord}
          onClose={() => setCurriculumRecord(null)}
          onSaved={() => { setCurriculumRecord(null); loadData(); }}
        />
      )}
      {editRecord && (
        <EditProgressModal
          record={editRecord}
          onClose={() => setEditRecord(null)}
          onSaved={() => { setEditRecord(null); loadData(); }}
        />
      )}
      {extensionRecord && (
        <ExtensionModal
          record={extensionRecord}
          onClose={() => setExtensionRecord(null)}
          onSubmitted={() => { setExtensionRecord(null); loadData(); }}
        />
      )}
      {showAssignModal && (
        <AssignTrainingModal
          onClose={() => setShowAssignModal(false)}
          onAssigned={() => { setShowAssignModal(false); loadData(); }}
        />
      )}
      {showBulkModal && (
        <BulkAssignModal
          onClose={() => setShowBulkModal(false)}
          onAssigned={() => { setShowBulkModal(false); loadData(); }}
        />
      )}
      {showExtRequestsModal && (
        <LPExtensionRequestsModal
          onClose={() => setShowExtRequestsModal(false)}
          onAction={loadData}
        />
      )}
    </div>
  );
}

// ─── Member Group Card (admin/manager view) ──────────────────────────────────

function MemberGroupCard({
  group, isExpanded, onToggle, userRole, userEmail, onViewCurriculum, onEditProgress, onRequestExtension, onDelete,
}: {
  group: MemberGroup;
  isExpanded: boolean;
  onToggle: () => void;
  userRole: string;
  userEmail: string;
  onViewCurriculum: (r: EnrichedTrainingRecord) => void;
  onEditProgress: (r: EnrichedTrainingRecord) => void;
  onRequestExtension: (r: EnrichedTrainingRecord) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <Card className="overflow-hidden">
      <button onClick={onToggle} className="flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-slate-50 dark:hover:bg-[#2D3640]/40">
        <Icon name="chevronRight" size="sm" className={`shrink-0 text-slate-400 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-slate-800 dark:text-white">{group.name}</p>
            <Badge className="bg-slate-100 text-slate-500 text-[10px] dark:bg-slate-700 dark:text-slate-400">{group.team}</Badge>
          </div>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{group.records.length} training{group.records.length !== 1 ? "s" : ""}</p>
        </div>
        <ProgressRing value={group.totalProgress} />
        <div className="hidden items-center gap-3 text-xs sm:flex">
          <span className="text-emerald-600">{group.stats.completed} ✓</span>
          <span className="text-blue-600">{group.stats.inProgress} ◐</span>
          <span className="text-slate-500">{group.stats.notStarted} ○</span>
          {group.stats.overdue > 0 && <span className="text-red-600">{group.stats.overdue} !</span>}
        </div>
      </button>
      {isExpanded && (
        <div className="space-y-2 border-t border-slate-100 bg-slate-50/50 p-3 dark:border-[#2D3640] dark:bg-[#1C2127]/50">
          {group.records.map((r) => (
            <TrainingCard
              key={r.progress_id}
              record={r}
              userRole={userRole}
              userEmail={userEmail}
              onViewCurriculum={onViewCurriculum}
              onEditProgress={onEditProgress}
              onRequestExtension={onRequestExtension}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </Card>
  );
}
