"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// ─── Public Types ────────────────────────────────────────────────────────────
export interface SubItem {
  id: string;
  label: string;
  href: string;
}

export interface SubGroup {
  heading: string;
  items: SubItem[];
}

export interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
  badgeColor?: string;
}

export interface PageLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

export interface UserInfo {
  name: string;
  role: string;
  avatarUrl: string;
}

export interface SidebarProps {
  /** Extra class names on the root aside */
  className?: string;
  /** Collapsed (icon-only) mode */
  collapsed?: boolean;
  /** Currently active section id (from scroll spy) */
  activeSection?: string | null;
  /** Called when a sub-item is clicked */
  onSectionClick?: (id: string) => void;

  // ─── Data props ─────────────────────────────────────────────────────────
  /** Logo element rendered in the header */
  logo: React.ReactNode;
  /** Logo element rendered when collapsed */
  logoCollapsed: React.ReactNode;
  /** Home link for the logo */
  homeHref: string;
  /** Primary nav items (Main Menu section) */
  navItems: NavItem[];
  /** Label for the main nav section */
  navLabel?: string;
  /** Page links shown in "Pages" section before Components (e.g. Documentation) */
  pageLinks?: PageLink[];
  /** Page links shown after the Components section (e.g. Settings) */
  pageLinksAfter?: PageLink[];
  /** Label for the pages section */
  pagesLabel?: string;
  /** Grouped sub-items shown under a collapsible "Components" section */
  componentGroups: SubGroup[];
  /** Label for the collapsible components section */
  componentsLabel?: string;
  /** Icon for the components section */
  componentsIcon?: React.ReactNode;
  /** Href the components button navigates to on first open */
  componentsHref: string;
  /** User info for the bottom strip */
  user?: UserInfo;
  /** Footer action button (e.g. settings gear) */
  userAction?: React.ReactNode;
}

// ─── Internal helpers ────────────────────────────────────────────────────────

function IconChevron({ open }: { open: boolean }) {
  return (
    <svg className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${open ? "rotate-90" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

function Tooltip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="group/tip relative flex items-center">
      {children}
      <div className="pointer-events-none absolute left-full ml-3 z-[9999] whitespace-nowrap rounded-lg border border-white/10 bg-[#0f172a] px-2.5 py-1.5 text-xs font-medium text-[#E2E8F0] opacity-0 shadow-xl transition-opacity group-hover/tip:opacity-100">
        {label}
        <span className="absolute -left-1 top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#0f172a]" />
      </div>
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export function Sidebar({
  className = "",
  collapsed = false,
  activeSection,
  onSectionClick,
  logo,
  logoCollapsed,
  homeHref,
  navItems,
  navLabel = "Main Menu",
  pageLinks = [],
  pageLinksAfter = [],
  pagesLabel = "Pages",
  componentGroups,
  componentsLabel = "Components",
  componentsIcon,
  componentsHref,
  user,
  userAction,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isOnComponents = pathname === componentsHref || pathname.startsWith(componentsHref + "/");
  const [componentsOpen, setComponentsOpen] = useState(isOnComponents);
  const [openSubGroups, setOpenSubGroups] = useState<Record<string, boolean>>(
    () => Object.fromEntries(componentGroups.map((g) => [g.heading, false]))
  );

  function toggleSubGroup(heading: string) {
    setOpenSubGroups((prev) => ({ ...prev, [heading]: !prev[heading] }));
  }

  // Auto-open the sub-group that contains the active section when user scrolls
  useEffect(() => {
    if (!activeSection) return;
    const group = componentGroups.find((g) =>
      g.items.some((item) => item.id === activeSection)
    );
    if (group) {
      setOpenSubGroups((prev) => {
        if (prev[group.heading]) return prev;
        return { ...prev, [group.heading]: true };
      });
    }
  }, [activeSection, componentGroups]);

  function isRouteActive(href: string) {
    if (href === navItems[0]?.href) return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  }

  // Full link (expanded)
  const linkCls = (active: boolean) => [
    "flex items-center gap-2.5 rounded-lg px-3 py-2 text-[15px] transition-colors",
    active
      ? "bg-[#4CCBBF]/15 text-[#4CCBBF] font-medium"
      : "text-[#94A3B8] hover:bg-white/[0.05] hover:text-[#E2E8F0]",
  ].join(" ");

  // Icon-only link (collapsed)
  const iconLinkCls = (active: boolean) => [
    "flex items-center justify-center rounded-lg p-2 transition-colors",
    active
      ? "bg-[#4CCBBF]/15 text-[#4CCBBF]"
      : "text-[#64748B] hover:bg-white/[0.05] hover:text-[#E2E8F0]",
  ].join(" ");

  const iconCls = (active: boolean) =>
    active ? "text-[#4CCBBF]" : "text-[#64748B]";

  return (
    <aside
      className={`flex h-full flex-col bg-[#1A1F2E] dark:bg-[#0f1318] ${collapsed ? "overflow-visible" : "overflow-hidden"} ${className}`}
      aria-label="Main navigation"
    >
      {/* ── Logo ─────────────────────────────────────────────────────────── */}
      <div className={`flex h-14 shrink-0 items-center border-b border-white/[0.06] ${collapsed ? "justify-center px-0" : "px-4"}`}>
        <Link href={homeHref} className="flex items-center min-w-0">
          {collapsed ? logoCollapsed : logo}
        </Link>
      </div>

      {/* ── Nav ──────────────────────────────────────────────────────────── */}
      <nav className={`flex-1 py-4 space-y-5 ${collapsed ? "px-2 overflow-visible" : "px-3 overflow-y-auto overflow-x-hidden"}`}>

        {/* MAIN MENU */}
        <div>
          {!collapsed && (
            <p className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-widest text-[#475569]">
              {navLabel}
            </p>
          )}
          <ul className="space-y-0.5">
            {navItems.map((item) => {
              const active = isRouteActive(item.href);
              return (
                <li key={item.href}>
                  {collapsed ? (
                    <Tooltip label={item.label}>
                      <Link href={item.href} className={`${iconLinkCls(active)} relative w-full`}>
                        <span className={iconCls(active)}>{item.icon}</span>
                        {item.badge && (
                          <span className={`absolute right-1 top-1 flex h-3.5 min-w-[0.875rem] items-center justify-center rounded-full px-1 text-[9px] font-bold ${item.badgeColor}`}>
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </Tooltip>
                  ) : (
                    <Link href={item.href} className={linkCls(active)}>
                      <span className={iconCls(active)}>{item.icon}</span>
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <span className={`inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full px-1.5 text-[10px] font-semibold ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Divider between sections in collapsed mode */}
        {collapsed && (
          <div className="border-t border-white/[0.06]" />
        )}

        {/* PAGES */}
        <div>
          {!collapsed && (
            <p className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-widest text-[#475569]">
              {pagesLabel}
            </p>
          )}
          <ul className="space-y-0.5">

            {/* Static page links (Documentation, etc.) */}
            {pageLinks.map((page) => {
              const active = isRouteActive(page.href);
              return (
                <li key={page.href}>
                  {collapsed ? (
                    <Tooltip label={page.label}>
                      <Link href={page.href} className={`${iconLinkCls(active)} w-full`}>
                        <span className={iconCls(active)}>{page.icon}</span>
                      </Link>
                    </Tooltip>
                  ) : (
                    <Link href={page.href} className={linkCls(active)}>
                      <span className={iconCls(active)}>{page.icon}</span>
                      <span className="flex-1">{page.label}</span>
                    </Link>
                  )}
                </li>
              );
            })}

            {/* Components (collapsible) */}
            {componentGroups.length > 0 && (
              <li>
                {collapsed ? (
                  <Tooltip label={componentsLabel}>
                    <Link href={componentsHref} className={`${iconLinkCls(isOnComponents)} w-full`}>
                      <span className={iconCls(isOnComponents)}>{componentsIcon}</span>
                    </Link>
                  </Tooltip>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        if (!componentsOpen) {
                          setComponentsOpen(true);
                          router.push(componentsHref);
                        } else {
                          e.preventDefault();
                          setComponentsOpen(false);
                        }
                      }}
                      className={[
                        "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[15px] transition-colors",
                        isOnComponents
                          ? "bg-[#4CCBBF]/15 text-[#4CCBBF] font-medium"
                          : "text-[#94A3B8] hover:bg-white/[0.05] hover:text-[#E2E8F0]",
                      ].join(" ")}
                    >
                      <span className={iconCls(isOnComponents)}>{componentsIcon}</span>
                      <span className="flex-1 text-left">{componentsLabel}</span>
                      <span className={isOnComponents ? "text-[#4CCBBF]" : "text-[#475569]"}>
                        <IconChevron open={componentsOpen} />
                      </span>
                    </button>

                    {componentsOpen && (
                      <div className="mt-1 ml-3.5 border-l border-white/[0.06] pl-3 space-y-1">
                        {componentGroups.map((group) => {
                          const isGroupOpen = openSubGroups[group.heading] ?? false;
                          const hasActiveItem = group.items.some(
                            (sub) => pathname === sub.href || (isOnComponents && activeSection === sub.id)
                          );
                          return (
                            <div key={group.heading}>
                              {/* Collapsible sub-group heading */}
                              <button
                                type="button"
                                onClick={() => {
                                  toggleSubGroup(group.heading);
                                  // Navigate to components page if not already there
                                  if (!isOnComponents) {
                                    router.push(componentsHref);
                                  }
                                }}
                                className={[
                                  "flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-colors",
                                  hasActiveItem
                                    ? "text-[#4CCBBF]/80"
                                    : "text-[#475569] hover:text-[#94A3B8]",
                                ].join(" ")}
                              >
                                <svg
                                  className={`h-3 w-3 shrink-0 transition-transform duration-200 ${isGroupOpen ? "rotate-90" : ""}`}
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2.5}
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                                <span>{group.heading}</span>
                                <span className="ml-auto text-[9px] font-normal text-[#475569]/60">{group.items.length}</span>
                              </button>
                              {/* Sub-group items */}
                              {isGroupOpen && (
                                <ul className="mt-0.5 ml-2 space-y-0.5 border-l border-white/[0.04] pl-2">
                                  {group.items.map((sub) => {
                                    const isSubActive =
                                      pathname === sub.href ||
                                      (isOnComponents && activeSection === sub.id);
                                    return (
                                      <li key={sub.id}>
                                        <Link
                                          href={sub.href}
                                          onClick={(e) => {
                                            const el = document.getElementById(sub.id);
                                            if (isOnComponents && el) {
                                              e.preventDefault();
                                              if (onSectionClick) onSectionClick(sub.id);
                                              else el.scrollIntoView({ behavior: "smooth", block: "start" });
                                            }
                                          }}
                                          className={[
                                            "flex items-center gap-2 rounded-md px-3 py-1.5 text-[13px] transition-colors",
                                            isSubActive
                                              ? "bg-[#4CCBBF]/10 font-medium text-[#4CCBBF]"
                                              : "text-[#64748B] hover:bg-white/[0.03] hover:text-[#E2E8F0]",
                                          ].join(" ")}
                                        >
                                          <span className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors ${isSubActive ? "bg-[#4CCBBF]" : "bg-white/10"}`} />
                                          {sub.label}
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </ul>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </>
                )}
              </li>
            )}

            {/* Page links after Components (e.g. Settings) */}
            {pageLinksAfter.map((page) => {
              const active = isRouteActive(page.href);
              return (
                <li key={page.href}>
                  {collapsed ? (
                    <Tooltip label={page.label}>
                      <Link href={page.href} className={`${iconLinkCls(active)} w-full`}>
                        <span className={iconCls(active)}>{page.icon}</span>
                      </Link>
                    </Tooltip>
                  ) : (
                    <Link href={page.href} className={linkCls(active)}>
                      <span className={iconCls(active)}>{page.icon}</span>
                      <span className="flex-1">{page.label}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* ── User strip ───────────────────────────────────────────────────── */}
      {user && (
        <div className={`shrink-0 border-t border-white/[0.06] py-3 ${collapsed ? "px-2" : "px-4"}`}>
          {collapsed ? (
            <Tooltip label={user.name}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={user.avatarUrl}
                alt="User avatar"
                className="mx-auto h-8 w-8 rounded-full object-cover ring-2 ring-[#4CCBBF]/30"
              />
            </Tooltip>
          ) : (
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={user.avatarUrl}
                alt="User avatar"
                className="h-8 w-8 rounded-full object-cover ring-2 ring-[#4CCBBF]/30"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-[#E2E8F0]">{user.name}</p>
                <p className="truncate text-[11px] text-[#64748B]">{user.role}</p>
              </div>
              {userAction}
            </div>
          )}
        </div>
      )}
    </aside>
  );
}
