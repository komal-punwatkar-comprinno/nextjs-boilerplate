"use client";

import { Sidebar } from "@/components";
import { SectionWrapper } from "./section-wrapper";

export function VerticalNavSection() {
  return (
    <SectionWrapper id="vertical-nav" title="Vertical Nav (Sidebar)">
      <div className="space-y-8">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Full Sidebar Component
          </p>
          <p className="mb-4 text-sm text-zinc-600 dark:text-[#9FAEC1]">
            The Sidebar component is the primary navigation for the dashboard. It includes
            the logo, grouped navigation links, an active state indicator, and a collapsible
            component sections panel.
          </p>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Constrained Preview
          </p>
          <div className="h-[500px] w-64 overflow-hidden rounded-lg border border-zinc-200 dark:border-[#2D3640]">
            <Sidebar />
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Features
          </p>
          <ul className="list-inside list-disc space-y-1 text-sm text-zinc-600 dark:text-[#9FAEC1]">
            <li>Brand logo and app name</li>
            <li>Grouped navigation with icons</li>
            <li>Active route highlighting from pathname</li>
            <li>Collapsible &quot;Components&quot; section with sub-items</li>
            <li>Sticky positioning in the dashboard layout</li>
            <li>Dark mode support</li>
          </ul>
        </div>
      </div>
    </SectionWrapper>
  );
}
