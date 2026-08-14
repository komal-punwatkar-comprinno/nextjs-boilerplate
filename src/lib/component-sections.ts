/**
 * Component section IDs — no "use client", safe to import in server components.
 * ORDER must match the render order in components-showcase.tsx exactly.
 * That same order controls sidebar highlight via scroll-spy.
 */
export const COMPONENT_SECTION_IDS = [
  // Components
  "colors", "typography", "accordion", "alerts", "avatars", "badges",
  "breadcrumb", "buttons", "button-group", "cards", "collapse",
  "column-divider", "devices", "divider", "dropdowns", "icons",
  "list-group", "legend-indicator", "modals", "offcanvas", "page-header",
  "pagination", "popovers", "progress", "profile", "shapes",
  "sliding-image", "spinners", "steps", "tab", "toasts", "tooltips",

  // Navbars
  "navbar", "navs", "mega-menu", "vertical-nav", "scrollspy",

  // Tables
  "tables", "datatables", "sticky-header",

  // Basic Forms
  "basic-forms", "checks", "input-group",

  // Advanced Forms
  "advanced-select", "datepicker", "date-range", "file-upload", "dropzone",
  "wysiwyg", "quantity-counter", "copy-to-clipboard", "input-mask",
  "step-form", "add-field", "toggle-password", "count-characters",
  "form-search", "toggle-switch",

  // Charts
  "charts", "counter", "pie-chart", "stat-card",

  // Others
  "lightbox", "leaflet", "vector-map", "sortable", "sticky-block", "go-to",
] as const;

export type ComponentSectionId = (typeof COMPONENT_SECTION_IDS)[number];
