/**
 * Barrel file for application configuration.
 *
 * Re-export every config entry from here so consumers can import from
 * `@/config`.
 */
export { siteConfig } from "./site";
export { routes } from "./routes";
export { sidebarNavigation, topbarNavigation, footerNavigation, navigationConfig, primaryNavigation } from "./navigation";
export type { NavItem, NavigationConfig } from "./navigation";
export { dashboardConfig } from "./dashboard";
export type { DashboardConfig, DashboardWidget } from "./dashboard";
