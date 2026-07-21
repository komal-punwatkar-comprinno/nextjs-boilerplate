"use client";

import { SidebarNav } from "@/components";
import { SectionWrapper } from "./section-wrapper";

const sampleItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    badge: "New",
  },
  {
    label: "Users",
    href: "/dashboard/users",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
    children: [
      { label: "All Users", href: "/dashboard/users" },
      { label: "Roles", href: "/dashboard/users/roles" },
      { label: "Permissions", href: "/dashboard/users/permissions" },
    ],
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
    badge: "3",
  },
];

export function NavsSection() {
  return (
    <SectionWrapper id="navs" title="Sidebar Navigation">
      <div className="space-y-8">
        {/* Expanded */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Expanded State
          </p>
          <div className="w-64 rounded-lg border border-zinc-200 p-3 dark:border-[#2D3640] dark:bg-[#242B33]">
            <SidebarNav items={sampleItems} collapsed={false} />
          </div>
        </div>

        {/* Collapsed */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Collapsed State (Icons Only)
          </p>
          <div className="w-16 rounded-lg border border-zinc-200 p-2 dark:border-[#2D3640] dark:bg-[#242B33]">
            <SidebarNav items={sampleItems} collapsed={true} />
          </div>
        </div>

        {/* Features */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Features
          </p>
          <ul className="list-inside list-disc space-y-1 text-sm text-zinc-600 dark:text-[#9FAEC1]">
            <li>Active state detection from pathname</li>
            <li>Collapsible nested groups with chevron</li>
            <li>Badge support for counts or labels</li>
            <li>Icon-only collapsed mode with tooltips</li>
            <li>Full dark mode support</li>
          </ul>
        </div>
      </div>
    </SectionWrapper>
  );
}
