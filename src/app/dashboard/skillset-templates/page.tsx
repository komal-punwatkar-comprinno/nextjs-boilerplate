"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearch } from "@/hooks/use-search";
import { skillsetTemplateService } from "@/features/skillset-templates";
import type { SkillsetTemplate, TemplateFormData } from "@/features/skillset-templates";
import { Icon } from "@/components/ui/icon";
import { Badge, Button, Card, PageHeader, Spinner } from "@/components";
import { PageSkeleton } from "@/components/common/page-skeleton";

export default function SkillsetTemplatesPage() {
  const { query, debouncedQuery, setQuery } = useSearch();
  const [templates, setTemplates] = useState<SkillsetTemplate[]>([]);
  const [teams, setTeams] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [teamFilter, setTeamFilter] = useState("");

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<SkillsetTemplate | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [tpls, tms] = await Promise.all([
        skillsetTemplateService.list(),
        skillsetTemplateService.getTeams(),
      ]);
      setTemplates(tpls);
      setTeams(tms);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const filtered = useMemo(() => {
    return templates.filter((t) => {
      if (teamFilter && t.target_team !== teamFilter) return false;
      if (debouncedQuery) {
        const q = debouncedQuery.toLowerCase();
        const searchable = `${t.template_name} ${(t.skills || []).join(" ")}`.toLowerCase();
        if (!searchable.includes(q)) return false;
      }
      return true;
    });
  }, [templates, teamFilter, debouncedQuery]);

  const handleDelete = useCallback(async (id: string) => {
    if (!confirm("Delete this template?")) return;
    await skillsetTemplateService.delete(id);
    setTemplates((prev) => prev.filter((t) => t.template_id !== id));
  }, []);

  const clearFilters = () => { setTeamFilter(""); setQuery(""); };

  if (loading) return <PageSkeleton />;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <PageHeader title="Skillset Templates" description={`${filtered.length} template${filtered.length !== 1 ? "s" : ""}`} />
        <Button variant="primary" size="sm" onClick={() => { setEditingTemplate(null); setModalOpen(true); }}>
          <Icon name="plus" size="sm" /> Add Template
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Icon name="search" size="sm" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search templates or skills..." value={query} onChange={(e) => setQuery(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-[#1b2a49] focus:ring-1 focus:ring-[#1b2a49] dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white" />
          </div>
          {teams.length > 0 && (
            <select value={teamFilter} onChange={(e) => setTeamFilter(e.target.value)} className="cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white">
              <option value="">All Teams</option>
              {teams.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          )}
          {(teamFilter || query) && <button onClick={clearFilters} className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-[#2D3640]">Clear</button>}
        </div>
      </Card>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex h-48 flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 dark:border-[#2D3640] dark:bg-[#1C2127]/50">
          <div className="rounded-full bg-slate-100 p-3 dark:bg-[#2D3640]">
            <Icon name="layerGroup" size="lg" className="text-slate-300 dark:text-slate-500" />
          </div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">No templates found</p>
          <Button variant="primary" size="sm" onClick={() => { setEditingTemplate(null); setModalOpen(true); }}>Create your first template</Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => {
            const skills = t.skills || [];
            return (
              <Card key={t.template_id} className="flex flex-col overflow-hidden border border-slate-200/80 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 dark:border-[#2D3640]">
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#1b2a49] to-[#2a3d5f]">
                          <Icon name="layerGroup" size="sm" className="text-white" />
                        </div>
                        <p className="text-sm font-semibold text-slate-800 truncate dark:text-white">{t.template_name}</p>
                      </div>
                      {t.description && <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{t.description}</p>}
                    </div>
                    <div className="flex shrink-0 gap-1 ml-2">
                      <button onClick={() => { setEditingTemplate(t); setModalOpen(true); }} className="cursor-pointer rounded-md p-1.5 text-slate-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 transition-colors" title="Edit"><Icon name="edit" size="sm" /></button>
                      <button onClick={() => handleDelete(t.template_id)} className="cursor-pointer rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors" title="Delete"><Icon name="trash" size="sm" /></button>
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                    <span className="inline-flex items-center gap-1"><Icon name="clipboard" size="sm" />{skills.length} skill{skills.length !== 1 ? "s" : ""}</span>
                    {t.target_team && <span className="inline-flex items-center gap-1"><Icon name="users" size="sm" />{t.target_team}</span>}
                    <Badge className={`text-[10px] ${(t.status || "Active") === "Active" ? "bg-emerald-50 text-emerald-700 dark:bg-[#2D3640] dark:text-slate-300" : "bg-slate-100 text-slate-500 dark:bg-[#2D3640] dark:text-slate-400"}`}>{t.status || "Active"}</Badge>
                  </div>

                  {/* Skills preview */}
                  <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-[#2D3640]">
                    {skills.slice(0, 5).map((s, idx) => (
                      <span key={`${s}-${idx}`} className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-[#2D3640] dark:text-slate-300">{typeof s === "string" ? s : (s as any).skill_name || ""}</span>
                    ))}
                    {skills.length > 5 && <span className="inline-flex items-center rounded-md bg-slate-50 px-2 py-0.5 text-[11px] text-slate-400 dark:bg-[#1C2127] dark:text-slate-500">+{skills.length - 5} more</span>}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <TemplateModal
          template={editingTemplate}
          teams={teams}
          onClose={() => { setModalOpen(false); setEditingTemplate(null); }}
          onSaved={() => { setModalOpen(false); setEditingTemplate(null); loadData(); }}
        />
      )}
    </div>
  );
}

// ─── Template Form Modal ─────────────────────────────────────────────────────

function TemplateModal({ template, teams, onClose, onSaved }: { template: SkillsetTemplate | null; teams: string[]; onClose: () => void; onSaved: () => void }) {
  const isEdit = !!template;
  const [name, setName] = useState(template?.template_name || "");
  const [description, setDescription] = useState(template?.description || "");
  const [status, setStatus] = useState(template?.status || "Active");
  const [targetTeam, setTargetTeam] = useState(template?.target_team || "");
  const [skillsText, setSkillsText] = useState((template?.skills || []).map((s) => typeof s === "string" ? s : (s as any).skill_name || "").join("\n"));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const skills = skillsText.split(/[\n,]/).map((s) => s.trim()).filter(Boolean);
    if (!name.trim() || skills.length === 0) {
      setError("Template name and at least one skill are required.");
      return;
    }
    setSaving(true); setError(null);
    const payload: TemplateFormData = { template_name: name.trim(), description: description.trim(), skills, status, target_team: targetTeam };
    try {
      if (isEdit && template) {
        await skillsetTemplateService.update(template.template_id, payload);
      } else {
        await skillsetTemplateService.create(payload);
      }
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save.");
    } finally { setSaving(false); }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" onClick={onClose}>
      <div className="w-full max-w-md max-h-[85vh] overflow-y-auto rounded-xl bg-white p-6 shadow-2xl dark:bg-[#242B33]" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">{isEdit ? "Edit Template" : "Add Template"}</h2>
          <button onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-[#2D3640]"><Icon name="x" size="sm" /></button>
        </div>
        {error && <div className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700 dark:bg-red-900/20 dark:text-red-400">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Template Name *</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Frontend Development" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} placeholder="Optional description..." className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Target Team</label>
              <select value={targetTeam} onChange={(e) => setTargetTeam(e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white">
                <option value="">All Teams</option>
                {teams.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Skills * (one per line or comma-separated)</label>
            <textarea value={skillsText} onChange={(e) => setSkillsText(e.target.value)} rows={6} placeholder="React&#10;Angular&#10;TypeScript&#10;Node.js" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-mono dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white" />
            <p className="mt-1 text-[11px] text-slate-400">{skillsText.split(/[\n,]/).map((s) => s.trim()).filter(Boolean).length} skills entered</p>
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
