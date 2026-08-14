"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components";
import type { EnrichedTrainingRecord } from "@/features/learning-progress";
import { learningProgressService } from "@/features/learning-progress";

interface EditProgressModalProps {
  record: EnrichedTrainingRecord;
  onClose: () => void;
  onSaved: () => void;
}

/**
 * Edit Progress Modal — allows updating status, completion date, and comments.
 * Matches the existing SkillSphere edit modal.
 */
export function EditProgressModal({ record, onClose, onSaved }: EditProgressModalProps) {
  const [status, setStatus] = useState(record.status);
  const [completionDate, setCompletionDate] = useState(record.target_date?.split("T")[0] || "");
  const [comments, setComments] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const payload: Record<string, unknown> = { status };
      if (completionDate) payload.completion_date = completionDate;
      if (comments) payload.comments = comments;

      await learningProgressService.update(record.progress_id, payload);

      // If status changed to Completed, mark all curriculum as Completed
      if (status === "Completed" && record.status !== "Completed" && record.curriculum && record.curriculum.length > 0) {
        const updatedCurriculum = record.curriculum.map((c) => ({
          ...c,
          status: "Completed" as const,
        }));
        await learningProgressService.saveCurriculum(record.progress_id, updatedCurriculum);
      }

      // If status changed FROM Completed to something else, revert curriculum
      if (status !== "Completed" && record.status === "Completed" && record.curriculum && record.curriculum.length > 0) {
        const revertedCurriculum = record.curriculum.map((c) => ({
          ...c,
          status: "Not Started" as const,
        }));
        await learningProgressService.saveCurriculum(record.progress_id, revertedCurriculum);
      }

      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update progress");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl dark:bg-[#242B33]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">Edit Progress</h2>
          <button onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-[#2D3640]">
            <Icon name="x" size="sm" />
          </button>
        </div>

        <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">{record.display_course}</p>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Status */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as typeof status)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white"
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Completion Date */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Target / Completion Date</label>
            <input
              type="date"
              value={completionDate}
              onChange={(e) => setCompletionDate(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white"
            />
          </div>

          {/* Comments */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Comments</label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Optional comments..."
              rows={3}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" size="sm" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" isLoading={saving}>
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
