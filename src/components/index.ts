/**
 * Barrel file for shared UI components.
 * Import from "@/components" for any of these.
 */

export * from "./ui";
export * from "./layout";
export * from "./common";
export * from "./forms";
export * from "./data";
export * from "./maps";
export * from "./media";

// App-specific sidebar (thin wrapper around SidebarShell)
export { Sidebar, COMPONENT_SECTION_IDS } from "./sidebar";
export type { SidebarProps, ComponentSectionId } from "./sidebar";