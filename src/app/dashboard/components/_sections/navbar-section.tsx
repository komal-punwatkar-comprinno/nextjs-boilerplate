"use client";

import { Navbar } from "@/components";
import { SectionWrapper } from "./section-wrapper";

export function NavbarSection() {
  return (
    <SectionWrapper id="navbar" title="Navbar">
      <div className="space-y-8">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Top Navigation Bar
          </p>
          <p className="mb-4 text-sm text-zinc-600 dark:text-[#9FAEC1]">
            The Navbar is a layout-level component that provides the top header bar with page title,
            search, theme toggle, notifications, and user menu. It uses the current pathname
            to derive the page title automatically.
          </p>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Live Preview
          </p>
          <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-[#2D3640]">
            <Navbar onMenuToggle={() => {}} />
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Features
          </p>
          <ul className="list-inside list-disc space-y-1 text-sm text-zinc-600 dark:text-[#9FAEC1]">
            <li>Sidebar toggle button</li>
            <li>Auto-detected page title from pathname</li>
            <li>Desktop search input with ⌘K shortcut hint</li>
            <li>Mobile expandable search</li>
            <li>Theme toggle (dark/light)</li>
            <li>Notification dropdown with unread count</li>
            <li>User avatar menu with profile/settings/sign-out</li>
          </ul>
        </div>
      </div>
    </SectionWrapper>
  );
}
