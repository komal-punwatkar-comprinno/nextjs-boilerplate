"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useAuth } from "@/hooks/use-auth";
import { usePermissions } from "@/hooks/use-permissions";
import { useSearch } from "@/hooks/use-search";
import { certificationService } from "@/features/certification-progress";
import type { CertificationRecord, MemberCertGroup, CertificationStats } from "@/features/certification-progress";
import { MemberCertCard } from "@/features/certification-progress/components";
import { CertFormModal } from "@/features/certification-progress/components";
import { CertExtensionModal } from "@/features/certification-progress/components";
import { Icon } from "@/components/ui/icon";
import { useToast } from "@/components/ui/toast";
import { Badge, Button, Card, PageHeader, Spinner } from "@/components";

export default function CertificationProgressPage() {
  const { user } = useAuth();
  const { isManagerOrAbove, role } = usePermissions();
  const { query, debouncedQuery, setQuery } = useSearch();

  const [records, setRecords] = useState<CertificationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [statusFilter, setStatusFilter] = useState("");
  const [teamFilter, setTeamFilter] = useState("");

  // Modals
  const [formCert, setFormCert] = useState<CertificationRecord | null | undefined>(undefined); // undefined=closed, null=add, CertRecord=edit
  const [extensionCert, setExtensionCert] = useState<CertificationRecord | null>(null);
  const [showExtRequests, setShowExtRequests] = useState(false);
  const [extRequests, setExtRequests] = useState<CertificationRecord[]>([]);

  const userName = user?.name || user?.email || "";
  const { toast } = useToast();

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const items = await certificationService.list();
      setRecords(items);
    } catch (err) {
      setError("Failed to load certifications.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  // Filters
  const filtered = useMemo(() => {
    return records.filter((c) => {
      if (statusFilter && c.status !== statusFilter) return false;
      if (teamFilter && c.team !== teamFilter) return false;
      if (debouncedQuery) {
        const q = debouncedQuery.toLowerCase();
        const searchable = `${c.certification_name} ${c.member_name} ${c.team} ${c.comments || ""}`.toLowerCase();
        if (!searchable.includes(q)) return false;
      }
      return true;
    });
  }, [records, statusFilter, teamFilter, debouncedQuery]);

  // Stats
  const stats: CertificationStats = useMemo(() => ({
    total: filtered.length,
    completed: filtered.filter((c) => c.status === "Completed").length,
    inProgress: filtered.filter((c) => c.status === "In Progress").length,
    notStarted: filtered.filter((c) => c.status === "Not started").length,
  }), [filtered]);

  // Group by member
  const groups: MemberCertGroup[] = useMemo(() => {
    const map: Record<string, MemberCertGroup> = {};
    filtered.forEach((c) => {
      const key = c.member_name || "Unknown";
      if (!map[key]) map[key] = { member: key, team: c.team || "", certifications: [] };
      map[key].certifications.push(c);
    });
    return Object.values(map).sort((a, b) => a.member.localeCompare(b.member));
  }, [filtered]);

  const teams = useMemo(() => [...new Set(records.map((c) => c.team).filter(Boolean))].sort() as string[], [records]);

  // Handlers
  const handleDelete = useCallback(async (recordId: string, name: string) => {
    if (!confirm(`Delete certification "${name}"?`)) return;
    try {
      await certificationService.delete(recordId);
      setRecords((prev) => prev.filter((c) => c.record_id !== recordId));
    } catch { toast({ message: "Delete failed.", variant: "error" }); }
  }, [toast]);

  const clearFilters = () => { setStatusFilter(""); setTeamFilter(""); setQuery(""); };

  if (loading) return <div className="flex h-64 items-center justify-center"><Spinner size="lg" /></div>;
  if (error) return <div className="flex h-64 flex-col items-center justify-center gap-2"><Icon name="xCircle" size="lg" className="text-red-500" /><p className="text-sm text-slate-600 dark:text-slate-400">{error}</p></div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <PageHeader
          title={role === "member" ? "My Certifications" : role === "manager" ? "Team Certifications" : "All Certifications"}
          description={`${stats.total} certification${stats.total !== 1 ? "s" : ""}`}
        />
        <div className="flex gap-2">
          {isManagerOrAbove && (
            <Button variant="secondary" size="sm" onClick={async () => {
              const reqs = await certificationService.getExtensionRequests();
              setExtRequests(reqs);
              setShowExtRequests(true);
            }}>
              <Icon name="clock" size="sm" /> Extension Requests
            </Button>
          )}
          <Button variant="primary" size="sm" onClick={() => setFormCert(null)}>
            <Icon name="plus" size="sm" /> {role === "member" ? "Add My Certification" : "Add Certification"}
          </Button>
        </div>
      </div>

      {/* Stats bar (admin/manager) */}
      {isManagerOrAbove && (
        <div className="grid grid-cols-4 gap-3">
          <Card className="p-3 text-center">
            <p className="text-lg font-bold text-slate-800 dark:text-white">{stats.total}</p>
            <p className="text-xs text-slate-500">Total</p>
          </Card>
          <Card className="p-3 text-center">
            <p className="text-lg font-bold text-emerald-600">{stats.completed}</p>
            <p className="text-xs text-slate-500">Completed</p>
          </Card>
          <Card className="p-3 text-center">
            <p className="text-lg font-bold text-blue-600">{stats.inProgress}</p>
            <p className="text-xs text-slate-500">In Progress</p>
          </Card>
          <Card className="p-3 text-center">
            <p className="text-lg font-bold text-slate-500">{stats.notStarted}</p>
            <p className="text-xs text-slate-500">Not Started</p>
          </Card>
        </div>
      )}

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Icon name="search" size="sm" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search certifications..." value={query} onChange={(e) => setQuery(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-[#1b2a49] focus:ring-1 focus:ring-[#1b2a49] dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white" />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white">
            <option value="">All Status</option>
            <option value="Not started">Not started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          {teams.length > 0 && isManagerOrAbove && (
            <select value={teamFilter} onChange={(e) => setTeamFilter(e.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white">
              <option value="">All Teams</option>
              {teams.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          )}
          {(statusFilter || teamFilter || query) && (
            <button onClick={clearFilters} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-[#2D3640]">Clear</button>
          )}
        </div>
      </Card>

      {/* Content */}
      {filtered.length === 0 ? (
        <div className="flex h-40 flex-col items-center justify-center gap-2 text-slate-400">
          <Icon name="clipboard" size="lg" />
          <p className="text-sm">No certifications found</p>
        </div>
      ) : (
        <div className={role === "member" ? "space-y-4" : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"}>
          {groups.map((group) => (
            <MemberCertCard
              key={group.member}
              group={group}
              userRole={role}
              userName={userName}
              onEdit={(cert) => setFormCert(cert)}
              onDelete={handleDelete}
              onRequestExtension={setExtensionCert}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      {formCert !== undefined && (
        <CertFormModal
          cert={formCert}
          userRole={role}
          userName={userName}
          onClose={() => setFormCert(undefined)}
          onSaved={() => { setFormCert(undefined); loadData(); }}
        />
      )}
      {extensionCert && (
        <CertExtensionModal
          cert={extensionCert}
          onClose={() => setExtensionCert(null)}
          onSubmitted={() => { setExtensionCert(null); loadData(); }}
        />
      )}
      {showExtRequests && (
        <ExtensionRequestsModal
          requests={extRequests}
          onClose={() => setShowExtRequests(false)}
          onAction={async (recordId, action, reason) => {
            if (action === "approve") await certificationService.approveExtension(recordId);
            else await certificationService.rejectExtension(recordId, reason || "");
            const reqs = await certificationService.getExtensionRequests();
            setExtRequests(reqs);
            loadData();
          }}
        />
      )}
    </div>
  );
}



// ─── Extension Requests Modal (admin/manager) ────────────────────────────────

function ExtensionRequestsModal({ requests, onClose, onAction }: {
  requests: CertificationRecord[];
  onClose: () => void;
  onAction: (recordId: string, action: "approve" | "reject", reason?: string) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" onClick={onClose}>
      <div className="w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-xl bg-white p-6 shadow-2xl dark:bg-[#242B33]" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">Extension Requests</h2>
          <button onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-[#2D3640]"><Icon name="x" size="sm" /></button>
        </div>

        {requests.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-500">No pending extension requests.</p>
        ) : (
          <div className="space-y-3">
            {requests.map((req) => (
              <div key={req.record_id} className="rounded-lg border border-slate-200 p-4 dark:border-[#2D3640]">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-white">{req.member_name}</p>
                    <p className="text-xs text-slate-500">{req.certification_name}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      Current: {req.target_date || "Not set"} → Requested: {req.extension_new_date}
                    </p>
                    {req.extension_reason && (
                      <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 italic">"{req.extension_reason}"</p>
                    )}
                  </div>
                  <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">Pending</Badge>
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => onAction(req.record_id, "approve")}
                    className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700"
                  >
                    ✓ Approve
                  </button>
                  <button
                    onClick={() => {
                      const reason = prompt("Reason for rejection:");
                      if (reason) onAction(req.record_id, "reject", reason);
                    }}
                    className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700"
                  >
                    ✕ Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
