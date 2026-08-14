"use client";

import Link from "next/link";
import { routes } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/common/logo";
import { Sidebar as SidebarShell } from "@/components/layout/sidebar";
import type { SubGroup, NavItem, PageLink } from "@/components/layout/sidebar";

// Re-export section IDs so dashboard-shell can import from @/components
export { COMPONENT_SECTION_IDS } from "@/lib/component-sections";
export type { ComponentSectionId } from "@/lib/component-sections";

// ─── Icons ─────────────────────────────────────────────────────────────────
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
function IconDocument() {
  return (
    <svg className="h-[18px] w-[18px] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  );
}

// ─── App-specific data ─────────────────────────────────────────────────────

const navItems: NavItem[] = [
  { href: routes.dashboard,        label: "Dashboard",  icon: <IconHome /> },
  { href: "/dashboard/analytics",  label: "Analytics",  icon: <IconChart /> },
  { href: "/dashboard/users",      label: "Users",      icon: <IconUsers />,  badge: "3",  badgeColor: "bg-[#4CCBBF] text-[#0A0D14]" },
  { href: "/dashboard/projects",   label: "Projects",   icon: <IconFolder /> },
  { href: "/dashboard/messages",   label: "Messages",   icon: <IconChat />,   badge: "12", badgeColor: "bg-[#ED495D] text-white" },
];

const pageLinks: PageLink[] = [
  { href: routes.documentation, label: "Documentation", icon: <IconDocument /> },
];

const pageLinksAfter: PageLink[] = [
  { href: "/dashboard/settings", label: "Settings", icon: <IconCog /> },
];

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

// ─── Sidebar (thin wrapper) ──────────────────────────────────────────────────

export interface SidebarProps {
  className?: string;
  collapsed?: boolean;
  activeSection?: string | null;
  onSectionClick?: (id: string) => void;
}

export function Sidebar({ className, collapsed, activeSection, onSectionClick }: SidebarProps) {
  return (
    <SidebarShell
      className={className}
      collapsed={collapsed}
      activeSection={activeSection}
      onSectionClick={onSectionClick}
      logo={
        <Logo
          src="/logo-300x300.png"
          name={siteConfig.name}
          size="sm"
          variant="full"
          textClassName="text-[#E2E8F0]"
        />
      }
      logoCollapsed={
        <Logo
          src="/logo-300x300.png"
          name={siteConfig.name}
          size="sm"
          variant="icon"
        />
      }
      homeHref={routes.home}
      navItems={navItems}
      navLabel="Main Menu"
      pageLinks={pageLinks}
      pageLinksAfter={pageLinksAfter}
      pagesLabel="Pages"
      componentGroups={componentGroups}
      componentsLabel="Components"
      componentsIcon={<IconGrid />}
      componentsHref={routes.components}
      user={{
        name: "Alex Johnson",
        role: "Administrator",
        avatarUrl: "https://i.pravatar.cc/150?img=8",
      }}
      userAction={
        <Link
          href="/dashboard/settings"
          aria-label="Account settings"
          className="cursor-pointer rounded-md p-1 text-[#64748B] transition-colors hover:bg-white/[0.05] hover:text-[#E2E8F0]"
        >
          <IconCog />
        </Link>
      }
    />
  );
}
