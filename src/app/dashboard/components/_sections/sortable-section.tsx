"use client";

import { useState } from "react";
import { SortableList } from "@/components";
import { SectionWrapper } from "./section-wrapper";

interface TaskItem {
  id: string;
  title: string;
  priority: "high" | "medium" | "low";
}

const initialItems: TaskItem[] = [
  { id: "1", title: "Review pull request #42", priority: "high" },
  { id: "2", title: "Update documentation", priority: "medium" },
  { id: "3", title: "Fix navigation bug", priority: "high" },
  { id: "4", title: "Design new dashboard layout", priority: "low" },
  { id: "5", title: "Write unit tests for auth module", priority: "medium" },
];

const priorityColors: Record<string, string> = {
  high: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  low: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
};

export function SortableSection() {
  const [items, setItems] = useState<TaskItem[]>(initialItems);

  return (
    <SectionWrapper id="sortable" title="Sortable List">
      <div className="space-y-8">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Drag to Reorder
          </p>
          <p className="mb-4 text-sm text-zinc-600 dark:text-[#9FAEC1]">
            Grab the drag handle on the left to reorder items. Uses native pointer events — no external library required.
          </p>
          <div className="max-w-lg">
            <SortableList
              items={items}
              onReorder={setItems}
              renderItem={(item, _index, dragHandleProps) => (
                <div className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-3 dark:border-[#2D3640] dark:bg-[#242B33]">
                  {/* Drag handle */}
                  <button
                    type="button"
                    className="flex-shrink-0 text-zinc-400 hover:text-zinc-600 dark:text-[#9FAEC1] dark:hover:text-[#E8EDF2]"
                    {...dragHandleProps}
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                    </svg>
                  </button>

                  {/* Content */}
                  <span className="flex-1 text-sm font-medium text-zinc-800 dark:text-[#E8EDF2]">
                    {item.title}
                  </span>

                  {/* Priority badge */}
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${priorityColors[item.priority]}`}>
                    {item.priority}
                  </span>
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
