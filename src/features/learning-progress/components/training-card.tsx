"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { Badge, Button, Card } from "@/components";
import type { EnrichedTrainingRecord, CurriculumTopic } from "@/features/learning-progress";

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function formatDate(dateStr?: string): string {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export function getStatusColor(status: string, isDelayed: boolean): string {
  if (isDelayed) return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
  switch (status) {
    case "Completed": return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
    case "In Progress": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
    default: return "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300";
  }
}

// ─── Progress Ring ───────────────────────────────────────────────────────────

export function ProgressRing({ value }: { value: number }) {
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const color = value === 100 ? "#10b981" : value > 0 ? "#3b82f6" : "#94a3b8";

  return (
    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
      <svg className="h-14 w-14 -rotate-90" viewBox="0 0 52 52">
        <circle cx="26" cy="26" r={radius} fill="none" stroke="currentColor" strokeWidth="3" className="text-slate-200 dark:text-slate-700" />
        <circle cx="26" cy="26" r={radius} fill="none" stroke={color} strokeWidth="3" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <span className="absolute text-xs font-bold text-slate-700 dark:text-slate-300">{value}%</span>
    </div>
  );
}

// ─── Training Card ───────────────────────────────────────────────────────────

interface TrainingCardProps {
  record: EnrichedTrainingRecord;
  userRole: string;
  userEmail: string;
  onViewCurriculum: (record: EnrichedTrainingRecord) => void;
  onEditProgress: (record: EnrichedTrainingRecord) => void;
  onRequestExtension: (record: EnrichedTrainingRecord) => void;
  onDelete?: (progressId: string) => void;
}

export function TrainingCard({
  record,
  userRole,
  userEmail,
  onViewCurriculum,
  onEditProgress,
  onRequestExtension,
  onDelete,
}: TrainingCardProps) {
  const [expanded, setExpanded] = useState(false);
  const statusLabel = record.isDelayed ? "Delayed" : record.effective_status;
  const extLabel = record.extension_status === "pending" ? " · Ext. Pending"
    : record.extension_status === "approved" ? " · Ext. Approved" : "";

  const canRequestExtension =
    (record.user_email === userEmail || userRole === "admin" || userRole === "manager") &&
    record.status !== "Completed" &&
    record.extension_status !== "pending";

  const canDelete = userRole === "admin";

  return (
    <Card className="relative overflow-hidden transition-all hover:shadow-md hover:before:opacity-100 before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-[#ff9472] before:opacity-0 before:transition-opacity">
      {/* Header row — clickable to expand */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-slate-50 dark:hover:bg-[#2D3640]/40"
      >
        <Icon
          name="chevronRight"
          size="sm"
          className={`shrink-0 text-slate-400 transition-transform ${expanded ? "rotate-90" : ""}`}
        />
        <ProgressRing value={record.progress} />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-800 truncate dark:text-white">
            {record.display_course}
          </p>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            {formatDate(record.assigned_date)} → {formatDate(record.target_date)}
          </p>
        </div>
        <Badge className={`shrink-0 whitespace-nowrap uppercase text-[11px] tracking-wide ${getStatusColor(record.effective_status, record.isDelayed)}`}>
          {statusLabel}{extLabel}
        </Badge>
      </button>

      {/* Expanded details */}
      {expanded && (
        <div className="border-t border-slate-100 p-4 dark:border-[#2D3640]">
          {/* Delay warnings */}
          {record.isDelayed && record.delayedWeeks.length > 0 && (
            <div className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700 dark:bg-red-900/20 dark:text-red-400">
              <Icon name="warning" size="sm" className="mr-1 inline" />
              Behind schedule: {record.delayedWeeks.map((w) => `Week ${w.week} (${w.incomplete}/${w.total} pending)`).join(", ")}
            </div>
          )}

          {record.isDelayed && record.delayedWeeks.length === 0 && (
            <div className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700 dark:bg-red-900/20 dark:text-red-400">
              <Icon name="warning" size="sm" className="mr-1 inline" />
              {record.extension_status === "pending"
                ? `Extension request pending. Current deadline: ${formatDate(record.target_date)}`
                : record.extension_status === "approved"
                  ? `Extension approved until ${formatDate(record.extension_new_date || record.target_date)}. Training still not completed.`
                  : `Training crossed deadline of ${formatDate(record.target_date)} and is still not completed.`}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<Icon name="clipboard" size="sm" />}
              onClick={(e) => { e.stopPropagation(); onViewCurriculum(record); }}
            >
              View Curriculum
            </Button>
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<Icon name="edit" size="sm" />}
              onClick={(e) => { e.stopPropagation(); onEditProgress(record); }}
            >
              Edit Progress
            </Button>
            {canRequestExtension && (
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<Icon name="calendar" size="sm" />}
                onClick={(e) => { e.stopPropagation(); onRequestExtension(record); }}
              >
                Request Extension
              </Button>
            )}
            {canDelete && onDelete && (
              <Button
                variant="danger"
                size="sm"
                leftIcon={<Icon name="trash" size="sm" />}
                onClick={(e) => { e.stopPropagation(); onDelete(record.progress_id); }}
              >
                Delete
              </Button>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
