"use client";

import { useState, useEffect } from "react";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components";
import { apiClient } from "@/lib/api-client";
import { learningProgressService } from "@/features/learning-progress";
import type { TrainingAssignment } from "@/features/learning-progress";

// ─── Assign Training Modal (admin) ──────────────────────────────────────────

interface AssignTrainingModalProps {
  onClose: () => void;
  onAssigned: () => void;
}

interface TrainingPlan {
  plan_id: string;
  plan_name?: string;
  name?: string;
  training_name?: string;
  training_items?: { week: number }[];
}

interface UserItem {
  email: string;
  name?: string;
  team?: string;
  role?: string;
}

export function AssignTrainingModal({ onClose, onAssigned }: AssignTrainingModalProps) {
  const [teams, setTeams] = useState<string[]>([]);
  const [users, setUsers] = useState<UserItem[]>([]);
  const [plans, setPlans] = useState<TrainingPlan[]>([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedMember, setSelectedMember] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);
  const [duration, setDuration] = useState(30);
  const [endDate, setEndDate] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      apiClient.get<{ teams?: string[] }>("/users/teams"),
      apiClient.get<{ users?: UserItem[] }>("/users"),
      apiClient.get<{ plans?: TrainingPlan[]; items?: TrainingPlan[] }>("/training-plans"),
    ]).then(([teamsData, usersData, plansData]) => {
      setTeams(teamsData.teams || []);
      setUsers(usersData.users || []);
      setPlans(plansData.plans || plansData.items || []);
    }).catch(console.error);
  }, []);

  // Calculate end date when start/duration changes
  useEffect(() => {
    if (startDate && duration) {
      const d = new Date(startDate);
      d.setDate(d.getDate() + duration);
      setEndDate(d.toISOString().split("T")[0]);
    }
  }, [startDate, duration]);

  // When plan changes, set duration from its weeks
  function handlePlanChange(planId: string) {
    setSelectedPlan(planId);
    const plan = plans.find((p) => p.plan_id === planId);
    if (plan?.training_items?.length) {
      const maxWeek = Math.max(...plan.training_items.map((i) => i.week || 1));
      setDuration(maxWeek * 7);
    }
  }

  const filteredMembers = selectedTeam ? users.filter((u) => u.team === selectedTeam) : users;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedMember || !selectedPlan || !startDate) {
      setError("Please fill all required fields.");
      return;
    }
    setSaving(true); setError(null);
    const plan = plans.find((p) => p.plan_id === selectedPlan);
    const planName = plan?.plan_name || plan?.name || plan?.training_name || "Unnamed";
    const memberUser = users.find((u) => u.email === selectedMember);

    try {
      await learningProgressService.assign({
        user_email: selectedMember,
        training_id: selectedPlan,
        course_name: planName,
        training: planName,
        start_date: startDate,
        end_date: endDate,
        target_date: endDate,
        duration,
        manager_email: memberUser?.team ? users.find((u) => u.role === "manager" && u.team === memberUser.team)?.email : undefined,
        status: "Not Started",
      });
      onAssigned();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to assign.");
    } finally { setSaving(false); }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl dark:bg-[#242B33]" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">Assign Training</h2>
          <button onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-[#2D3640]"><Icon name="x" size="sm" /></button>
        </div>
        {error && <div className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700 dark:bg-red-900/20 dark:text-red-400">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Team</label>
            <select value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white">
              <option value="">All teams</option>
              {teams.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Member *</label>
            <select value={selectedMember} onChange={(e) => setSelectedMember(e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white">
              <option value="">Select member...</option>
              {filteredMembers.map((u) => <option key={u.email} value={u.email}>{u.name || u.email}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Training Plan *</label>
            <select value={selectedPlan} onChange={(e) => handlePlanChange(e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white">
              <option value="">Select plan...</option>
              {plans.map((p) => <option key={p.plan_id} value={p.plan_id}>{p.plan_name || p.name || p.training_name}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700 dark:text-slate-300">Start Date *</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full rounded-lg border border-slate-200 px-2 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700 dark:text-slate-300">Duration (days)</label>
              <input type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="w-full rounded-lg border border-slate-200 px-2 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700 dark:text-slate-300">End Date</label>
              <input type="date" value={endDate} readOnly className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white" />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" size="sm" type="button" onClick={onClose}>Cancel</Button>
            <Button variant="primary" size="sm" type="submit" isLoading={saving}>Assign</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Bulk Assign Modal (admin) ───────────────────────────────────────────────

interface BulkAssignModalProps {
  onClose: () => void;
  onAssigned: () => void;
}

export function BulkAssignModal({ onClose, onAssigned }: BulkAssignModalProps) {
  const [teams, setTeams] = useState<string[]>([]);
  const [users, setUsers] = useState<UserItem[]>([]);
  const [plans, setPlans] = useState<TrainingPlan[]>([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<Set<string>>(new Set());
  const [selectedPlan, setSelectedPlan] = useState("");
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);
  const [duration, setDuration] = useState(30);
  const [endDate, setEndDate] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      apiClient.get<{ teams?: string[] }>("/users/teams"),
      apiClient.get<{ users?: UserItem[] }>("/users"),
      apiClient.get<{ plans?: TrainingPlan[]; items?: TrainingPlan[] }>("/training-plans"),
    ]).then(([teamsData, usersData, plansData]) => {
      setTeams(teamsData.teams || []);
      setUsers(usersData.users || []);
      setPlans(plansData.plans || plansData.items || []);
    }).catch(console.error);
  }, []);

  useEffect(() => {
    if (startDate && duration) {
      const d = new Date(startDate);
      d.setDate(d.getDate() + duration);
      setEndDate(d.toISOString().split("T")[0]);
    }
  }, [startDate, duration]);

  const filteredMembers = selectedTeam ? users.filter((u) => u.team === selectedTeam) : users;

  function toggleMember(email: string) {
    setSelectedMembers((prev) => {
      const next = new Set(prev);
      if (next.has(email)) next.delete(email); else next.add(email);
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (selectedMembers.size === 0 || !selectedPlan || !startDate) {
      setError("Select members, a plan, and start date.");
      return;
    }
    setSaving(true); setError(null);
    const plan = plans.find((p) => p.plan_id === selectedPlan);
    const planName = plan?.plan_name || plan?.name || plan?.training_name || "Unnamed";

    try {
      await learningProgressService.bulkAssign({
        assignments: Array.from(selectedMembers).map((email) => ({
          user_email: email,
          training_id: selectedPlan,
          course_name: planName,
          training: planName,
          start_date: startDate,
          end_date: endDate,
          target_date: endDate,
          duration,
          status: "Not Started",
        })),
      });
      onAssigned();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bulk assign failed.");
    } finally { setSaving(false); }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" onClick={onClose}>
      <div className="w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-xl bg-white p-6 shadow-2xl dark:bg-[#242B33]" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">Bulk Assign Training</h2>
          <button onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-[#2D3640]"><Icon name="x" size="sm" /></button>
        </div>
        {error && <div className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700 dark:bg-red-900/20 dark:text-red-400">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Team</label>
            <select value={selectedTeam} onChange={(e) => { setSelectedTeam(e.target.value); setSelectedMembers(new Set()); }} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white">
              <option value="">Select team...</option>
              {teams.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          {filteredMembers.length > 0 && (
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Members ({selectedMembers.size} selected)</label>
              <div className="max-h-32 overflow-y-auto rounded-lg border border-slate-200 p-2 dark:border-[#2D3640]">
                {filteredMembers.map((u) => (
                  <label key={u.email} className="flex items-center gap-2 py-1 text-sm text-slate-700 cursor-pointer dark:text-slate-300">
                    <input type="checkbox" checked={selectedMembers.has(u.email)} onChange={() => toggleMember(u.email)} className="rounded" />
                    {u.name || u.email}
                  </label>
                ))}
              </div>
            </div>
          )}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Training Plan *</label>
            <select value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white">
              <option value="">Select plan...</option>
              {plans.map((p) => <option key={p.plan_id} value={p.plan_id}>{p.plan_name || p.name || p.training_name}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700 dark:text-slate-300">Start Date *</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full rounded-lg border border-slate-200 px-2 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700 dark:text-slate-300">Duration (days)</label>
              <input type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="w-full rounded-lg border border-slate-200 px-2 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700 dark:text-slate-300">End Date</label>
              <input type="date" value={endDate} readOnly className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white" />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" size="sm" type="button" onClick={onClose}>Cancel</Button>
            <Button variant="primary" size="sm" type="submit" isLoading={saving}>Assign to {selectedMembers.size} members</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Extension Requests Modal (admin/manager) ────────────────────────────────

interface ExtensionRequestsModalProps {
  onClose: () => void;
  onAction: () => void;
}

export function LPExtensionRequestsModal({ onClose, onAction }: ExtensionRequestsModalProps) {
  const [requests, setRequests] = useState<TrainingAssignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    learningProgressService.getExtensionRequests()
      .then((data) => setRequests(data.requests || []))
      .finally(() => setLoading(false));
  }, []);

  async function approve(progressId: string) {
    if (!confirm("Approve this extension?")) return;
    await learningProgressService.handleExtension(progressId, { action: "approve" });
    const data = await learningProgressService.getExtensionRequests();
    setRequests(data.requests || []);
    onAction();
  }

  async function reject(progressId: string) {
    const reason = prompt("Rejection reason:");
    if (!reason) return;
    await learningProgressService.handleExtension(progressId, { action: "reject", rejection_reason: reason });
    const data = await learningProgressService.getExtensionRequests();
    setRequests(data.requests || []);
    onAction();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" onClick={onClose}>
      <div className="w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-xl bg-white p-6 shadow-2xl dark:bg-[#242B33]" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">Extension Requests</h2>
          <button onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-[#2D3640]"><Icon name="x" size="sm" /></button>
        </div>
        {loading ? <div className="py-8 text-center text-sm text-slate-500">Loading...</div> :
          requests.length === 0 ? <p className="py-8 text-center text-sm text-slate-500">No pending extension requests.</p> :
          <div className="space-y-3">
            {requests.map((req) => (
              <div key={req.progress_id} className="rounded-lg border border-slate-200 p-4 dark:border-[#2D3640]">
                <p className="text-sm font-medium text-slate-800 dark:text-white">{req.user_name || req.user_email}</p>
                <p className="text-xs text-slate-500">{req.course_name || req.training} · Current: {req.target_date || "N/A"} → Requested: {req.extension_new_date || "N/A"}</p>
                {req.extension_type === "week" && <p className="text-xs text-slate-400">Week {req.extension_week_number} extension</p>}
                <div className="mt-2 flex gap-2">
                  <button onClick={() => approve(req.progress_id)} className="rounded bg-emerald-600 px-2 py-1 text-xs text-white hover:bg-emerald-700">✓ Approve</button>
                  <button onClick={() => reject(req.progress_id)} className="rounded bg-red-600 px-2 py-1 text-xs text-white hover:bg-red-700">✕ Reject</button>
                </div>
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  );
}
