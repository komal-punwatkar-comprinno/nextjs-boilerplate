"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components";
import { skillsetHeatmapService } from "../skillset-heatmap-service";
import type { SkillData } from "../types";

interface RatingModalProps {
  userEmail: string;
  memberName: string;
  skillName: string;
  skillData: SkillData;
  currentUserName: string;
  currentUserRole: string;
  onClose: () => void;
  onSaved: () => void;
}

const RATING_LABELS = ["0 - None", "1 - Basic", "2 - Intermediate", "3 - Advanced", "4 - Expert"];

export function RatingModal({ userEmail, memberName, skillName, skillData, currentUserName, currentUserRole, onClose, onSaved }: RatingModalProps) {
  const [rating, setRating] = useState(skillData.rating || 0);
  const [comment, setComment] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    if (!comment.trim()) {
      setError("Comment is required when changing a rating.");
      return;
    }
    setSaving(true);
    setError(null);

    // Build comment string with timestamp (matching old format)
    const timestamp = new Date().toLocaleString();
    const commentEntry = `[${timestamp}] ${currentUserName}: ${comment.trim()}`;
    const existingComments = skillData.comments || "";
    const fullComment = existingComments ? `${existingComments}\n${commentEntry}` : commentEntry;

    try {
      await skillsetHeatmapService.saveRating({
        target_user_email: userEmail,
        skill_name: skillName,
        rating,
        comments: fullComment,
      });
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save rating.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl dark:bg-[#242B33]" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">Rate Skill</h2>
          <button onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-[#2D3640]"><Icon name="x" size="sm" /></button>
        </div>

        <div className="mb-4 space-y-1">
          <p className="text-sm text-slate-700 dark:text-slate-300"><span className="font-medium">Member:</span> {memberName}</p>
          <p className="text-sm text-slate-700 dark:text-slate-300"><span className="font-medium">Skill:</span> {skillName}</p>
        </div>

        {error && <div className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700 dark:bg-red-900/20 dark:text-red-400">{error}</div>}

        {/* Rating */}
        <div className="mb-4">
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Rating</label>
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white">
            {RATING_LABELS.map((label, i) => <option key={i} value={i}>{label}</option>)}
          </select>
          {/* Visual rating bar */}
          <div className="mt-2 flex gap-1">
            {[0, 1, 2, 3, 4].map((r) => (
              <div key={r} className={`h-2 flex-1 rounded-sm transition-colors ${r <= rating ? ratingBgClass(rating) : "bg-slate-200 dark:bg-slate-700"}`} />
            ))}
          </div>
        </div>

        {/* Comment history */}
        {skillData.comments && (
          <div className="mb-4">
            <label className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">Previous Comments</label>
            <div className="max-h-24 overflow-y-auto rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600 whitespace-pre-wrap dark:bg-[#1C2127] dark:text-slate-400">{skillData.comments}</div>
          </div>
        )}

        {/* New comment */}
        <div className="mb-4">
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Comment (required)</label>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={3} placeholder="Explain the rating..." className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white" />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="secondary" size="sm" onClick={onClose}>Cancel</Button>
          <Button variant="primary" size="sm" isLoading={saving} onClick={handleSave}>Save Rating</Button>
        </div>
      </div>
    </div>
  );
}

function ratingBgClass(rating: number): string {
  if (rating >= 4) return "bg-emerald-500";
  if (rating >= 3) return "bg-emerald-400";
  if (rating >= 2) return "bg-amber-400";
  if (rating >= 1) return "bg-orange-400";
  return "bg-red-400";
}
