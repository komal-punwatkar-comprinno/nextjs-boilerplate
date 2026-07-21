"use client";

import { useState } from "react";
import { MegaMenu, Button } from "@/components";
import { SectionWrapper } from "./section-wrapper";

const megaMenuItems = [
  {
    heading: "Platform",
    items: [
      {
        label: "Dashboard",
        href: "#",
        icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6",
        description: "Overview of your account metrics",
      },
      {
        label: "Analytics",
        href: "#",
        icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
        description: "Performance and engagement data",
      },
      {
        label: "Reports",
        href: "#",
        icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
        description: "Generate and export reports",
      },
    ],
  },
  {
    heading: "Team",
    items: [
      {
        label: "Members",
        href: "#",
        icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
        description: "Manage team members and access",
      },
      {
        label: "Roles",
        href: "#",
        icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
        description: "Define roles and permissions",
      },
    ],
  },
  {
    heading: "Resources",
    items: [
      {
        label: "Documentation",
        href: "#",
        icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
        description: "Guides, API reference, and tutorials",
      },
      {
        label: "Support",
        href: "#",
        icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
        description: "Get help from the team",
      },
    ],
  },
];

export function MegaMenuSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SectionWrapper id="mega-menu" title="Mega Menu">
      <div className="space-y-8">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Interactive Demo
          </p>
          <p className="mb-4 text-sm text-zinc-600 dark:text-[#9FAEC1]">
            Click the trigger button to reveal the mega menu. It closes on outside click or Escape key.
          </p>
        </div>

        <div className="relative min-h-[360px]">
          <MegaMenu
            trigger={
              <Button variant="secondary" size="sm">
                Products ▾
              </Button>
            }
            items={megaMenuItems}
            isOpen={isOpen}
            onToggle={() => setIsOpen(!isOpen)}
          />
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Features
          </p>
          <ul className="list-inside list-disc space-y-1 text-sm text-zinc-600 dark:text-[#9FAEC1]">
            <li>Grouped sections with headings</li>
            <li>Icon and description support per item</li>
            <li>Closes on outside click or Escape</li>
            <li>Animated entrance (fade + slide)</li>
            <li>Responsive grid layout (1-3 columns)</li>
          </ul>
        </div>
      </div>
    </SectionWrapper>
  );
}
