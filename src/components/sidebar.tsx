"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { sidebarNavigation } from "@/config/navigation";
import { Icon } from "@/components/ui/icon";
import type { IconName } from "@/components/ui/icons";

export interface SidebarProps {
  className?: string;
  collapsed?: boolean;
  userRole?: string;
}

/**
 * SkillSphere sidebar navigation.
 * Always-dark sidebar matching the original boilerplate design.
 * Light theme: #1A1F2E (dark navy), Dark theme: #0f1318 (deeper black).
 */
export function Sidebar({ className = "", collapsed = false, userRole = "member" }: SidebarProps) {
  const pathname = usePathname();

  const visibleItems = sidebarNavigation.filter(
    (item) => !item.adminOnly || userRole === "admin"
  );

  return (
    <aside
      className={[
        "flex h-full flex-col border-r border-white/[0.06] bg-[#1A1F2E] dark:bg-[#0f1318]",
        collapsed ? "w-[60px]" : "w-64 lg:w-56",
        className,
      ].join(" ")}
    >
      {/* ── Logo / Brand ──────────────────────────────────────────── */}
      <div className="flex h-16 items-center gap-3 border-b border-white/[0.06] px-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/comprinno-logo.png" alt="Comprinno" className="h-9 w-auto object-contain" />
        {!collapsed && (
          <span className="text-base font-semibold tracking-tight text-white">
            {siteConfig.name}
          </span>
        )}
      </div>

      {/* ── Navigation ────────────────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto px-2 py-4" aria-label="Sidebar navigation">
        <ul className="space-y-1">
          {visibleItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={[
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                    isActive
                      ? "bg-[#4CCBBF]/15 text-[#4CCBBF]"
                      : "text-[#94A3B8] hover:bg-white/[0.05] hover:text-[#E2E8F0]",
                  ].join(" ")}
                  title={collapsed ? item.label : undefined}
                >
                  {item.icon && (
                    <Icon
                      name={item.icon as IconName}
                      size="sm"
                      className="shrink-0"
                    />
                  )}
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ── Footer ────────────────────────────────────────────────── */}
      <div className="border-t border-white/[0.06] px-2 py-3" />
    </aside>
  );
}
