"use client";

import { Icon } from "@/components/ui/icon";
import type { HeatmapMember } from "../types";

interface SkillChartsModalProps {
  member: HeatmapMember;
  onClose: () => void;
}

const BAR_COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#10b981"];

/**
 * Skill Charts Modal — shows horizontal bar charts grouped by template.
 * Matches the existing SkillSphere charts view.
 */
export function SkillChartsModal({ member, onClose }: SkillChartsModalProps) {
  const skills = member.skills || {};
  const skillEntries = Object.entries(skills);

  // Group by template
  const templateGroups: Record<string, { name: string; rating: number }[]> = {};
  skillEntries.forEach(([name, data]) => {
    const tname = data.template_name || "Other";
    if (!templateGroups[tname]) templateGroups[tname] = [];
    templateGroups[tname].push({ name, rating: data.rating || 0 });
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" onClick={onClose}>
      <div className="w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-xl bg-white p-6 shadow-2xl dark:bg-[#242B33]" onClick={(e) => e.stopPropagation()}>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">
            📊 {member.member_name} — Skill Charts
          </h2>
          <button onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-[#2D3640]">
            <Icon name="x" size="sm" />
          </button>
        </div>

        {skillEntries.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-500">No skills to chart.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {Object.entries(templateGroups)
              .sort(([, a], [, b]) => b.length - a.length)
              .map(([tname, items]) => (
                <div key={tname} className="rounded-lg border border-slate-200 p-4 dark:border-[#2D3640]">
                  <h3 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {tname} <span className="font-normal text-slate-400">({items.length})</span>
                  </h3>
                  <div className="space-y-2">
                    {items.map(({ name, rating }) => (
                      <div key={name} className="flex items-center gap-2">
                        <span className="w-28 shrink-0 truncate text-xs text-slate-600 dark:text-slate-400 text-right" title={name}>
                          {name}
                        </span>
                        {/* Bar */}
                        <div className="flex-1 h-5 relative bg-slate-100 rounded dark:bg-slate-800">
                          <div
                            className="absolute inset-y-0 left-0 rounded"
                            style={{
                              width: `${(rating / 4) * 100}%`,
                              backgroundColor: BAR_COLORS[rating] || BAR_COLORS[0],
                              minWidth: rating > 0 ? "4px" : "0px",
                            }}
                          />
                          {/* Grid lines */}
                          {[1, 2, 3].map((line) => (
                            <div
                              key={line}
                              className="absolute inset-y-0 border-l border-slate-200 dark:border-slate-700"
                              style={{ left: `${(line / 4) * 100}%` }}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                    {/* X-axis labels */}
                    <div className="flex items-center gap-2 mt-1">
                      <span className="w-28 shrink-0" />
                      <div className="flex-1 flex justify-between text-[10px] text-slate-400 px-0.5">
                        <span>0</span><span>1</span><span>2</span><span>3</span><span>4</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
