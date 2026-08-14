"use client";

import { useState, useMemo } from "react";
import { Icon } from "@/components/ui/icon";
import { Badge, Button } from "@/components";
import { skillsetHeatmapService } from "../skillset-heatmap-service";
import type { HeatmapMember, SkillData } from "../types";

interface MemberDetailModalProps {
  member: HeatmapMember;
  currentUserRole: string;
  currentUserEmail: string;
  currentUserName: string;
  onClose: () => void;
  onDataChanged: () => void;
}

const RATING_LABELS = ["0 - None", "1 - Basic", "2 - Intermediate", "3 - Advanced", "4 - Expert"];

export function MemberDetailModal({ member, currentUserRole, currentUserEmail, currentUserName, onClose, onDataChanged }: MemberDetailModalProps) {
  const skills = member.skills || {};
  const skillEntries = Object.entries(skills);

  // Group by template
  const templateGroups = useMemo(() => {
    const groups: Record<string, { name: string; data: SkillData }[]> = {};
    skillEntries.forEach(([name, data]) => {
      const tname = data.template_name || "Other";
      if (!groups[tname]) groups[tname] = [];
      groups[tname].push({ name, data });
    });
    return groups;
  }, [skillEntries]);

  const templateNames = Object.keys(templateGroups);

  // Filter state
  const [levelFilter, setLevelFilter] = useState<string>("");

  // Filter skills by level
  const filteredGroups = useMemo(() => {
    if (!levelFilter) return templateGroups;
    const level = parseInt(levelFilter);
    const filtered: Record<string, { name: string; data: SkillData }[]> = {};
    Object.entries(templateGroups).forEach(([tname, items]) => {
      const f = items.filter((i) => (i.data.rating || 0) === level);
      if (f.length > 0) filtered[tname] = f;
    });
    return filtered;
  }, [templateGroups, levelFilter]);

  const totalSkillsShown = Object.values(filteredGroups).reduce((s, items) => s + items.length, 0);
  const canRate = currentUserRole === "admin" || currentUserRole === "manager" || member.user_email === currentUserEmail;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" onClick={onClose}>
      <div className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-xl bg-white shadow-2xl dark:bg-[#242B33]" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-[#2D3640]">
          <div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">{member.member_name} - Skills</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Team: {member.team || "N/A"}</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-[#2D3640]"><Icon name="x" size="sm" /></button>
        </div>

        {/* Assigned Templates */}
        {templateNames.length > 0 && (
          <div className="border-b border-slate-100 px-6 py-3 dark:border-[#2D3640]">
            <p className="mb-2 text-xs font-semibold text-slate-500 dark:text-slate-400">Assigned Templates:</p>
            <div className="flex flex-wrap gap-2">
              {templateNames.map((t) => (
                <Badge key={t} className="bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300">
                  {t} ({templateGroups[t].length})
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Level Filter */}
        <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-3 dark:border-[#2D3640]">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">🔽 Filter by Level:</span>
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="rounded-lg border border-slate-200 px-2 py-1 text-xs dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white"
          >
            <option value="">All Levels ({skillEntries.length})</option>
            {[0, 1, 2, 3, 4].map((l) => {
              const count = skillEntries.filter(([, d]) => (d.rating || 0) === l).length;
              return <option key={l} value={l}>{RATING_LABELS[l]} ({count})</option>;
            })}
          </select>
        </div>

        {/* Skills list */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {totalSkillsShown === 0 ? (
            <p className="py-8 text-center text-sm text-slate-500">No skills match the filter.</p>
          ) : (
            <div className="space-y-2">
              {Object.entries(filteredGroups).sort(([, a], [, b]) => b.length - a.length).map(([tname, items]) => (
                <div key={tname}>
                  {templateNames.length > 1 && (
                    <p className="mb-2 mt-4 text-xs font-semibold text-slate-400 uppercase tracking-wide dark:text-slate-500">{tname}</p>
                  )}
                  {items.map(({ name, data }) => (
                    <SkillRow
                      key={name}
                      skillName={name}
                      skillData={data}
                      userEmail={member.user_email}
                      canRate={canRate}
                      currentUserName={currentUserName}
                      currentUserRole={currentUserRole}
                      onSaved={onDataChanged}
                    />
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 px-6 py-3 dark:border-[#2D3640]">
          <Button variant="secondary" size="sm" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
}

// ─── Individual Skill Row with inline rating + comment ───────────────────────

function SkillRow({ skillName, skillData, userEmail, canRate, currentUserName, currentUserRole, onSaved }: {
  skillName: string;
  skillData: SkillData;
  userEmail: string;
  canRate: boolean;
  currentUserName: string;
  currentUserRole: string;
  onSaved: () => void;
}) {
  const [rating, setRating] = useState(skillData.rating || 0);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState("");
  const [saving, setSaving] = useState(false);

  const hasComment = !!(skillData.comments || skillData.manager_comments || skillData.admin_comments);

  async function handleRatingChange(newRating: number) {
    if (!canRate) return;
    setRating(newRating);
    // Don't save immediately — user needs to add a comment
    setShowComment(true);
  }

  async function saveWithComment() {
    if (!comment.trim()) return;
    setSaving(true);

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
      setShowComment(false);
      setComment("");
      onSaved();
    } catch (err) {
      console.error("Failed to save:", err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="border-b border-slate-100 py-3 dark:border-[#2D3640]/50">
      <div className="flex items-center gap-3">
        {/* Skill name */}
        <p className="flex-1 min-w-0 text-sm text-slate-700 dark:text-slate-300">{skillName}</p>

        {/* Rating dropdown */}
        <select
          value={rating}
          onChange={(e) => handleRatingChange(Number(e.target.value))}
          disabled={!canRate}
          className="rounded-md border border-slate-200 px-2 py-1 text-xs dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white"
        >
          {RATING_LABELS.map((label, i) => <option key={i} value={i}>{label}</option>)}
        </select>

        {/* Add/Edit Comment button */}
        {canRate && (
          <button
            onClick={() => setShowComment((v) => !v)}
            className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              hasComment
                ? "bg-[#1b2a49] text-white hover:bg-[#2a3d5f]"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-[#2D3640] dark:text-slate-300"
            }`}
          >
            💬 {hasComment ? "Edit Comment" : "Add Comment"}
          </button>
        )}
      </div>

      {/* Comment history */}
      {hasComment && !showComment && (
        <div className="mt-2 space-y-1">
          {skillData.comments && (
            <CommentBubble role="User" text={skillData.comments} by={skillData.comments_by} at={skillData.comments_at} color="bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800/50" />
          )}
          {skillData.manager_comments && (
            <CommentBubble role="Manager" text={skillData.manager_comments} by={skillData.manager_comments_by} at={skillData.manager_comments_at} color="bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800/50" />
          )}
          {skillData.admin_comments && (
            <CommentBubble role="Admin" text={skillData.admin_comments} by={skillData.admin_comments_by} at={skillData.admin_comments_at} color="bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800/50" />
          )}
        </div>
      )}

      {/* Comment input */}
      {showComment && (
        <div className="mt-2 flex gap-2">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 rounded-md border border-slate-200 px-3 py-1.5 text-xs outline-none focus:border-[#1b2a49] dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white"
            onKeyDown={(e) => { if (e.key === "Enter") saveWithComment(); }}
          />
          <Button variant="primary" size="sm" isLoading={saving} onClick={saveWithComment}>Save</Button>
          <button onClick={() => setShowComment(false)} className="text-xs text-slate-400 hover:text-slate-600">✕</button>
        </div>
      )}
    </div>
  );
}

function CommentBubble({ role, text, by, at, color }: { role: string; text: string; by?: string; at?: string; color: string }) {
  const icon = role === "Admin" ? "🛡️" : role === "Manager" ? "👔" : "👤";
  return (
    <div className={`rounded-md border px-3 py-2 text-xs ${color}`}>
      <div className="flex items-center gap-1.5 mb-0.5">
        <span>{icon}</span>
        <span className="font-semibold text-slate-600 dark:text-slate-300">{role}</span>
        {by && <span className="text-slate-400">· {by}</span>}
        {at && <span className="text-slate-400">· {new Date(at).toLocaleDateString()}</span>}
      </div>
      <p className="text-slate-600 whitespace-pre-wrap dark:text-slate-400">{text}</p>
    </div>
  );
}

function ratingColor(rating: number): string {
  if (rating >= 4) return "bg-emerald-500";
  if (rating >= 3) return "bg-emerald-400";
  if (rating >= 2) return "bg-amber-400";
  if (rating >= 1) return "bg-orange-400";
  return "bg-red-300";
}
