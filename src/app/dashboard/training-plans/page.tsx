"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useSearch } from "@/hooks/use-search";
import { trainingPlanService } from "@/features/training-plans";
import type { TrainingPlan, TrainingPlanFormData, TrainingItem } from "@/features/training-plans";
import { Icon } from "@/components/ui/icon";
import { useToast } from "@/components/ui/toast";
import { Badge, Button, Card, PageHeader, Spinner } from "@/components";

export default function TrainingPlansPage() {
  const { query, debouncedQuery, setQuery } = useSearch();
  const { toast } = useToast();
  const [plans, setPlans] = useState<TrainingPlan[]>([]);
  const [teams, setTeams] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [teamFilter, setTeamFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Modals
  const [formPlan, setFormPlan] = useState<TrainingPlan | null | undefined>(undefined); // undefined=closed, null=new, plan=edit
  const [viewPlan, setViewPlan] = useState<TrainingPlan | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [p, t] = await Promise.all([trainingPlanService.list(), trainingPlanService.getTeams()]);
      setPlans(p); setTeams(t);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const filtered = useMemo(() => plans.filter((p) => {
    if (teamFilter && p.target_team !== teamFilter) return false;
    if (statusFilter && p.status !== statusFilter) return false;
    if (debouncedQuery) {
      const q = debouncedQuery.toLowerCase();
      if (!(p.plan_name || "").toLowerCase().includes(q) && !(p.description || "").toLowerCase().includes(q)) return false;
    }
    return true;
  }), [plans, teamFilter, statusFilter, debouncedQuery]);

  const handleDelete = useCallback(async (id: string, name: string) => {
    const input = prompt(`Type DELETE to confirm deletion of: ${name}`);
    if (input !== "DELETE") return;
    await trainingPlanService.delete(id);
    setPlans((prev) => prev.filter((p) => p.plan_id !== id));
  }, []);

  const handleExcelUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.match(/\.(xlsx|xls|csv)$/)) { toast({ message: "Please select a valid Excel file", variant: "error" }); return; }
    try {
      const result = await trainingPlanService.uploadExcel(file);
      toast({ message: `Imported: ${result.plan_name} (${result.items_count} items)`, variant: "success" });
      loadData();
    } catch (err) { toast({ message: "Upload failed", variant: "error" }); }
    e.target.value = "";
  }, [loadData, toast]);

  const clearFilters = () => { setTeamFilter(""); setStatusFilter(""); setQuery(""); };

  if (loading) return <div className="flex h-64 items-center justify-center"><Spinner size="lg" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <PageHeader title="Training Plans" description={`${filtered.length} plan${filtered.length !== 1 ? "s" : ""}`} />
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={async () => { try { await trainingPlanService.downloadTemplate(); } catch { toast({ message: "Failed to download template", variant: "error" }); } }}>
            <Icon name="download" size="sm" /> Template
          </Button>
          <Button variant="secondary" size="sm" onClick={() => fileInputRef.current?.click()}>
            <Icon name="upload" size="sm" /> Upload Excel
          </Button>
          <Button variant="primary" size="sm" onClick={() => setFormPlan(null)}>
            <Icon name="plus" size="sm" /> Create Plan
          </Button>
          <input ref={fileInputRef} type="file" accept=".xlsx,.xls,.csv" className="hidden" onChange={handleExcelUpload} />
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[180px]">
            <Icon name="search" size="sm" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search plans..." value={query} onChange={(e) => setQuery(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-[#1b2a49] focus:ring-1 focus:ring-[#1b2a49] dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white" />
          </div>
          {teams.length > 0 && (
            <select value={teamFilter} onChange={(e) => setTeamFilter(e.target.value)} className="cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white">
              <option value="">All Teams</option>
              {teams.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          )}
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white">
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          {(teamFilter || statusFilter || query) && <button onClick={clearFilters} className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-[#2D3640]">Clear</button>}
        </div>
      </Card>

      {/* Plans grid */}
      {filtered.length === 0 ? (
        <div className="flex h-48 flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 dark:border-[#2D3640] dark:bg-[#1C2127]/50">
          <div className="rounded-full bg-slate-100 p-3 dark:bg-[#2D3640]">
            <Icon name="calendar" size="lg" className="text-slate-300 dark:text-slate-500" />
          </div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">No training plans found</p>
          <p className="text-xs text-slate-400 dark:text-slate-500">Create a plan or upload an Excel file</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => {
            const itemCount = p.training_items?.length || 0;
            const weekCount = itemCount > 0 ? Math.max(...p.training_items!.map((i) => i.week || 1)) : 0;
            return (
            <div key={p.plan_id} className="cursor-pointer" onClick={() => setViewPlan(p)}>
            <Card className="flex flex-col overflow-hidden border border-slate-200/80 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 h-full dark:border-[#2D3640]">
              <div className="flex flex-col flex-1 p-5">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#1b2a49] to-[#2a3d5f] shadow-sm">
                      <Icon name="calendar" size="sm" className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800 leading-tight dark:text-white">{p.plan_name}</p>
                      {p.description && <p className="mt-1 text-[11px] text-slate-400 line-clamp-1 dark:text-slate-500">{p.description}</p>}
                    </div>
                  </div>
                  <Badge className={`shrink-0 text-[10px] px-2 py-0.5 ${(p.status || "Active") === "Active" ? "bg-emerald-50 text-emerald-700 dark:bg-[#2D3640] dark:text-slate-300" : "bg-slate-100 text-slate-500 dark:bg-[#2D3640] dark:text-slate-400"}`}>{p.status || "Active"}</Badge>
                </div>

                {/* Stats row */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="rounded-lg bg-slate-50 px-3 py-2 text-center dark:bg-[#1C2127]">
                    <p className="text-sm font-bold text-slate-800 dark:text-white">{p.duration || 30}</p>
                    <p className="text-[9px] text-slate-500 dark:text-slate-400">Days</p>
                  </div>
                  <div className="rounded-lg bg-blue-50 px-3 py-2 text-center dark:bg-[#1C2127]">
                    <p className="text-sm font-bold text-blue-700 dark:text-white">{weekCount}</p>
                    <p className="text-[9px] text-blue-600 dark:text-slate-400">Weeks</p>
                  </div>
                  <div className="rounded-lg bg-amber-50 px-3 py-2 text-center dark:bg-[#1C2127]">
                    <p className="text-sm font-bold text-amber-700 dark:text-white">{itemCount}</p>
                    <p className="text-[9px] text-amber-600 dark:text-slate-400">Topics</p>
                  </div>
                </div>

                {/* Meta tags */}
                <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                  {p.target_team && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 dark:bg-[#2D3640] dark:text-slate-400"><Icon name="users" size="sm" />{p.target_team}</span>
                  )}
                  {p.target_role && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 capitalize dark:bg-[#2D3640] dark:text-slate-400"><Icon name="user" size="sm" />{p.target_role}</span>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-auto flex items-center gap-1 pt-4 border-t border-slate-100 dark:border-[#2D3640] mt-4" onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => setFormPlan(p)} className="rounded-md p-2 text-slate-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 transition-colors" title="Edit"><Icon name="edit" size="sm" /></button>
                  <button onClick={() => trainingPlanService.exportPlanExcel(p.plan_id)} className="rounded-md p-2 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-900/20 dark:hover:text-emerald-400 transition-colors" title="Export Excel"><Icon name="download" size="sm" /></button>
                  <button onClick={() => handleDelete(p.plan_id, p.plan_name)} className="rounded-md p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors" title="Delete"><Icon name="trash" size="sm" /></button>
                </div>
              </div>
            </Card>
            </div>
            );
          })}
        </div>
      )}

      {/* View Detail Modal */}
      {viewPlan && <PlanDetailModal plan={viewPlan} onClose={() => setViewPlan(null)} />}
      {/* Form Modal */}
      {formPlan !== undefined && <PlanFormModal plan={formPlan} teams={teams} onClose={() => setFormPlan(undefined)} onSaved={() => { setFormPlan(undefined); loadData(); }} />}
    </div>
  );
}

// ─── Plan Detail Modal ───────────────────────────────────────────────────────

function PlanDetailModal({ plan, onClose }: { plan: TrainingPlan; onClose: () => void }) {
  const items = plan.training_items || [];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" onClick={onClose}>
      <div className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-xl bg-white p-6 shadow-2xl dark:bg-[#242B33]" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">{plan.plan_name}</h2>
          <button onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-[#2D3640]"><Icon name="x" size="sm" /></button>
        </div>
        <div className="mb-4 grid grid-cols-3 gap-3 rounded-lg bg-slate-50 p-4 dark:bg-[#1C2127]">
          <div><p className="text-[11px] text-slate-500">Team</p><p className="text-sm font-medium text-slate-700 dark:text-slate-300">{plan.target_team || "—"}</p></div>
          <div><p className="text-[11px] text-slate-500">Role</p><p className="text-sm font-medium text-slate-700 dark:text-slate-300 capitalize">{plan.target_role || "—"}</p></div>
          <div><p className="text-[11px] text-slate-500">Duration</p><p className="text-sm font-medium text-slate-700 dark:text-slate-300">{plan.duration || 30} days</p></div>
        </div>
        {plan.description && <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">{plan.description}</p>}
        {items.length > 0 ? (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#1b2a49] dark:text-white">Training Curriculum</h3>
            {items.map((item, i) => (
              <div key={i} className="rounded-lg border-l-4 border-[#ff9472] bg-white p-4 shadow-sm dark:bg-[#1C2127]">
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-[#ff9472] text-white text-[10px]">Week {item.week}</Badge>
                  <span className="text-xs text-slate-400">#{item.sr_no || i + 1}</span>
                </div>
                <p className="text-sm font-semibold text-[#1b2a49] dark:text-white">{item.topic}</p>
                {item.skills && <Badge className="mt-1 bg-blue-50 text-blue-700 text-[10px] dark:bg-blue-900/20 dark:text-blue-400">{item.skills}</Badge>}
                {item.reference && <p className="mt-1 text-xs"><a href={item.reference} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">📎 {item.reference}</a></p>}
                {item.comments && <p className="mt-1 text-xs text-slate-500 italic">💬 {item.comments}</p>}
              </div>
            ))}
          </div>
        ) : plan.courses ? (
          <div><h3 className="mb-2 text-sm font-semibold text-[#1b2a49] dark:text-white">Courses</h3><p className="text-sm text-slate-600 whitespace-pre-wrap dark:text-slate-400">{plan.courses}</p></div>
        ) : <p className="py-8 text-center text-sm text-slate-500">No training content.</p>}
        <div className="mt-4 flex justify-end"><Button variant="secondary" size="sm" onClick={onClose}>Close</Button></div>
      </div>
    </div>
  );
}

// ─── Plan Form Modal ─────────────────────────────────────────────────────────

function PlanFormModal({ plan, teams, onClose, onSaved }: { plan: TrainingPlan | null; teams: string[]; onClose: () => void; onSaved: () => void }) {
  const isEdit = !!plan?.plan_id;
  const [name, setName] = useState(plan?.plan_name || "");
  const [targetTeam, setTargetTeam] = useState(plan?.target_team || "");
  const [targetRole, setTargetRole] = useState(plan?.target_role || "member");
  const [duration, setDuration] = useState(plan?.duration || 30);
  const [status, setStatus] = useState(plan?.status || "Active");
  const [description, setDescription] = useState(plan?.description || "");
  const [items, setItems] = useState<TrainingItem[]>(plan?.training_items ? JSON.parse(JSON.stringify(plan.training_items)) : []);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function addItem() {
    setItems((prev) => [...prev, { sr_no: prev.length + 1, week: 1, topic: "", skills: "", reference: "", comments: "" }]);
  }
  function removeItem(idx: number) {
    setItems((prev) => prev.filter((_, i) => i !== idx).map((item, i) => ({ ...item, sr_no: i + 1 })));
  }
  function updateItem(idx: number, field: keyof TrainingItem, value: string | number) {
    setItems((prev) => prev.map((item, i) => i === idx ? { ...item, [field]: value } : item));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) { setError("Plan name is required."); return; }
    setSaving(true); setError(null);
    const payload: TrainingPlanFormData = { plan_name: name.trim(), target_team: targetTeam, target_role: targetRole, duration, status, description: description.trim(), training_items: items.length > 0 ? items : undefined };
    try {
      if (isEdit && plan) await trainingPlanService.update(plan.plan_id, payload);
      else await trainingPlanService.create(payload);
      onSaved();
    } catch (err) { setError(err instanceof Error ? err.message : "Failed to save."); }
    finally { setSaving(false); }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" onClick={onClose}>
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 shadow-2xl dark:bg-[#242B33]" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">{isEdit ? "Edit Training Plan" : "Create Training Plan"}</h2>
          <button onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-[#2D3640]"><Icon name="x" size="sm" /></button>
        </div>
        {error && <div className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700 dark:bg-red-900/20 dark:text-red-400">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Plan Name *</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Target Team</label><select value={targetTeam} onChange={(e) => setTargetTeam(e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white"><option value="">Select team...</option>{teams.map((t) => <option key={t} value={t}>{t}</option>)}</select></div>
            <div><label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Target Role</label><select value={targetRole} onChange={(e) => setTargetRole(e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white"><option value="member">Member</option><option value="manager">Manager</option><option value="admin">Admin</option></select></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Duration (days)</label><input type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white" /></div>
            <div><label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Status</label><select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white"><option value="Active">Active</option><option value="Inactive">Inactive</option></select></div>
          </div>
          <div><label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Description</label><textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white" /></div>

          {/* Training Items */}
          <div className="border-t border-slate-200 pt-4 dark:border-[#2D3640]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Training Items ({items.length})</h3>
              <Button variant="secondary" size="sm" type="button" onClick={addItem}><Icon name="plus" size="sm" /> Add Item</Button>
            </div>
            {items.length === 0 ? <p className="text-xs text-slate-400">No items added. Use "Add Item" or upload an Excel file.</p> : (
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {items.map((item, idx) => (
                  <div key={idx} className="rounded-lg border border-slate-200 p-3 dark:border-[#2D3640]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-slate-500">#{idx + 1}</span>
                      <button type="button" onClick={() => removeItem(idx)} className="text-red-500 hover:text-red-700 text-xs">✕ Remove</button>
                    </div>
                    <div className="grid grid-cols-4 gap-2 mb-2">
                      <div><label className="text-[10px] text-slate-500">Sr No</label><input type="number" value={item.sr_no} onChange={(e) => updateItem(idx, "sr_no", Number(e.target.value))} className="w-full rounded border border-slate-200 px-2 py-1 text-xs dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white" /></div>
                      <div><label className="text-[10px] text-slate-500">Week</label><input type="number" value={item.week} onChange={(e) => updateItem(idx, "week", Number(e.target.value))} className="w-full rounded border border-slate-200 px-2 py-1 text-xs dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white" /></div>
                      <div className="col-span-2"><label className="text-[10px] text-slate-500">Topic *</label><input type="text" value={item.topic} onChange={(e) => updateItem(idx, "topic", e.target.value)} className="w-full rounded border border-slate-200 px-2 py-1 text-xs dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white" /></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div><label className="text-[10px] text-slate-500">Skills</label><input type="text" value={item.skills} onChange={(e) => updateItem(idx, "skills", e.target.value)} className="w-full rounded border border-slate-200 px-2 py-1 text-xs dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white" /></div>
                      <div><label className="text-[10px] text-slate-500">Reference URL</label><input type="text" value={item.reference || ""} onChange={(e) => updateItem(idx, "reference", e.target.value)} className="w-full rounded border border-slate-200 px-2 py-1 text-xs dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white" /></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" size="sm" type="button" onClick={onClose}>Cancel</Button>
            <Button variant="primary" size="sm" type="submit" isLoading={saving}>{isEdit ? "Update" : "Create"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
