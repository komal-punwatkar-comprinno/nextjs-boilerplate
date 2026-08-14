"use client";

import { useState, useEffect } from "react";
import { Icon } from "@/components/ui/icon";
import { Button, Spinner } from "@/components";
import type { EnrichedTrainingRecord, CurriculumTopic } from "@/features/learning-progress";
import { learningProgressService } from "@/features/learning-progress";
import { apiClient } from "@/lib/api-client";

interface TrainingPlanItem {
  sr_no?: number;
  week?: number;
  topic?: string;
  reference?: string;
  skills?: string;
  comments?: string;
}

interface CurriculumModalProps {
  record: EnrichedTrainingRecord;
  onClose: () => void;
  onSaved: () => void;
}

/**
 * Curriculum Modal — shows week-by-week topics with editable status dropdowns.
 * Fetches the matching training plan to get reference URLs.
 */
export function CurriculumModal({ record, onClose, onSaved }: CurriculumModalProps) {
  const curriculum = record.curriculum || [];
  const [statuses, setStatuses] = useState<Record<number, string>>(
    Object.fromEntries(curriculum.map((c, i) => [i, c.status]))
  );
  const [planItems, setPlanItems] = useState<TrainingPlanItem[]>([]);
  const [loadingPlan, setLoadingPlan] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch training plans to get reference URLs
  useEffect(() => {
    async function fetchPlan() {
      try {
        const data = await apiClient.get<{ items?: any[]; plans?: any[] }>("/training-plans");
        const plans = data.items || data.plans || [];
        const courseName = record.display_course || record.training || record.course_name || "";

        // Match plan by name (exact, partial, case-insensitive)
        let plan = plans.find((p: any) =>
          p.plan_name === courseName || p.course_name === courseName ||
          p.training_name === courseName || p.name === courseName ||
          p.plan_id === record.training_id
        );
        if (!plan) {
          plan = plans.find((p: any) =>
            (p.plan_name && courseName.includes(p.plan_name)) ||
            (p.plan_name && p.plan_name.includes(courseName))
          );
        }
        if (!plan) {
          const lower = courseName.toLowerCase();
          plan = plans.find((p: any) => p.plan_name?.toLowerCase() === lower);
        }

        if (plan?.training_items) {
          setPlanItems(plan.training_items);
        }
      } catch (e) {
        console.warn("Could not load training plan for references:", e);
      } finally {
        setLoadingPlan(false);
      }
    }
    fetchPlan();
  }, [record]);

  // Merge: use plan items for reference/sr_no, curriculum for status
  const mergedCurriculum: (CurriculumTopic & { reference?: string; sr_no?: number })[] = curriculum.map((c, idx) => {
    const planItem = planItems[idx] || {};
    return {
      ...c,
      reference: c.reference || planItem.reference,
      sr_no: c.sr_no || planItem.sr_no || (idx + 1),
    };
  });

  // Group by week
  const weekGroups: Record<number, { topic: CurriculumTopic & { reference?: string; sr_no?: number }; index: number }[]> = {};
  mergedCurriculum.forEach((item, idx) => {
    const week = Number(item.week) || 1;
    if (!weekGroups[week]) weekGroups[week] = [];
    weekGroups[week].push({ topic: item, index: idx });
  });

  const delayedWeekNums = new Set(record.delayedWeeks.map((w) => w.week));

  function handleStatusChange(index: number, value: string) {
    setStatuses((prev) => ({ ...prev, [index]: value }));
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      const updatedCurriculum: CurriculumTopic[] = curriculum.map((c, i) => ({
        topic: c.topic,
        week: c.week,
        status: (statuses[i] || c.status) as CurriculumTopic["status"],
        updated_at: statuses[i] !== c.status ? new Date().toISOString() : c.updated_at,
        updated_by: statuses[i] !== c.status ? null : c.updated_by, // Will be set by backend
      }));

      await learningProgressService.saveCurriculum(record.progress_id, updatedCurriculum);

      // If all completed, auto-update overall status
      const allCompleted = updatedCurriculum.every((c) => c.status === "Completed");
      if (allCompleted && record.status !== "Completed") {
        await learningProgressService.update(record.progress_id, { status: "Completed" });
      } else if (!allCompleted && record.status === "Completed") {
        await learningProgressService.update(record.progress_id, { status: "In Progress" });
      }

      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save curriculum");
    } finally {
      setSaving(false);
    }
  }

  if (curriculum.length === 0) {
    return (
      <ModalWrapper onClose={onClose} title={`Curriculum — ${record.display_course}`}>
        <p className="py-8 text-center text-sm text-slate-500">No curriculum available for this training.</p>
      </ModalWrapper>
    );
  }

  if (loadingPlan) {
    return (
      <ModalWrapper onClose={onClose} title={`Curriculum — ${record.display_course}`}>
        <div className="flex items-center justify-center py-8"><Spinner size="md" /></div>
      </ModalWrapper>
    );
  }

  return (
    <ModalWrapper onClose={onClose} title={`Curriculum — ${record.display_course}`}>
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="max-h-[60vh] space-y-4 overflow-y-auto">
        {Object.entries(weekGroups)
          .sort(([a], [b]) => Number(a) - Number(b))
          .map(([week, topics]) => {
            const wNum = Number(week);
            const isWeekDelayed = delayedWeekNums.has(wNum);
            const delayInfo = record.delayedWeeks.find((w) => w.week === wNum);

            return (
              <div
                key={week}
                className={`overflow-hidden rounded-lg border ${isWeekDelayed ? "border-red-200 dark:border-red-800/50" : "border-slate-200 dark:border-[#2D3640]"}`}
              >
                {/* Week header */}
                <div className={`flex items-center justify-between px-4 py-2.5 text-sm font-semibold ${isWeekDelayed ? "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300" : "bg-slate-50 text-slate-700 dark:bg-[#1C2127] dark:text-slate-300"}`}>
                  <span>Week {week}</span>
                  {isWeekDelayed && delayInfo && (
                    <span className="text-xs font-normal text-red-600 dark:text-red-400">
                      {delayInfo.incomplete}/{delayInfo.total} pending
                    </span>
                  )}
                </div>

                {/* Topics */}
                <div className="divide-y divide-slate-100 dark:divide-[#2D3640]">
                  {topics.map(({ topic, index }) => (
                    <div key={index} className="flex items-start gap-3 px-4 py-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                          {topic.sr_no ? `${topic.sr_no}. ` : ""}{topic.topic || "N/A"}
                        </p>
                        {topic.reference && topic.reference !== "Explore internet sources" && (
                          <a
                            href={topic.reference}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                            View Resource
                          </a>
                        )}
                      </div>
                      <select
                        value={statuses[index] || topic.status}
                        onChange={(e) => handleStatusChange(index, e.target.value)}
                        className={`shrink-0 rounded-md border px-2 py-1 text-xs font-medium ${
                          (statuses[index] || topic.status) === "Completed"
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400"
                            : (statuses[index] || topic.status) === "In Progress"
                              ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                              : "border-slate-200 bg-slate-50 text-slate-600 dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-slate-400"
                        }`}
                      >
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
      </div>

      {/* Save button */}
      <div className="mt-4 flex justify-end gap-2 border-t border-slate-100 pt-4 dark:border-[#2D3640]">
        <Button variant="secondary" size="sm" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" size="sm" isLoading={saving} onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </ModalWrapper>
  );
}

// ─── Shared Modal Wrapper ────────────────────────────────────────────────────

function ModalWrapper({ children, title, onClose }: { children: React.ReactNode; title: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" onClick={onClose}>
      <div
        className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-2xl dark:bg-[#242B33]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">{title}</h2>
          <button onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-[#2D3640]">
            <Icon name="x" size="sm" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
