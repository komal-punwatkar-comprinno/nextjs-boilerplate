"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components";
import type { EnrichedTrainingRecord } from "@/features/learning-progress";
import { learningProgressService } from "@/features/learning-progress";
import { formatDate } from "./training-card";

interface ExtensionModalProps {
  record: EnrichedTrainingRecord;
  onClose: () => void;
  onSubmitted: () => void;
}

/**
 * Extension Request Modal — allows requesting week-level or full extension.
 * Matches the existing SkillSphere extension request flow.
 */
export function ExtensionModal({ record, onClose, onSubmitted }: ExtensionModalProps) {
  const [extensionType, setExtensionType] = useState<"week" | "full">("week");
  const [reason, setReason] = useState("");
  const [newDate, setNewDate] = useState("");
  const [weekNumber, setWeekNumber] = useState<number>(record.delayedWeeks[0]?.week || 1);
  const [extensionDays, setExtensionDays] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get available delayed weeks for the dropdown
  const delayedWeeks = record.delayedWeeks || [];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!reason.trim()) {
      setError("Please provide a reason for the extension.");
      return;
    }

    let requestNewDate = newDate;

    if (extensionType === "full" && !requestNewDate) {
      setError("Please select a new target date.");
      return;
    }

    if (extensionType === "week") {
      if (!weekNumber) {
        setError("Please select a week number.");
        return;
      }
      // Calculate date from extension days if provided
      if (extensionDays) {
        const days = parseInt(extensionDays);
        if (!days || days < 1) {
          setError("Please enter a valid number of days.");
          return;
        }
        const today = new Date();
        let daysAdded = 0;
        const currentDate = new Date(today);
        while (daysAdded < days) {
          currentDate.setDate(currentDate.getDate() + 1);
          const dayOfWeek = currentDate.getDay();
          if (dayOfWeek !== 0 && dayOfWeek !== 6) daysAdded++;
        }
        requestNewDate = currentDate.toISOString().split("T")[0];
      }
      if (!requestNewDate) {
        setError("Please provide extension days or select a new date.");
        return;
      }
    }

    setSubmitting(true);
    try {
      await learningProgressService.requestExtension(record.progress_id, {
        extension_type: extensionType,
        week_number: extensionType === "week" ? weekNumber : undefined,
        new_week_date: extensionType === "week" ? requestNewDate : undefined,
        new_end_date: extensionType === "full" ? requestNewDate : undefined,
        reason: reason.trim(),
      });
      onSubmitted();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit extension request.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl dark:bg-[#242B33]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">Request Extension</h2>
          <button onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-[#2D3640]">
            <Icon name="x" size="sm" />
          </button>
        </div>

        <p className="mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">{record.display_course}</p>
        <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
          Current deadline: {formatDate(record.target_date)}
        </p>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Extension Type */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Extension Type</label>
            <select
              value={extensionType}
              onChange={(e) => setExtensionType(e.target.value as "week" | "full")}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white"
            >
              <option value="week">Week Extension (extend a specific week)</option>
              <option value="full">Full Extension (extend overall deadline)</option>
            </select>
          </div>

          {/* Week-specific fields */}
          {extensionType === "week" && (
            <>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Week Number</label>
                <select
                  value={weekNumber}
                  onChange={(e) => setWeekNumber(Number(e.target.value))}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white"
                >
                  {delayedWeeks.length > 0
                    ? delayedWeeks.map((w) => (
                        <option key={w.week} value={w.week}>
                          Week {w.week} ({w.incomplete} topics pending)
                        </option>
                      ))
                    : Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>Week {i + 1}</option>
                      ))
                  }
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Extension Days (working days)</label>
                <input
                  type="number"
                  min="1"
                  value={extensionDays}
                  onChange={(e) => setExtensionDays(e.target.value)}
                  placeholder="e.g. 5"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white"
                />
                <p className="mt-1 text-xs text-slate-400">Or select a specific date below:</p>
              </div>
            </>
          )}

          {/* New Date */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              {extensionType === "full" ? "New Target Date" : "New Week Deadline (optional if days provided)"}
            </label>
            <input
              type="date"
              value={newDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setNewDate(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white"
            />
          </div>

          {/* Reason */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Reason</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Explain why you need an extension..."
              rows={3}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-white"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" size="sm" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" isLoading={submitting}>
              Submit Request
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
