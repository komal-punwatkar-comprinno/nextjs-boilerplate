"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarNavItem {
  label: string;
  href: string;
  /** SVG path data for an icon. */
  icon?: string;
  /** Badge text (e.g. count). */
  badge?: string;
  /** Nested child items (creates a collapsible group). */
  children?: SidebarNavItem[];
}

interface SidebarNavProps {
  /** Navigation items. */
  items: SidebarNavItem[];
  /** Whether the sidebar is in collapsed (icon-only) mode. */
  collapsed?: boolean;
  /** Additional class names. */
  className?: string;
}

/**
 * Navigation component for use inside a sidebar shell.
 * Supports nested collapsible groups, active state detection, and collapsed mode.
 *
 * @example
 * <SidebarNav items={navItems} collapsed={false} />
 */
export function SidebarNav({ items, collapsed = false, className }: SidebarNavProps) {
  return (
    <nav aria-label="Sidebar navigation" className={cn("flex flex-col gap-1", className)}>
      {items.map((item) => (
        <NavItem key={item.href + item.label} item={item} collapsed={collapsed} />
      ))}
    </nav>
  );
}

/* ─── Individual Nav Item ────────────────────────────────────────────────── */

function NavItem({ item, collapsed }: { item: SidebarNavItem; collapsed: boolean }) {
  const pathname = usePathname();
  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
  const hasChildren = item.children && item.children.length > 0;
  const [isOpen, setIsOpen] = useState(isActive);

  const baseClasses = cn(
    "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
    "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900",
    "dark:text-[#9FAEC1] dark:hover:bg-[#2A3441] dark:hover:text-[#E8EDF2]",
    isActive && "bg-zinc-100 text-zinc-900 dark:bg-[#2A3441] dark:text-[#E8EDF2]",
    collapsed && "justify-center px-2"
  );

  if (hasChildren) {
    return (
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(baseClasses, "w-full")}
          aria-expanded={isOpen}
        >
          {item.icon && (
            <svg
              className="h-[18px] w-[18px] shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.75}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
            </svg>
          )}
          {!collapsed && (
            <>
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && <Badge value={item.badge} />}
              <ChevronIcon isOpen={isOpen} />
            </>
          )}
        </button>

        {/* Children */}
        {isOpen && !collapsed && (
          <div className="ml-4 mt-1 flex flex-col gap-0.5 border-l border-zinc-200 pl-3 dark:border-[#3D4A5C]">
            {item.children!.map((child) => (
              <NavItem key={child.href + child.label} item={child} collapsed={collapsed} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link href={item.href} className={baseClasses} title={collapsed ? item.label : undefined}>
      {item.icon && (
        <svg
          className="h-[18px] w-[18px] shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.75}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
        </svg>
      )}
      {!collapsed && (
        <>
          <span className="flex-1">{item.label}</span>
          {item.badge && <Badge value={item.badge} />}
        </>
      )}
    </Link>
  );
}

/* ─── Small helpers ──────────────────────────────────────────────────────── */

function Badge({ value }: { value: string }) {
  return (
    <span
      className={cn(
        "ml-auto inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        "bg-zinc-200 text-zinc-700",
        "dark:bg-[#3D4A5C] dark:text-[#E8EDF2]"
      )}
    >
      {value}
    </span>
  );
}

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      className={cn(
        "h-4 w-4 shrink-0 transition-transform duration-200",
        isOpen && "rotate-90"
      )}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

export type { SidebarNavProps, SidebarNavItem };
