"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { usePermissions } from "@/hooks/use-permissions";
import { routes } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { Icon } from "@/components/ui/icon";
import type { IconName } from "@/components/ui/icons";

interface DashboardCard {
  title: string;
  description: string;
  icon: IconName;
  href: string;
  buttonLabel: string;
  adminOnly?: boolean;
}

const dashboardCards: DashboardCard[] = [
  // ── Common cards (all roles) ────────────────────────────────────────────
  {
    title: "Learning Progress",
    description: "Monitor organization's training journey and track completion rates",
    icon: "trendUp",
    href: routes.learningProgress,
    buttonLabel: "View Progress",
  },
  {
    title: "Certification Progress",
    description: "Track and manage organization's professional certifications",
    icon: "certificate",
    href: routes.certificationProgress,
    buttonLabel: "View Certifications",
  },
  {
    title: "Skillset Heatmap",
    description: "Visualize organization's team skills and proficiency levels",
    icon: "gridCells",
    href: routes.skillsetHeatmap,
    buttonLabel: "View Heatmap",
  },

  // ── Admin-only cards ────────────────────────────────────────────────────
  {
    title: "Analytics Dashboard",
    description: "View organization's comprehensive analytics and insights",
    icon: "chartBar",
    href: routes.analytics,
    buttonLabel: "View Analytics",
    adminOnly: true,
  },
  {
    title: "Skillset Templates",
    description: "Create and manage organization's reusable skill templates",
    icon: "layerGroup",
    href: routes.skillsetTemplates,
    buttonLabel: "Manage Templates",
    adminOnly: true,
  },
  {
    title: "Training Plans",
    description: "Design and manage organization's comprehensive training plans",
    icon: "calendar",
    href: routes.trainingPlans,
    buttonLabel: "Manage Plans",
    adminOnly: true,
  },
  {
    title: "User Management",
    description: "Manage organization's team members, roles, and permissions",
    icon: "users",
    href: routes.userManagement,
    buttonLabel: "Manage Users",
    adminOnly: true,
  },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const { isAdmin } = usePermissions();

  const visibleCards = dashboardCards.filter(
    (card) => !card.adminOnly || isAdmin
  );

  // Color scheme per card icon
  const iconColors = [
    "bg-blue-100 text-blue-600 dark:bg-blue-500/25 dark:text-blue-200",
    "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/25 dark:text-emerald-200",
    "bg-violet-100 text-violet-600 dark:bg-violet-500/25 dark:text-violet-200",
    "bg-amber-100 text-amber-600 dark:bg-amber-500/25 dark:text-amber-200",
    "bg-rose-100 text-rose-600 dark:bg-rose-500/25 dark:text-rose-200",
    "bg-cyan-100 text-cyan-600 dark:bg-cyan-500/25 dark:text-cyan-200",
    "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/25 dark:text-indigo-200",
  ];

  return (
    <div className="space-y-6">
      {/* ── Welcome Header ────────────────────────────────────────────────── */}
      <div>
        <h1 className="text-xl font-semibold text-slate-800 dark:text-white">
          Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 17 ? "afternoon" : "evening"}{user?.name ? `, ${user.name}` : ""}
        </h1>
        <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
          {siteConfig.description}
        </p>
      </div>

      {/* ── Cards Grid ────────────────────────────────────────────────────── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleCards.map((card, idx) => (
          <Link
            key={card.title}
            href={card.href}
            className="group flex flex-col rounded-xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 cursor-default dark:border-[#3D4A5C] dark:bg-[#2D3640] dark:hover:border-[#4CCBBF]/40"
          >
            {/* Icon */}
            <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-xl ${iconColors[idx % iconColors.length]}`}>
              <Icon name={card.icon} size="md" />
            </div>

            {/* Title */}
            <h3 className="mt-4 text-center text-sm font-bold text-slate-800 dark:text-white">
              {card.title}
            </h3>

            {/* Description */}
            <p className="mt-2 text-center text-xs leading-relaxed text-slate-600 dark:text-white/80">
              {card.description}
            </p>

            {/* CTA Button */}
            <div className="mt-5 flex justify-center">
              <span className="inline-flex items-center rounded-lg bg-[#1B2A49] px-4 py-2 text-xs font-semibold text-white cursor-pointer transition-all group-hover:bg-[#4CCBBF] group-hover:text-[#1B2A49] dark:bg-[#4CCBBF] dark:text-[#1C2127] dark:group-hover:bg-[#4CCBBF]/80">
                {card.buttonLabel}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
