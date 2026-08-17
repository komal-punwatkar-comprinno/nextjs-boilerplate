"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useAuth } from "@/hooks/use-auth";
import { usePermissions } from "@/hooks/use-permissions";
import { useSearch } from "@/hooks/use-search";
import { skillsetHeatmapService } from "@/features/skillset-heatmap";
import type { HeatmapMember, SkillData, SkillTemplate } from "@/features/skillset-heatmap";
import { RatingModal, MemberDetailModal, SkillChartsModal } from "@/features/skillset-heatmap/components";
import { Icon } from "@/components/ui/icon";
import { Button, Card, PageHeader, Spinner } from "@/components";

const RATING_COLORS = ["bg-slate-200", "bg-red-300", "bg-orange-300", "bg-amber-300", "bg-emerald-400"];

function getMemberStats(member: HeatmapMember) {
  const skills = Object.values(member.skills || {});
  const skillCount = skills.length;
  const totalRating = skills.reduce((sum, s) => sum + (s.rating || 0), 0);
  const avgRating = skillCount > 0 ? parseFloat((totalRating / skillCount).toFixed(1)) : 0;
  const ratingColor = avgRating >= 3 ? "text-emerald-600" : avgRating >= 2 ? "text-amber-600" : avgRating >= 1 ? "text-orange-600" : "text-slate-400";
  return { avgRating, skillCount, ratingColor };
}

export default function SkillsetHeatmapPage() {
  const { user } = useAuth();
  const { isAdmin, isManagerOrAbove, role } = usePermissions();
  const { query, debouncedQuery, setQuery } = useSearch();

  const [members, setMembers] = useState<HeatmapMember[]>([]);
  const [templates, setTemplates] = useState<SkillTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [teamFilter, setTeamFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [templateFilter, setTemplateFilter] = useState("");
  const [viewMode, setViewMode] = useState<"individual-cards" | "team-cards">("individual-cards");

  // Modals
  const [detailMember, setDetailMember] = useState<HeatmapMember | null>(null);
  const [chartsMember, setChartsMember] = useState<HeatmapMember | null>(null);
  const [ratingTarget, setRatingTarget] = useState<{ userEmail: string; memberName: string; skillName: string; skillData: SkillData } | null>(null);
  const [showPending, setShowPending] = useState(false);
  const [showAssign, setShowAssign] = useState(false);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [membersData, templatesData] = await Promise.all([
        skillsetHeatmapService.getHeatmap(),
        skillsetHeatmapService.getTemplates(),
      ]);

      // Enrich skills with template_name if missing
      const tplSkillMap: Record<string, string> = {};
      (templatesData.templates || []).forEach((t) => {
        const skills = typeof t.skills === "string" ? t.skills.split(",").map((s) => s.trim()) : Array.isArray(t.skills) ? t.skills : [];
        skills.forEach((s) => { if (s) tplSkillMap[s] = t.template_name; });
      });
      membersData.forEach((m) => {
        Object.entries(m.skills || {}).forEach(([name, data]) => {
          if (!data.template_name && tplSkillMap[name]) data.template_name = tplSkillMap[name];
        });
      });

      setMembers(membersData);
      setTemplates(templatesData.templates || []);
    } catch (err) {
      setError("Failed to load heatmap data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  // Filter
  const filtered = useMemo(() => {
    return members.filter((m) => {
      if (role === "member" && m.user_email !== user?.email) return false;
      if (role === "manager" && m.team !== user?.team) return false;
      if (teamFilter && m.team !== teamFilter) return false;
      if (levelFilter) {
        const target = parseInt(levelFilter);
        if (!Object.values(m.skills || {}).some((s) => (s.rating || 0) === target)) return false;
      }
      if (templateFilter) {
        if (!Object.values(m.skills || {}).some((s) => s.template_name === templateFilter)) return false;
      }
      if (debouncedQuery) {
        const q = debouncedQuery.toLowerCase();
        if (!m.member_name.toLowerCase().includes(q) && !m.user_email.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [members, role, user, teamFilter, levelFilter, templateFilter, debouncedQuery]);

  const teams = useMemo(() => [...new Set(members.map((m) => m.team).filter(Boolean))].sort() as string[], [members]);

  // Team view grouping
  const teamGroups = useMemo(() => {
    if (viewMode !== "team-cards") return null;
    const groups: Record<string, { members: number; totalRating: number; skillCount: number; templates: Set<string> }> = {};
    filtered.forEach((m) => {
      const team = m.team || "No Team";
      if (!groups[team]) groups[team] = { members: 0, totalRating: 0, skillCount: 0, templates: new Set() };
      groups[team].members++;
      Object.values(m.skills || {}).forEach((s) => {
        groups[team].totalRating += s.rating || 0;
        groups[team].skillCount++;
        if (s.template_name) groups[team].templates.add(s.template_name);
      });
    });
    return groups;
  }, [filtered, viewMode]);

  const clearFilters = () => { setTeamFilter(""); setLevelFilter(""); setTemplateFilter(""); setQuery(""); };

  if (loading) return <div className="flex h-64 items-center justify-center"><Spinner size="lg" /></div>;
  if (error) return <div className="flex h-64 flex-col items-center justify-center gap-2"><Icon name="xCircle" size="lg" className="text-red-500" /><p className="text-sm text-slate-600 dark:text-slate-400">{error}</p></div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <PageHeader title="Skillset Heatmap" description={`${filtered.length} member${filtered.length !== 1 ? "s" : ""}`} />
        <div className="flex items-center gap-2">
          {/* Admin/Manager actions */}
          {isManagerOrAbove && (
            <button onClick={() => setShowPending(true)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-[#2D3640] dark:bg-[#242B33] dark:text-slate-300 dark:hover:bg-[#2D3640]">
              <Icon name="clipboard" size="sm" className="mr-1 inline" /> Pending Ratings
            </button>
          )}
          {isAdmin && (
            <button onClick={() => setShowAssign(true)} className="rounded-lg bg-[#1b2a49] px-3 py-2 text-xs font-medium text-white hover:bg-[#2a3d5f]">
              <Icon name="plus" size="sm" className="mr-1 inline" /> Assign Framework
            </button>
          )}
        </div>
      </div>

      {/* Rating Legend */}
      {isManagerOrAbove && (
        <Card className="px-4 py-3">
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="font-medium text-slate-700 dark:text-slate-300">Skill Levels:</span>
            {[
              { label: "None", dot: "bg-slate-300" },
              { label: "Basic", dot: "bg-red-300" },
              { label: "Intermediate", dot: "bg-orange-300" },
              { label: "Advanced", dot: "bg-amber-400" },
              { label: "Expert", dot: "bg-emerald-400" },
            ].map(({ label, dot }, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <span className={`h-2.5 w-2.5 rounded-full ${dot}`} />
                <span>{i} - {label}</span>
              </span>
            ))}
          </div>
        </Card>
      )}

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* View mode */}
          {isManagerOrAbove && (
            <select value={viewMode} onChange={(e) => setViewMode(e.target.value as typeof viewMode)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white">
              <option value="individual-cards">Individual - Cards</option>
              <option value="team-cards">Team - Cards</option>
            </select>
          )}

          {/* Search */}
          {isManagerOrAbove && (
            <div className="relative flex-1 min-w-[160px]">
              <Icon name="search" size="sm" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search member..." value={query} onChange={(e) => setQuery(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-[#1b2a49] focus:ring-1 focus:ring-[#1b2a49] dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white" />
            </div>
          )}

          {/* Team filter */}
          {teams.length > 0 && isAdmin && (
            <select value={teamFilter} onChange={(e) => setTeamFilter(e.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white">
              <option value="">All Teams</option>
              {teams.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          )}

          {/* Template filter */}
          {templates.length > 0 && (
            <select value={templateFilter} onChange={(e) => setTemplateFilter(e.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white">
              <option value="">All Templates</option>
              {templates.map((t) => <option key={t.template_id} value={t.template_name}>{t.template_name}</option>)}
            </select>
          )}

          {/* Level filter */}
          <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white">
            <option value="">All Levels</option>
            <option value="0">0 - None</option>
            <option value="1">1 - Basic</option>
            <option value="2">2 - Intermediate</option>
            <option value="3">3 - Advanced</option>
            <option value="4">4 - Expert</option>
          </select>

          {(teamFilter || levelFilter || templateFilter || query) && (
            <button onClick={clearFilters} className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400">✕ Clear</button>
          )}
        </div>
      </Card>

      {/* Content */}
      {filtered.length === 0 ? (
        <div className="flex h-48 flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 dark:border-[#2D3640] dark:bg-[#1C2127]/50">
          <div className="rounded-full bg-slate-100 p-3 dark:bg-[#2D3640]">
            <Icon name="gridCells" size="lg" className="text-slate-300 dark:text-slate-500" />
          </div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">No members found</p>
          <p className="text-xs text-slate-400 dark:text-slate-500">Try adjusting your filters or assign a framework</p>
        </div>
      ) : viewMode === "team-cards" && teamGroups ? (
        /* Team View */
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(teamGroups).map(([team, stats]) => {
            const avg = stats.skillCount > 0 ? (stats.totalRating / stats.skillCount).toFixed(1) : "0";
            const avgNum = parseFloat(avg);
            const ratingColor = avgNum >= 3 ? "text-emerald-600 dark:text-emerald-400" : avgNum >= 2 ? "text-amber-600 dark:text-amber-400" : "text-red-600 dark:text-red-400";
            return (
              <Card key={team} className="overflow-hidden border border-slate-200/80 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 dark:border-[#2D3640]">
                <div className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1b2a49] to-[#2a3d5f] text-xs font-bold text-white shadow-sm">
                      {team.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-800 dark:text-white">{team}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{stats.members} members · {stats.skillCount} ratings</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-xl font-bold ${ratingColor}`}>★ {avg}</p>
                      <p className="text-[10px] text-slate-400">avg rating</p>
                    </div>
                  </div>
                  {stats.templates.size > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-[#2D3640]">
                      {Array.from(stats.templates).slice(0, 4).map((t) => (
                        <span key={t} className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-[#2D3640] dark:text-slate-400">{t}</span>
                      ))}
                      {stats.templates.size > 4 && <span className="text-[10px] text-slate-400">+{stats.templates.size - 4} more</span>}
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        /* Individual Cards View */
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((member) => {
            const { avgRating, skillCount, ratingColor } = getMemberStats(member);
            const skills = Object.entries(member.skills || {});

            return (
              <Card key={member.user_email} className="flex flex-col overflow-hidden border border-slate-200/80 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 dark:border-[#3D4A5C] dark:bg-[#242B33] dark:hover:border-[#4CCBBF]/30">
                <div className="p-5 flex flex-col flex-1">
                {/* Header: avatar + name + rating */}
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1b2a49] to-[#2a3d5f] text-sm font-bold text-white shadow-sm dark:from-[#4CCBBF] dark:to-[#3AAFA4] dark:text-[#1C2127]">
                    {member.member_name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate dark:text-white">{member.member_name}</p>
                    {member.team && <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-[#2D3640] dark:text-slate-300">{member.team}</span>}
                  </div>
                  <div className="text-right">
                    <p className={`text-xl font-bold ${ratingColor} dark:text-white`}>★ {avgRating}</p>
                    <p className="text-[10px] text-slate-400">{skillCount} skills</p>
                  </div>
                </div>

                {skills.length === 0 && <p className="mt-4 text-xs text-slate-400 italic">No skills assigned</p>}

                {/* Actions */}
                <div className="mt-auto flex gap-2 pt-4 border-t border-slate-100 dark:border-[#3D4A5C]/50 mt-4">
                  <Button variant="secondary" size="sm" className="flex-1" leftIcon={<Icon name="clipboard" size="sm" />} onClick={() => setDetailMember(member)}>
                    Skills
                  </Button>
                  {skills.length > 0 && (
                    <Button variant="secondary" size="sm" className="flex-1" onClick={() => setChartsMember(member)}>
                      📊 Charts
                    </Button>
                  )}
                </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Modals */}
      {detailMember && (
        <MemberDetailModal
          member={detailMember}
          currentUserRole={role}
          currentUserEmail={user?.email || ""}
          currentUserName={user?.name || user?.email || ""}
          onClose={() => setDetailMember(null)}
          onDataChanged={() => { setDetailMember(null); loadData(); }}
        />
      )}
      {chartsMember && (
        <SkillChartsModal member={chartsMember} onClose={() => setChartsMember(null)} />
      )}
      {ratingTarget && (
        <RatingModal
          userEmail={ratingTarget.userEmail}
          memberName={ratingTarget.memberName}
          skillName={ratingTarget.skillName}
          skillData={ratingTarget.skillData}
          currentUserName={user?.name || user?.email || ""}
          currentUserRole={role}
          onClose={() => setRatingTarget(null)}
          onSaved={() => { setRatingTarget(null); loadData(); }}
        />
      )}
      {showPending && (
        <PendingRatingsModal onClose={() => setShowPending(false)} onAction={loadData} role={role} userTeam={user?.team} members={members} />
      )}
      {showAssign && (
        <AssignFrameworkModal templates={templates} onClose={() => setShowAssign(false)} onAssigned={loadData} />
      )}
    </div>
  );
}

// ─── Pending Ratings Modal (manager/admin) ────────────────────────────────────

function PendingRatingsModal({ onClose, onAction, role, userTeam, members }: { onClose: () => void; onAction: () => void; role: string; userTeam?: string; members: HeatmapMember[] }) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Build a set of team member emails/names for filtering
  const teamMemberIds = useMemo(() => {
    if (role !== "manager" || !userTeam) return null;
    const ids = new Set<string>();
    members.filter((m) => m.team === userTeam).forEach((m) => {
      ids.add(m.user_email);
      ids.add(m.member_name);
    });
    return ids;
  }, [role, userTeam, members]);

  useEffect(() => {
    skillsetHeatmapService.getPendingApprovals().then((data) => {
      // For managers, filter to only their team members
      if (teamMemberIds) {
        setItems(data.filter((i: any) => teamMemberIds.has(i.user_id) || teamMemberIds.has(i.user_email)));
      } else {
        setItems(data);
      }
    }).finally(() => setLoading(false));
  }, [teamMemberIds]);

  // Group by user_id
  const grouped = useMemo(() => {
    const map: Record<string, any[]> = {};
    items.forEach((i) => {
      const key = i.user_id || "Unknown";
      if (!map[key]) map[key] = [];
      map[key].push(i);
    });
    return map;
  }, [items]);

  async function approve(userId: string, skillName: string) {
    if (!confirm("Approve this rating?")) return;
    await skillsetHeatmapService.verifyRating(userId, skillName);
    const updated = await skillsetHeatmapService.getPendingApprovals();
    setItems(teamMemberIds ? updated.filter((i: any) => teamMemberIds.has(i.user_id) || teamMemberIds.has(i.user_email)) : updated);
    onAction();
  }

  async function reject(userId: string, skillName: string) {
    const reason = prompt(`Rejection reason for ${skillName} (${userId}):`);
    if (!reason) return;
    await skillsetHeatmapService.rejectRating(userId, skillName, reason);
    const updated = await skillsetHeatmapService.getPendingApprovals();
    setItems(teamMemberIds ? updated.filter((i: any) => teamMemberIds.has(i.user_id) || teamMemberIds.has(i.user_email)) : updated);
    onAction();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" onClick={onClose}>
      <div className="w-full max-w-3xl max-h-[80vh] overflow-y-auto rounded-xl bg-white p-6 shadow-2xl dark:bg-[#242B33]" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">Pending Ratings</h2>
          <button onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-[#2D3640]"><Icon name="x" size="sm" /></button>
        </div>
        {loading ? <div className="py-8 text-center"><Spinner size="md" /></div> :
          items.length === 0 ? <p className="py-8 text-center text-sm text-slate-500">No pending ratings to review.</p> :
          <div className="space-y-4">
            {Object.entries(grouped).map(([userName, skills]) => (
              <div key={userName} className="rounded-lg border border-slate-200 overflow-hidden dark:border-[#2D3640]">
                <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 dark:bg-[#1C2127] dark:border-[#2D3640]">
                  <p className="text-sm font-semibold text-[#1b2a49] dark:text-white">
                    👤 {userName} <span className="font-normal text-slate-500 text-xs">({skills.length} pending)</span>
                  </p>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-[#2D3640]">
                        <th className="px-4 py-2 text-left text-xs font-medium text-slate-500">Skill</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-slate-500">Rating</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-slate-500">Comment</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-slate-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {skills.map((skill: any, idx: number) => (
                        <tr key={idx} className="border-b border-slate-50 dark:border-[#2D3640]/50">
                          <td className="px-4 py-2 text-slate-700 dark:text-slate-300">{skill.skill_name}</td>
                          <td className="px-4 py-2 text-slate-700 dark:text-slate-300">{skill.rating}/4</td>
                          <td className="px-4 py-2 text-slate-500 dark:text-slate-400 max-w-[200px] truncate">{skill.comments || "—"}</td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <button onClick={() => approve(skill.user_id, skill.skill_name)} className="mr-2 rounded bg-emerald-600 px-2 py-1 text-xs text-white hover:bg-emerald-700">✓ Approve</button>
                            <button onClick={() => reject(skill.user_id, skill.skill_name)} className="rounded bg-red-600 px-2 py-1 text-xs text-white hover:bg-red-700">✕ Reject</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  );
}

// ─── Assign Framework Modal (admin only) ──────────────────────────────────────

function AssignFrameworkModal({ templates, onClose, onAssigned }: { templates: SkillTemplate[]; onClose: () => void; onAssigned: () => void }) {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [userEmails, setUserEmails] = useState("");
  const [assigning, setAssigning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAssign() {
    if (!selectedTemplate) { setError("Select a template."); return; }
    if (!userEmails.trim()) { setError("Enter at least one email."); return; }
    setAssigning(true); setError(null);
    try {
      const emails = userEmails.split(/[,\n]/).map(e => e.trim()).filter(Boolean);
      await skillsetHeatmapService.bulkAssign({
        assignments: emails.map(email => ({ user_email: email, template_id: selectedTemplate })),
      });
      onAssigned();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to assign.");
    } finally { setAssigning(false); }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl dark:bg-[#242B33]" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">Assign Framework</h2>
          <button onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-[#2D3640]"><Icon name="x" size="sm" /></button>
        </div>
        {error && <div className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700 dark:bg-red-900/20 dark:text-red-400">{error}</div>}
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Template</label>
            <select value={selectedTemplate} onChange={(e) => setSelectedTemplate(e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white">
              <option value="">Select template...</option>
              {templates.map(t => <option key={t.template_id} value={t.template_id}>{t.template_name}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">User Emails (comma or newline separated)</label>
            <textarea value={userEmails} onChange={(e) => setUserEmails(e.target.value)} rows={4} placeholder="user1@example.com&#10;user2@example.com" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white" />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" size="sm" onClick={onClose}>Cancel</Button>
            <Button variant="primary" size="sm" isLoading={assigning} onClick={handleAssign}>Assign</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
