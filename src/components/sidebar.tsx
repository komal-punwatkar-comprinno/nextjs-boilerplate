"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";
import { routes } from "@/config/routes";

/**
 * Section IDs that match the `id` attribute on each <section> in
 * the components showcase page. Used for anchor navigation + scroll-spy.
 */
export const COMPONENT_SECTION_IDS = [
  "colors",
  "typography",
  "buttons",
  "badges",
  "forms",
  "cards",
  "avatars",
  "icons",
  "spinners",
  "pagination",
  "modals",
  "tables",
] as const;

export type ComponentSectionId = (typeof COMPONENT_SECTION_IDS)[number];

const componentSubItems: { id: ComponentSectionId; label: string; href: string }[] = [
  { id: "colors",     label: "Colors",     href: routes.componentsColors },
  { id: "typography", label: "Typography", href: routes.componentsTypography },
  { id: "buttons",    label: "Buttons",    href: routes.componentsButtons },
  { id: "badges",     label: "Badges",     href: routes.componentsBadges },
  { id: "forms",      label: "Forms",      href: routes.componentsForms },
  { id: "cards",      label: "Cards",      href: routes.componentsCards },
  { id: "avatars",    label: "Avatars",    href: routes.componentsAvatars },
  { id: "icons",      label: "Icons",      href: routes.componentsIcons },
  { id: "spinners",   label: "Spinners",   href: routes.componentsSpinners },
  { id: "pagination", label: "Pagination", href: routes.componentsPagination },
  { id: "modals",     label: "Modals",     href: routes.componentsModals },
  { id: "tables",     label: "Tables",     href: routes.componentsTables },
];

// ─── SVG icon components ──────────────────────────────────────────────────────
function IconHome() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}
function IconChart() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}
function IconUsers() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
function IconFolder() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  );
}
function IconChat() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-3 3v-3z" />
    </svg>
  );
}
function IconGrid() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
    </svg>
  );
}
function IconCog() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
function IconChevron({ open }: { open: boolean }) {
  return (
    <svg className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-90" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}


export interface SidebarProps {
  className?: string;
  /** Active section ID passed from parent scroll-spy — only used on components page */
  activeSection?: string | null;
  /**
   * When provided, clicking a component sub-item calls this instead of
   * navigating — lets the shell force-set active + URL + scroll instantly.
   */
  onSectionClick?: (id: string) => void;
}

export function Sidebar({ className = "", activeSection, onSectionClick }: SidebarProps) {
  const pathname = usePathname();
  const isOnComponents = pathname === routes.components || pathname.startsWith(routes.components + "/");
  const [componentsOpen, setComponentsOpen] = useState(isOnComponents);

  function isRouteActive(href: string) {
    if (href === routes.dashboard) return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  }

  const linkCls = (active: boolean) =>
    [
      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
      active
        ? "bg-indigo-600 text-white shadow-sm"
        : "text-slate-300 hover:bg-[#1e293b] hover:text-white",
    ].join(" ");

  const iconCls = (active: boolean) => (active ? "text-white" : "text-slate-400");

  return (
    <aside className={`flex h-full flex-col bg-[#0f172a] ${className}`} aria-label="Main navigation">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center border-b border-[#1e293b] px-6">
        <Link href={routes.home} className="flex items-center gap-2 text-sm font-bold tracking-tight text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-xs font-black text-white">N</span>
          <span className="truncate">{siteConfig.name.split(" ")[0]}</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">

        {/* MAIN MENU */}
        <div>
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-500">Main Menu</p>
          <ul className="space-y-0.5">
            <li>
              <Link href={routes.dashboard} className={linkCls(isRouteActive(routes.dashboard))}>
                <span className={iconCls(isRouteActive(routes.dashboard))}><IconHome /></span>
                <span className="flex-1">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/analytics" className={linkCls(isRouteActive("/dashboard/analytics"))}>
                <span className={iconCls(isRouteActive("/dashboard/analytics"))}><IconChart /></span>
                <span className="flex-1">Analytics</span>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/users" className={linkCls(isRouteActive("/dashboard/users"))}>
                <span className={iconCls(isRouteActive("/dashboard/users"))}><IconUsers /></span>
                <span className="flex-1">Users</span>
                <span className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-indigo-600 px-1.5 text-[10px] font-semibold text-white">3</span>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/projects" className={linkCls(isRouteActive("/dashboard/projects"))}>
                <span className={iconCls(isRouteActive("/dashboard/projects"))}><IconFolder /></span>
                <span className="flex-1">Projects</span>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/messages" className={linkCls(isRouteActive("/dashboard/messages"))}>
                <span className={iconCls(isRouteActive("/dashboard/messages"))}><IconChat /></span>
                <span className="flex-1">Messages</span>
                <span className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-indigo-600 px-1.5 text-[10px] font-semibold text-white">12</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* PAGES */}
        <div>
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-500">Pages</p>
          <ul className="space-y-0.5">

            {/* Components — collapsible with scroll-spy sub-items */}
            <li>
              <button
                type="button"
                onClick={() => setComponentsOpen((v) => !v)}
                className={[
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isOnComponents
                    ? "bg-indigo-600/20 text-indigo-300"
                    : "text-slate-300 hover:bg-[#1e293b] hover:text-white",
                ].join(" ")}
              >
                <span className={isOnComponents ? "text-indigo-400" : "text-slate-400"}><IconGrid /></span>
                <span className="flex-1 text-left">Components</span>
                <span className={isOnComponents ? "text-indigo-400" : "text-slate-500"}>
                  <IconChevron open={componentsOpen} />
                </span>
              </button>

              {componentsOpen && (
                <ul className="mt-0.5 ml-4 space-y-0.5 border-l border-[#1e293b] pl-3">
                  {componentSubItems.map((sub) => {
                    // Active when the URL matches this sub-route,
                    // OR on the main page and scroll-spy says this section is in view
                    const isSubActive =
                      pathname === sub.href ||
                      (pathname === routes.components && activeSection === sub.id);
                    return (
                      <li key={sub.id}>
                        <Link
                          href={sub.href}
                          onClick={(e) => {
                            if (isOnComponents) {
                              e.preventDefault();
                              if (onSectionClick) {
                                // Shell handles highlight + URL + scroll atomically
                                onSectionClick(sub.id);
                              } else {
                                document.getElementById(sub.id)?.scrollIntoView({
                                  behavior: "smooth",
                                  block: "start",
                                });
                              }
                            }
                          }}
                          className={[
                            "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                            isSubActive
                              ? "font-semibold text-indigo-400"
                              : "text-slate-400 hover:bg-[#1e293b] hover:text-white",
                          ].join(" ")}
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${isSubActive ? "bg-indigo-400" : "bg-slate-600"}`} />
                          {sub.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>

            <li>
              <Link href="/dashboard/settings" className={linkCls(isRouteActive("/dashboard/settings"))}>
                <span className={iconCls(isRouteActive("/dashboard/settings"))}><IconCog /></span>
                <span className="flex-1">Settings</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* User strip */}
      <div className="shrink-0 border-t border-[#1e293b] px-4 py-4">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://i.pravatar.cc/150?img=8" alt="User avatar" className="h-9 w-9 rounded-full object-cover ring-2 ring-indigo-500" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">Alex Johnson</p>
            <p className="truncate text-xs text-slate-400">Administrator</p>
          </div>
          <button aria-label="Account settings" className="rounded-md p-1 text-slate-400 transition-colors hover:bg-[#1e293b] hover:text-white">
            <IconCog />
          </button>
        </div>
      </div>
    </aside>
  );
}
