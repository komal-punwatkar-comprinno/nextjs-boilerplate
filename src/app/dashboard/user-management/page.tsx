"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearch } from "@/hooks/use-search";
import { userManagementService } from "@/features/user-management";
import type { User, UserFormData } from "@/features/user-management";
import { Icon } from "@/components/ui/icon";
import { useToast } from "@/components/ui/toast";
import { Badge, Button, Card, PageHeader, Spinner } from "@/components";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { TableSkeleton } from "@/components/common/page-skeleton";

function statusLabel(status?: string): { text: string; color: string } {
  switch (status) {
    case "CONFIRMED": return { text: "Active", color: "bg-emerald-100 text-emerald-700 dark:bg-[#2D3640] dark:text-slate-300" };
    case "FORCE_CHANGE_PASSWORD": return { text: "Pending", color: "bg-amber-100 text-amber-700 dark:bg-[#2D3640] dark:text-slate-300" };
    case "DISABLED": return { text: "Disabled", color: "bg-red-100 text-red-700 dark:bg-[#2D3640] dark:text-slate-400" };
    default: return { text: status || "—", color: "bg-slate-100 text-slate-600 dark:bg-[#2D3640] dark:text-slate-300" };
  }
}

export default function UserManagementPage() {
  const { query, debouncedQuery, setQuery } = useSearch();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [teams, setTeams] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState("");
  const [teamFilter, setTeamFilter] = useState("");

  // Modals
  const [formUser, setFormUser] = useState<User | null | undefined>(undefined);
  const [showTeamsModal, setShowTeamsModal] = useState(false);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [u, t] = await Promise.all([userManagementService.list(), userManagementService.getTeams()]);
      setUsers(u); setTeams(t);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const filtered = useMemo(() => users.filter((u) => {
    if (roleFilter && u.role !== roleFilter) return false;
    if (teamFilter && u.team !== teamFilter) return false;
    if (debouncedQuery) {
      const q = debouncedQuery.toLowerCase();
      if (!(u.name || "").toLowerCase().includes(q) && !(u.email || "").toLowerCase().includes(q)) return false;
    }
    return true;
  }), [users, roleFilter, teamFilter, debouncedQuery]);

  const managers = useMemo(() => users.filter((u) => u.role === "admin" || u.role === "manager"), [users]);

  // Confirm dialog state
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);

  const handleDelete = useCallback(async () => {
    if (!deleteTarget) return;
    try {
      await userManagementService.delete(deleteTarget.id);
      setUsers((prev) => prev.filter((u) => u.user_id !== deleteTarget.id));
      toast({ message: `User "${deleteTarget.name}" deleted.`, variant: "success" });
    } catch { toast({ message: "Failed to delete user.", variant: "error" }); }
    finally { setDeleteTarget(null); }
  }, [deleteTarget, toast]);

  const clearFilters = () => { setRoleFilter(""); setTeamFilter(""); setQuery(""); };

  if (loading) return <TableSkeleton />;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <PageHeader title="User Management" description={`${filtered.length} user${filtered.length !== 1 ? "s" : ""}`} />
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => setShowTeamsModal(true)}>
            <Icon name="users" size="sm" /> Manage Teams
          </Button>
          <Button variant="secondary" size="sm" onClick={() => userManagementService.exportUsers()}>
            <Icon name="download" size="sm" /> Export
          </Button>
          <Button variant="primary" size="sm" onClick={() => setFormUser(null)}>
            <Icon name="plus" size="sm" /> Add User
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Card className="relative overflow-hidden border border-slate-200/80 bg-gradient-to-br from-slate-50 to-slate-100 p-4 dark:border-[#2D3640] dark:from-[#242B33] dark:to-[#2D3640]">
          <div className="absolute right-3 top-3 rounded-lg bg-slate-200/50 p-2 dark:bg-slate-600/30">
            <Icon name="users" size="sm" className="text-slate-500 dark:text-slate-300" />
          </div>
          <p className="text-2xl font-bold text-slate-800 dark:text-white">{users.length}</p>
          <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">Total Users</p>
        </Card>
        <Card className="relative overflow-hidden border border-purple-200/50 bg-gradient-to-br from-purple-50 to-purple-100/50 p-4 dark:border-[#2D3640] dark:from-[#242B33] dark:to-[#242B33]">
          <div className="absolute right-3 top-3 rounded-lg bg-purple-200/50 p-2 dark:bg-[#2D3640]">
            <Icon name="user" size="sm" className="text-purple-600 dark:text-slate-400" />
          </div>
          <p className="text-2xl font-bold text-purple-600 dark:text-white">{users.filter((u) => u.role === "admin").length}</p>
          <p className="mt-1 text-xs font-medium text-purple-600/70 dark:text-slate-400">Admins</p>
        </Card>
        <Card className="relative overflow-hidden border border-blue-200/50 bg-gradient-to-br from-blue-50 to-blue-100/50 p-4 dark:border-[#2D3640] dark:from-[#242B33] dark:to-[#242B33]">
          <div className="absolute right-3 top-3 rounded-lg bg-blue-200/50 p-2 dark:bg-[#2D3640]">
            <Icon name="user" size="sm" className="text-blue-600 dark:text-slate-400" />
          </div>
          <p className="text-2xl font-bold text-blue-600 dark:text-white">{users.filter((u) => u.role === "manager").length}</p>
          <p className="mt-1 text-xs font-medium text-blue-600/70 dark:text-slate-400">Managers</p>
        </Card>
        <Card className="relative overflow-hidden border border-emerald-200/50 bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-4 dark:border-[#2D3640] dark:from-[#242B33] dark:to-[#242B33]">
          <div className="absolute right-3 top-3 rounded-lg bg-emerald-200/50 p-2 dark:bg-[#2D3640]">
            <Icon name="users" size="sm" className="text-emerald-600 dark:text-slate-400" />
          </div>
          <p className="text-2xl font-bold text-emerald-600 dark:text-white">{users.filter((u) => u.role === "member").length}</p>
          <p className="mt-1 text-xs font-medium text-emerald-600/70 dark:text-slate-400">Members</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[180px]">
            <Icon name="search" size="sm" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search by name or email..." value={query} onChange={(e) => setQuery(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-[#1b2a49] focus:ring-1 focus:ring-[#1b2a49] dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white" />
          </div>
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white">
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="member">Member</option>
          </select>
          {teams.length > 0 && (
            <select value={teamFilter} onChange={(e) => setTeamFilter(e.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white">
              <option value="">All Teams</option>
              {teams.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          )}
          {(roleFilter || teamFilter || query) && <button onClick={clearFilters} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-[#2D3640]">Clear</button>}
        </div>
      </Card>

      {/* Users Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#1b2a49] dark:bg-[#4CCBBF]/20">
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-white/90">Name</th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-white/90">Email</th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-white/90">Role</th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-white/90">Team</th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-white/90">Manager</th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-white/90">Status</th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-white/90">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="px-5 py-8 text-center text-slate-500">No users found</td></tr>
              ) : filtered.map((u, i) => {
                const s = statusLabel(u.status);
                return (
                  <tr key={u.user_id} className={`border-b border-slate-100 dark:border-[#2D3640]/50 ${i % 2 === 0 ? "bg-white dark:bg-[#242B33]" : "bg-slate-50/50 dark:bg-[#1C2127]/30"}`}>
                    <td className="px-5 py-3.5 font-semibold text-slate-800 dark:text-white whitespace-nowrap">{u.name}</td>
                    <td className="px-5 py-3.5 text-slate-600 dark:text-slate-400">{u.email}</td>
                    <td className="px-5 py-3.5"><Badge className={`text-[10px] capitalize ${u.role === "admin" ? "bg-purple-100 text-purple-700 dark:bg-[#2D3640] dark:text-slate-300" : u.role === "manager" ? "bg-blue-100 text-blue-700 dark:bg-[#2D3640] dark:text-slate-300" : "bg-slate-100 text-slate-600 dark:bg-[#2D3640] dark:text-slate-300"}`}>{u.role}</Badge></td>
                    <td className="px-5 py-3.5 text-slate-600 dark:text-slate-400">{u.team || "—"}</td>
                    <td className="px-5 py-3.5 text-slate-600 dark:text-slate-400">{u.manager_name || u.manager || "—"}</td>
                    <td className="px-5 py-3.5"><Badge className={`text-[10px] ${s.color}`}>{s.text}</Badge></td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <button onClick={() => setFormUser(u)} className="mr-2 rounded-md p-1.5 text-slate-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 transition-colors" title="Edit"><Icon name="edit" size="sm" /></button>
                      <button onClick={() => setDeleteTarget({ id: u.user_id, name: u.name })} className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors" title="Delete"><Icon name="trash" size="sm" /></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* User Form Modal */}
      {formUser !== undefined && (
        <UserFormModal user={formUser} teams={teams} managers={managers} onClose={() => setFormUser(undefined)} onSaved={() => { setFormUser(undefined); toast({ message: formUser ? "User updated successfully" : "User added successfully", variant: "success" }); loadData(); }} />
      )}
      {/* Teams Management Modal */}
      {showTeamsModal && (
        <TeamsModal teams={teams} users={users} onClose={() => setShowTeamsModal(false)} onTeamsChanged={loadData} />
      )}
      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete User"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        variant="danger"
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

// ─── User Form Modal ─────────────────────────────────────────────────────────

function UserFormModal({ user, teams, managers, onClose, onSaved }: { user: User | null; teams: string[]; managers: User[]; onClose: () => void; onSaved: () => void }) {
  const isEdit = !!user;
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [role, setRole] = useState(user?.role || "member");
  const [team, setTeam] = useState(user?.team || "");
  const [manager, setManager] = useState(user?.manager || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) { setError("Name and email are required."); return; }
    setSaving(true); setError(null);
    const payload: UserFormData = { name: name.trim(), email: email.trim(), role, team, manager };
    try {
      if (isEdit && user) await userManagementService.update(user.user_id, payload);
      else await userManagementService.create(payload);
      onSaved();
    } catch (err) { setError(err instanceof Error ? err.message : "Failed to save."); }
    finally { setSaving(false); }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl dark:bg-[#242B33]" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">{isEdit ? "Edit User" : "Add User"}</h2>
          <button onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-[#2D3640]"><Icon name="x" size="sm" /></button>
        </div>
        {error && <div className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700 dark:bg-red-900/20 dark:text-red-400">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Name *</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white" /></div>
          <div><label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Email *</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isEdit} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm disabled:bg-slate-50 disabled:text-slate-500 dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white" /></div>
          <div><label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Role</label><select value={role} onChange={(e) => setRole(e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white"><option value="member">Member</option><option value="manager">Manager</option><option value="admin">Admin</option></select></div>
          <div><label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Team</label><select value={team} onChange={(e) => setTeam(e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white"><option value="">Select team...</option>{teams.map((t) => <option key={t} value={t}>{t}</option>)}</select></div>
          <div><label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Manager</label><select value={manager} onChange={(e) => setManager(e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white"><option value="">Select manager...</option>{managers.map((m) => <option key={m.email} value={m.email}>{m.name}</option>)}</select></div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" size="sm" type="button" onClick={onClose}>Cancel</Button>
            <Button variant="primary" size="sm" type="submit" isLoading={saving}>{isEdit ? "Update" : "Add User"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Teams Management Modal ──────────────────────────────────────────────────

function TeamsModal({ teams, users, onClose, onTeamsChanged }: { teams: string[]; users: User[]; onClose: () => void; onTeamsChanged: () => void }) {
  const { toast } = useToast();
  const [localTeams, setLocalTeams] = useState(teams);
  const [newTeam, setNewTeam] = useState("");
  const [renamingTeam, setRenamingTeam] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  async function handleAdd() {
    if (!newTeam.trim()) return;
    try {
      const updated = await userManagementService.addTeam(newTeam.trim());
      setLocalTeams(updated); setNewTeam(""); onTeamsChanged();
    } catch { toast({ message: "Failed to add team.", variant: "error" }); }
  }

  async function handleRename(oldName: string) {
    if (!renameValue.trim() || renameValue === oldName) { setRenamingTeam(null); return; }
    try {
      const updated = await userManagementService.renameTeam(oldName, renameValue.trim());
      setLocalTeams(updated); setRenamingTeam(null); onTeamsChanged();
    } catch { toast({ message: "Failed to rename team.", variant: "error" }); }
  }

  async function handleDelete(name: string) {
    const memberCount = users.filter((u) => u.team === name).length;
    if (memberCount > 0) { toast({ message: `Cannot delete "${name}" — ${memberCount} member(s) still assigned.`, variant: "error" }); return; }
    if (!confirm(`Delete team "${name}"?`)) return;
    try {
      const updated = await userManagementService.deleteTeam(name);
      setLocalTeams(updated); onTeamsChanged();
    } catch { toast({ message: "Failed to delete team.", variant: "error" }); }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" onClick={onClose}>
      <div className="w-full max-w-md max-h-[80vh] overflow-y-auto rounded-xl bg-white p-6 shadow-2xl dark:bg-[#242B33]" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">Manage Teams</h2>
          <button onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-[#2D3640]"><Icon name="x" size="sm" /></button>
        </div>

        {/* Add team */}
        <div className="mb-4 flex gap-2">
          <input type="text" value={newTeam} onChange={(e) => setNewTeam(e.target.value)} placeholder="New team name..." onKeyDown={(e) => { if (e.key === "Enter") handleAdd(); }} className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white" />
          <Button variant="primary" size="sm" onClick={handleAdd}>Add</Button>
        </div>

        {/* Teams list */}
        <div className="divide-y divide-slate-100 dark:divide-[#2D3640]">
          {localTeams.length === 0 ? <p className="py-4 text-center text-sm text-slate-500">No teams configured.</p> : localTeams.map((t) => {
            const memberCount = users.filter((u) => u.team === t).length;
            return (
              <div key={t} className="flex items-center justify-between py-3">
                {renamingTeam === t ? (
                  <div className="flex flex-1 items-center gap-2">
                    <input type="text" value={renameValue} onChange={(e) => setRenameValue(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") handleRename(t); }} autoFocus className="flex-1 rounded border border-[#1b2a49] px-2 py-1 text-sm dark:border-[#ff9472] dark:bg-[#1C2127] dark:text-white" />
                    <button onClick={() => handleRename(t)} className="text-emerald-600 hover:text-emerald-800"><Icon name="check" size="sm" /></button>
                    <button onClick={() => setRenamingTeam(null)} className="text-slate-400 hover:text-slate-600"><Icon name="x" size="sm" /></button>
                  </div>
                ) : (
                  <>
                    <div>
                      <span className="text-sm text-slate-700 dark:text-slate-300">{t}</span>
                      <span className="ml-2 text-xs text-slate-400">({memberCount})</span>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => { setRenamingTeam(t); setRenameValue(t); }} className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-[#1b2a49] dark:hover:bg-[#2D3640]" title="Rename"><Icon name="edit" size="sm" /></button>
                      <button onClick={() => handleDelete(t)} disabled={memberCount > 0} className="rounded-md p-1 text-slate-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed dark:hover:bg-red-900/20" title={memberCount > 0 ? "Has members" : "Delete"}><Icon name="trash" size="sm" /></button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
