"use client";

import { StickyBlock } from "@/components";
import { SectionWrapper } from "./section-wrapper";

export function StickyBlockSection() {
  return (
    <SectionWrapper id="sticky-block" title="Sticky Block">
      <div className="space-y-8">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Sticky Positioning Demo
          </p>
          <p className="mb-4 text-sm text-zinc-600 dark:text-[#9FAEC1]">
            The <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs dark:bg-[#2A3441]">StickyBlock</code> component
            wraps its children with CSS <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs dark:bg-[#2A3441]">position: sticky</code> and
            a configurable top offset. Useful for keeping navigation, filters, or toolbars visible while scrolling.
          </p>

          {/* Scrollable container to demonstrate sticky behavior */}
          <div className="h-64 overflow-y-auto rounded-lg border border-zinc-200 bg-zinc-50 dark:border-[#2D3640] dark:bg-[#2A3441]">
            <div className="p-4">
              <StickyBlock offset={0} className="z-10">
                <div className="rounded-lg border border-zinc-300 bg-white px-4 py-2 shadow-sm dark:border-[#3D4A5C] dark:bg-[#242B33]">
                  <p className="text-sm font-medium text-zinc-800 dark:text-[#E8EDF2]">
                    📌 I stay at the top while you scroll
                  </p>
                </div>
              </StickyBlock>

              <div className="mt-4 space-y-4">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-md border border-zinc-200 bg-white p-3 dark:border-[#2D3640] dark:bg-[#242B33]"
                  >
                    <p className="text-sm text-zinc-600 dark:text-[#9FAEC1]">
                      Scrollable content item {i + 1} — scroll down to see the sticky block remain at the top.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Usage
          </p>
          <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-[#2D3640] dark:bg-[#2A3441]">
            <p className="text-sm text-zinc-700 dark:text-[#E8EDF2]">
              Wrap any content with <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs dark:bg-[#2A3441]">&lt;StickyBlock offset=&#123;80&#125;&gt;</code> to
              make it stick at 80px from the top of its scroll container. The parent must have a defined height and <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs dark:bg-[#2A3441]">overflow-y: auto</code>.
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
