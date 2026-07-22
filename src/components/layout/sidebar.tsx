"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { siteConfig } from "@/config/site";
import { routes } from "@/config/routes";

// Single source of truth lives in lib — re-exported here for convenience
export { COMPONENT_SECTION_IDS } from "@/lib/component-sections";
export type { ComponentSectionId } from "@/lib/component-sections";

// ─── Grouped structure matching the reference site ───────────────────────────
interface SubItem  { id: string; label: string; href: string }
interface SubGroup { heading: string; items: SubItem[] }

const componentGroups: SubGroup[] = [
  {
    heading: "Components",
    items: [
      { id: "colors",           label: "Colors",           href: routes.componentsColors },
      { id: "typography",       label: "Typography",       href: routes.componentsTypography },
      { id: "accordion",        label: "Accordion",        href: routes.componentsAccordion },
      { id: "alerts",           label: "Alerts",           href: routes.componentsAlerts },
      { id: "avatars",          label: "Avatars",          href: routes.componentsAvatars },
      { id: "badges",           label: "Badges",           href: routes.componentsBadges },
      { id: "breadcrumb",       label: "Breadcrumb",       href: routes.componentsBreadcrumb },
      { id: "buttons",          label: "Buttons",          href: routes.componentsButtons },
      { id: "button-group",     label: "Button Group",     href: routes.componentsButtonGroup },
      { id: "cards",            label: "Cards",            href: routes.componentsCards },
      { id: "collapse",         label: "Collapse",         href: routes.componentsCollapse },
      { id: "column-divider",   label: "Column Divider",   href: routes.componentsColumnDivider },
      { id: "devices",          label: "Devices",          href: routes.componentsDevices },
      { id: "divider",          label: "Divider",          href: routes.componentsDivider },
      { id: "dropdowns",        label: "Dropdowns",        href: routes.componentsDropdowns },
      { id: "icons",            label: "Icons",            href: routes.componentsIcons },
      { id: "list-group",       label: "List Group",       href: routes.componentsListGroup },
      { id: "legend-indicator", label: "Legend Indicator",  href: routes.componentsLegendIndicator },
      { id: "modals",           label: "Modals",           href: routes.componentsModals },
      { id: "offcanvas",        label: "Offcanvas",        href: routes.componentsOffcanvas },
      { id: "page-header",      label: "Page Header",      href: routes.componentsPageHeader },
      { id: "pagination",       label: "Pagination",       href: routes.componentsPagination },
      { id: "popovers",         label: "Popovers",         href: routes.componentsPopovers },
      { id: "progress",         label: "Progress",         href: routes.componentsProgress },
      { id: "profile",          label: "Profile",          href: routes.componentsProfile },
      { id: "shapes",           label: "Shapes",           href: routes.componentsShapes },
      { id: "sliding-image",    label: "Sliding Image",    href: routes.componentsSlidingImage },
      { id: "spinners",         label: "Spinners",         href: routes.componentsSpinners },
      { id: "steps",            label: "Steps",            href: routes.componentsSteps },
      { id: "tab",              label: "Tab",              href: routes.componentsTab },
      { id: "toasts",           label: "Toasts",           href: routes.componentsToasts },
      { id: "tooltips",         label: "Tooltips",         href: routes.componentsTooltips },
    ],
  },
  {
    heading: "Navbars",
    items: [
      { id: "navbar",       label: "Navbar",       href: routes.componentsNavbar },
      { id: "navs",         label: "Navs",         href: routes.componentsNavs },
      { id: "mega-menu",    label: "Mega Menu",    href: routes.componentsMegaMenu },
      { id: "vertical-nav", label: "Vertical Nav", href: routes.componentsVerticalNav },
      { id: "scrollspy",    label: "Scrollspy",    href: routes.componentsScrollspy },
    ],
  },
  {
    heading: "Tables",
    items: [
      { id: "tables",        label: "Tables",        href: routes.componentsTables },
      { id: "datatables",    label: "Datatables",    href: routes.componentsDatatables },
      { id: "sticky-header", label: "Sticky Header", href: routes.componentsStickyHeader },
    ],
  },
  {
    heading: "Basic Forms",
    items: [
      { id: "basic-forms",  label: "Basic Forms",       href: routes.componentsBasicForms },
      { id: "checks",       label: "Checks & Switches", href: routes.componentsChecks },
      { id: "input-group",  label: "Input Group",       href: routes.componentsInputGroup },
    ],
  },
  {
    heading: "Advanced Forms",
    items: [
      { id: "advanced-select",   label: "Advanced Select",   href: routes.componentsAdvSelect },
      { id: "datepicker",        label: "Datepicker",        href: routes.componentsDatepicker },
      { id: "date-range",        label: "Date Range Picker", href: routes.componentsDateRange },
      { id: "file-upload",       label: "File Upload",       href: routes.componentsFileUpload },
      { id: "dropzone",          label: "Dropzone",          href: routes.componentsDropzone },
      { id: "wysiwyg",           label: "WYSIWYG Editor",    href: routes.componentsWysiwyg },
      { id: "quantity-counter",  label: "Quantity Counter",  href: routes.componentsQuantity },
      { id: "copy-to-clipboard", label: "Copy to Clipboard", href: routes.componentsCopyClipboard },
      { id: "input-mask",        label: "Input Mask",        href: routes.componentsInputMask },
      { id: "step-form",         label: "Step Form",         href: routes.componentsStepForm },
      { id: "add-field",         label: "Add Field",         href: routes.componentsAddField },
      { id: "toggle-password",   label: "Toggle Password",   href: routes.componentsTogglePassword },
      { id: "count-characters",  label: "Count Characters",  href: routes.componentsCountChars },
      { id: "form-search",       label: "Form Search",       href: routes.componentsFormSearch },
      { id: "toggle-switch",     label: "Toggle Switch",     href: routes.componentsToggleSwitch },
    ],
  },
  {
    heading: "Charts",
    items: [
      { id: "charts",    label: "Charts",    href: routes.componentsCharts },
      { id: "counter",   label: "Counter",   href: routes.componentsCounter },
      { id: "pie-chart", label: "Pie Chart", href: routes.componentsPieChart },
      { id: "stat-card", label: "Stat Card", href: routes.componentsStatCard },
    ],
  },
  {
    heading: "Others",
    items: [
      { id: "lightbox",     label: "Lightbox",     href: routes.componentsLightbox },
      { id: "leaflet",      label: "Leaflet",      href: routes.componentsLeaflet },
      { id: "vector-map",   label: "Vector Map",   href: routes.componentsVectorMap },
      { id: "sortable",     label: "Sortable",     href: routes.componentsSortable },
      { id: "sticky-block", label: "Sticky Block", href: routes.componentsStickyBlock },
      { id: "go-to",        label: "Go To",        href: routes.componentsGoTo },
    ],
  },
];

/* ─── Icons ─────────────────────────────────────────────────────────────── */
function IconHome() {
  return (
    <svg className="h-[18px] w-[18px] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}
function IconChart() {
  return (
    <svg className="h-[18px] w-[18px] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}
function IconUsers() {
  return (
    <svg className="h-[18px] w-[18px] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
function IconFolder() {
  return (
    <svg className="h-[18px] w-[18px] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  );
}
function IconChat() {
  return (
    <svg className="h-[18px] w-[18px] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-3 3v-3z" />
    </svg>
  );
}
function IconGrid() {
  return (
    <svg className="h-[18px] w-[18px] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
    </svg>
  );
}
function IconCog() {
  return (
    <svg className="h-[18px] w-[18px] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
function IconChevron({ open }: { open: boolean }) {
  return (
    <svg className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${open ? "rotate-90" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

/* ─── Tooltip wrapper for collapsed mode ────────────────────────────────── */
function Tooltip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="group/tip relative flex items-center">
      {children}
      <div className="pointer-events-none absolute left-full ml-3 z-50 whitespace-nowrap rounded-lg border border-white/10 bg-[#0f172a] px-2.5 py-1.5 text-xs font-medium text-[#E2E8F0] opacity-0 shadow-xl transition-opacity group-hover/tip:opacity-100">
        {label}
        {/* Arrow */}
        <span className="absolute -left-1 top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#0f172a]" />
      </div>
    </div>
  );
}

/* ─── Component ─────────────────────────────────────────────────────────── */
export interface SidebarProps {
  className?: string;
  collapsed?: boolean;
  activeSection?: string | null;
  onSectionClick?: (id: string) => void;
}

export function Sidebar({ className = "", collapsed = false, activeSection, onSectionClick }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isOnComponents = pathname === routes.components || pathname.startsWith(routes.components + "/");
  const [componentsOpen, setComponentsOpen] = useState(isOnComponents);

  function isRouteActive(href: string) {
    if (href === routes.dashboard) return pathname === href;
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

  const navItems = [
    { href: routes.dashboard, label: "Dashboard", icon: <IconHome /> },
    { href: "/dashboard/analytics", label: "Analytics", icon: <IconChart /> },
    { href: "/dashboard/users",     label: "Users",     icon: <IconUsers />,  badge: "3",  badgeColor: "bg-[#4CCBBF] text-[#0A0D14]" },
    { href: "/dashboard/projects",  label: "Projects",  icon: <IconFolder /> },
    { href: "/dashboard/messages",  label: "Messages",  icon: <IconChat />,   badge: "12", badgeColor: "bg-[#ED495D] text-white" },
  ];

  return (
    <aside
      className={`flex h-full flex-col bg-[#1A1F2E] dark:bg-[#0f1318] overflow-hidden ${className}`}
      aria-label="Main navigation"
    >
      {/* ── Logo ─────────────────────────────────────────────────────────── */}
      <div className={`flex h-14 shrink-0 items-center border-b border-white/[0.06] ${collapsed ? "justify-center px-0" : "px-4"}`}>
        <Link href={routes.home} className="flex items-center gap-2.5 min-w-0">
          <span
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-black"
            style={{ backgroundColor: "#4CCBBF", color: "#0A0D14" }}
          >
            N
          </span>
          {!collapsed && (
            <span className="truncate text-sm font-semibold text-[#E2E8F0]">
              {siteConfig.name.split(" ")[0]}
            </span>
          )}
        </Link>
      </div>

      {/* ── Nav ──────────────────────────────────────────────────────────── */}
      <nav className={`flex-1 overflow-y-auto py-4 space-y-5 ${collapsed ? "px-2" : "px-3"}`}>

        {/* MAIN MENU */}
        <div>
          {!collapsed && (
            <p className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-widest text-[#475569]">
              Main Menu
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

        {/* PAGES */}
        <div>
          {!collapsed && (
            <p className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-widest text-[#475569]">
              Pages
            </p>
          )}
          <ul className="space-y-0.5">


            {/* Documentation */}
            <li>
              {collapsed ? (
                <Tooltip label="Documentation">
                  <Link href={routes.documentation} className={`${iconLinkCls(isRouteActive(routes.documentation))} w-full`}>
                    <span className={iconCls(isRouteActive(routes.documentation))}>
                      <svg className="h-[18px] w-[18px] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                      </svg>
                    </span>
                  </Link>
                </Tooltip>
              ) : (
                <Link href={routes.documentation} className={linkCls(isRouteActive(routes.documentation))}>
                  <span className={iconCls(isRouteActive(routes.documentation))}>
                    <svg className="h-[18px] w-[18px] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                    </svg>
                  </span>
                  <span className="flex-1">Documentation</span>
                </Link>
              )}
            </li>

            {/* Components */}
            <li>
              {collapsed ? (
                <Tooltip label="Components">
                  <Link href={routes.components} className={`${iconLinkCls(isOnComponents)} w-full`}>
                    <span className={iconCls(isOnComponents)}><IconGrid /></span>
                  </Link>
                </Tooltip>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      if (!componentsOpen) {
                        // Opening: navigate to components page
                        setComponentsOpen(true);
                        router.push(routes.components);
                      } else {
                        // Closing: just collapse the list, stay on current page
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
                    <span className={iconCls(isOnComponents)}><IconGrid /></span>
                    <span className="flex-1 text-left">Components</span>
                    <span className={isOnComponents ? "text-[#4CCBBF]" : "text-[#475569]"}>
                      <IconChevron open={componentsOpen} />
                    </span>
                  </button>

                  {componentsOpen && (
                    <div className="mt-1 ml-3.5 border-l border-white/[0.06] pl-3 space-y-4">
                      {componentGroups.map((group) => (
                        <div key={group.heading}>
                          {/* Group heading */}
                          <p className="mb-1.5 flex items-center gap-2 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[#94A3B8]">
                            <span className="h-1 w-1 rounded-full bg-[#4CCBBF]/60" />
                            {group.heading}
                          </p>
                          <ul className="space-y-0.5">
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
                                      "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors",
                                      isSubActive
                                        ? "font-medium text-[#4CCBBF]"
                                        : "text-[#64748B] hover:text-[#E2E8F0]",
                                    ].join(" ")}
                                  >
                                    <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${isSubActive ? "bg-[#4CCBBF]" : "bg-white/10"}`} />
                                    {sub.label}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </li>

            {/* Settings */}
            <li>
              {collapsed ? (
                <Tooltip label="Settings">
                  <Link href="/dashboard/settings" className={`${iconLinkCls(isRouteActive("/dashboard/settings"))} w-full`}>
                    <span className={iconCls(isRouteActive("/dashboard/settings"))}><IconCog /></span>
                  </Link>
                </Tooltip>
              ) : (
                <Link href="/dashboard/settings" className={linkCls(isRouteActive("/dashboard/settings"))}>
                  <span className={iconCls(isRouteActive("/dashboard/settings"))}><IconCog /></span>
                  <span className="flex-1">Settings</span>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>

      {/* ── User strip ───────────────────────────────────────────────────── */}
      <div className={`shrink-0 border-t border-white/[0.06] py-3 ${collapsed ? "px-2" : "px-4"}`}>
        {collapsed ? (
          <Tooltip label="Alex Johnson">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://i.pravatar.cc/150?img=8"
              alt="User avatar"
              className="mx-auto h-8 w-8 rounded-full object-cover ring-2 ring-[#4CCBBF]/30"
            />
          </Tooltip>
        ) : (
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://i.pravatar.cc/150?img=8"
              alt="User avatar"
              className="h-8 w-8 rounded-full object-cover ring-2 ring-[#4CCBBF]/30"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-[#E2E8F0]">Alex Johnson</p>
              <p className="truncate text-[11px] text-[#64748B]">Administrator</p>
            </div>
            <button
              aria-label="Account settings"
              className="rounded-md p-1 text-[#64748B] transition-colors hover:bg-white/[0.05] hover:text-[#E2E8F0]"
            >
              <IconCog />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
