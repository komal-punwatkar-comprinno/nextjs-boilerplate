"use client";

import { useState, useEffect } from "react";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components";
import { certificationService } from "../certification-service";
import { userManagementService } from "@/features/user-management";
import type { CertificationRecord } from "../types";

interface CertFormModalProps {
  cert?: CertificationRecord | null;
  userRole: string;
  userName: string;
  onClose: () => void;
  onSaved: () => void;
}

export function CertFormModal({ cert, userRole, userName, onClose, onSaved }: CertFormModalProps) {
  const isEdit = !!cert;
  const isMember = userRole === "member";

  const [memberName, setMemberName] = useState(cert?.member_name || (isMember ? userName : ""));
  const [certName, setCertName] = useState(cert?.certification_name || "");
  const [status, setStatus] = useState<string>(cert?.status || "Not started");
  const [targetDate, setTargetDate] = useState(cert?.target_date || "");
  const [completionDate, setCompletionDate] = useState(cert?.completion_date || cert?.completed_date || "");
  const [comments, setComments] = useState(cert?.comments || "");
  const [certImage, setCertImage] = useState(cert?.certification_image || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Users list for admin/manager dropdown
  const [users, setUsers] = useState<{ name: string; email: string; team?: string }[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  useEffect(() => {
    if (!isMember && !isEdit) {
      setLoadingUsers(true);
      userManagementService.list()
        .then((list) => {
          setUsers(list.map((u) => ({ name: u.name, email: u.email, team: u.team })));
        })
        .catch(() => {/* silently ignore */})
        .finally(() => setLoadingUsers(false));
    }
  }, [isMember, isEdit]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!memberName.trim() || !certName.trim()) {
      setError("Member name and certification name are required.");
      return;
    }
    setSaving(true);
    setError(null);

    const payload = {
      member_name: memberName.trim(),
      certification_name: certName.trim(),
      status,
      target_date: targetDate || undefined,
      completion_date: completionDate || undefined,
      comments: comments || undefined,
      certification_image: certImage || undefined,
    };

    try {
      if (isEdit && cert) {
        await certificationService.update(cert.record_id, payload);
      } else {
        await certificationService.create(payload);
      }
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save certification.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl dark:bg-[#242B33]" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">
            {isEdit ? "Edit Certification" : isMember ? "Add My Certification" : "Add Certification"}
          </h2>
          <button onClick={onClose} className="cursor-pointer rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-[#2D3640]">
            <Icon name="x" size="sm" />
          </button>
        </div>

        {error && <div className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700 dark:bg-red-900/20 dark:text-red-400">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Member Name — dropdown for admin/manager (new), read-only for member, editable text when editing */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Member Name <span className="text-red-500">*</span>
            </label>
            {isMember ? (
              /* Member: show their own name, read-only */
              <input
                type="text"
                value={memberName}
                readOnly
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-slate-400"
              />
            ) : isEdit ? (
              /* Edit mode: keep as text (name already saved) */
              <input
                type="text"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white"
              />
            ) : (
              /* Admin/manager creating new: show user dropdown */
              <select
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
                disabled={loadingUsers}
                className="cursor-pointer w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white disabled:opacity-50"
              >
                <option value="">
                  {loadingUsers ? "Loading users..." : "-- Select a member --"}
                </option>
                {users.map((u) => (
                  <option key={u.email} value={u.name}>
                    {u.name}{u.team ? ` (${u.team})` : ""}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Certification Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={certName}
              onChange={(e) => setCertName(e.target.value)}
              placeholder="e.g. AWS Solutions Architect"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="cursor-pointer w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white"
            >
              <option value="Not started">Not started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Target Date</label>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="cursor-pointer w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Completion Date</label>
              <input
                type="date"
                value={completionDate}
                onChange={(e) => setCompletionDate(e.target.value)}
                className="cursor-pointer w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Comments</label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={2}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Certificate Image URL</label>
            <input
              type="url"
              value={certImage}
              onChange={(e) => setCertImage(e.target.value)}
              placeholder="https://..."
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" size="sm" type="button" onClick={onClose}>Cancel</Button>
            <Button variant="primary" size="sm" type="submit" isLoading={saving}>
              {isEdit ? "Update" : "Add"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
