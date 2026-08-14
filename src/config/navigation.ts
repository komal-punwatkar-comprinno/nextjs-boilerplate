import { routes } from "@/config/routes";

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  badge?: string;
  children?: NavItem[];
}

export interface NavigationConfig {
  sidebar: NavItem[];
  topbar: NavItem[];
  footer: NavItem[];
}

/** Sidebar navigation for authenticated dashboard pages. */
export const sidebarNavigation: NavItem[] = [
  {
    label: "Dashboard",
    href: routes.dashboard,
    icon: "home",
  },
  {
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: "chart-bar",
  },
  {
    label: "Users",
    href: "/dashboard/users",
    icon: "users",
  },
  {
    label: "Projects",
    href: "/dashboard/projects",
    icon: "folder",
  },
  {
    label: "Messages",
    href: "/dashboard/messages",
    icon: "chat-bubble-left",
    badge: "3",
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: "cog-6-tooth",
  },
  {
    label: "Documentation",
    href: "/dashboard/documentation",
    icon: "book-open",
  },
];

/** Top navigation bar links (public/marketing pages). */
export const topbarNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Docs", href: "/docs" },
];

/** Footer navigation links. */
export const footerNavigation: NavItem[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Contact", href: "/contact" },
];

/** Combined navigation config (for programmatic access). */
export const navigationConfig: NavigationConfig = {
  sidebar: sidebarNavigation,
  topbar: topbarNavigation,
  footer: footerNavigation,
};

// Keep backward-compatible export
export const primaryNavigation = sidebarNavigation;
