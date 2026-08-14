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

  // Pastel color mapping per card for visual variety
  const pastelColors = [
    "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
    "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400",
    "bg-violet-50 text-violet-600 dark:bg-violet-900/20 dark:text-violet-400",
    "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
    "bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400",
    "bg-cyan-50 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-400",
    "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400",
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
            className="group flex flex-col rounded-xl border border-slate-200/80 bg-white p-6 transition-all duration-200 hover:border-slate-300 hover:shadow-lg dark:border-[#2D3640] dark:bg-[#242B33] dark:hover:border-[#3D4A5C]"
          >
            {/* Icon - centered, larger, with pastel background */}
            <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-xl ${pastelColors[idx % pastelColors.length]}`}>
              <Icon name={card.icon} size="md" />
            </div>

            {/* Title - centered */}
            <h3 className="mt-4 text-center text-sm font-semibold text-slate-800 dark:text-white">
              {card.title}
            </h3>

            {/* Description - centered */}
            <p className="mt-2 text-center text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              {card.description}
            </p>

            {/* CTA Button */}
            <div className="mt-4 flex justify-center">
              <span className="inline-flex items-center rounded-md bg-[#1B2A49] px-4 py-2 text-xs font-medium text-white transition-all group-hover:bg-[#2E4A7A] dark:bg-[#2D3640] dark:group-hover:bg-[#3D5A80]">
                {card.buttonLabel}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
