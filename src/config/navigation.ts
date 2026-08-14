import { routes } from "@/config/routes";

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  badge?: string;
  adminOnly?: boolean;
  children?: NavItem[];
}

export interface NavigationConfig {
  sidebar: NavItem[];
  topbar: NavItem[];
  footer: NavItem[];
}

/**
 * Sidebar navigation for authenticated dashboard pages.
 *
 * Items with `adminOnly: true` are only rendered when the user's role is "admin".
 * The sidebar component should check this flag against the current user's role.
 */
export const sidebarNavigation: NavItem[] = [
  // ── Common (all roles) ──────────────────────────────────────────────────
  {
    label: "Overview",
    href: routes.dashboard,
    icon: "home",
  },
  {
    label: "Learning Progress",
    href: routes.learningProgress,
    icon: "trendUp",
  },
  {
    label: "Certifications",
    href: routes.certificationProgress,
    icon: "certificate",
  },
  {
    label: "Skillset Heatmap",
    href: routes.skillsetHeatmap,
    icon: "gridCells",
  },

  // ── Admin only ──────────────────────────────────────────────────────────
  {
    label: "Analytics Dashboard",
    href: routes.analytics,
    icon: "chartBar",
    adminOnly: true,
  },
  {
    label: "Skillset Templates",
    href: routes.skillsetTemplates,
    icon: "layerGroup",
    adminOnly: true,
  },
  {
    label: "Training Plans",
    href: routes.trainingPlans,
    icon: "calendar",
    adminOnly: true,
  },
  {
    label: "User Management",
    href: routes.userManagement,
    icon: "users",
    adminOnly: true,
  },
];

/** Top navigation bar links (public/marketing pages). */
export const topbarNavigation: NavItem[] = [
  { label: "Home", href: routes.home },
  { label: "Login", href: routes.login },
];

/** Footer navigation links. */
export const footerNavigation: NavItem[] = [];

/** Combined navigation config (for programmatic access). */
export const navigationConfig: NavigationConfig = {
  sidebar: sidebarNavigation,
  topbar: topbarNavigation,
  footer: footerNavigation,
};

// Keep backward-compatible export
export const primaryNavigation = sidebarNavigation;
