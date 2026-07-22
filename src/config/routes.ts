/**
 * Application routes shared by navigation, redirects, and access-control code.
 */
export const routes = {
    home: "/",
    login: "/login",
    dashboard: "/dashboard",
    components: "/dashboard/components",
  
    documentation: "/dashboard/documentation",

  // ── Existing ──────────────────────────────────────────────────────────────
    componentsColors:      "/dashboard/components/colors",
    componentsTypography:  "/dashboard/components/typography",
    componentsButtons:     "/dashboard/components/buttons",
    componentsBadges:      "/dashboard/components/badges",
    componentsForms:       "/dashboard/components/forms",
    componentsCards:       "/dashboard/components/cards",
    componentsAvatars:     "/dashboard/components/avatars",
    componentsIcons:       "/dashboard/components/icons",
    componentsSpinners:    "/dashboard/components/spinners",
    componentsPagination:  "/dashboard/components/pagination",
    componentsModals:      "/dashboard/components/modals",
    componentsTables:      "/dashboard/components/tables",
  
    // ── Components group ──────────────────────────────────────────────────────
    componentsAccordion:       "/dashboard/components/accordion",
    componentsAlerts:          "/dashboard/components/alerts",
    componentsBreadcrumb:      "/dashboard/components/breadcrumb",
    componentsButtonGroup:     "/dashboard/components/button-group",
    componentsCollapse:        "/dashboard/components/collapse",
    componentsColumnDivider:   "/dashboard/components/column-divider",
    componentsDevices:         "/dashboard/components/devices",
    componentsDivider:         "/dashboard/components/divider",
    componentsDropdowns:       "/dashboard/components/dropdowns",
    componentsListGroup:       "/dashboard/components/list-group",
    componentsLists:           "/dashboard/components/lists",
    componentsLegendIndicator: "/dashboard/components/legend-indicator",
    componentsModal:           "/dashboard/components/modals",
    componentsOffcanvas:       "/dashboard/components/offcanvas",
    componentsPageHeader:      "/dashboard/components/page-header",
    componentsPopovers:        "/dashboard/components/popovers",
    componentsProgress:        "/dashboard/components/progress",
    componentsProfile:         "/dashboard/components/profile",
    componentsShapes:          "/dashboard/components/shapes",
    componentsSlidingImage:    "/dashboard/components/sliding-image",
    componentsSteps:           "/dashboard/components/steps",
    componentsTab:             "/dashboard/components/tab",
    componentsToasts:          "/dashboard/components/toasts",
    componentsTooltips:        "/dashboard/components/tooltips",
  
    // ── Navbars group ─────────────────────────────────────────────────────────
    componentsNavbar:      "/dashboard/components/navbar",
    componentsNavs:        "/dashboard/components/navs",
    componentsMegaMenu:    "/dashboard/components/mega-menu",
    componentsVerticalNav: "/dashboard/components/vertical-nav",
    componentsScrollspy:   "/dashboard/components/scrollspy",
  
    // ── Tables group ──────────────────────────────────────────────────────────
    componentsDatatables:   "/dashboard/components/datatables",
    componentsStickyHeader: "/dashboard/components/sticky-header",
  
    // ── Basic Forms group ─────────────────────────────────────────────────────
    componentsBasicForms: "/dashboard/components/basic-forms",
    componentsChecks:     "/dashboard/components/checks",
    componentsInputGroup: "/dashboard/components/input-group",
  
    // ── Advanced Forms group ──────────────────────────────────────────────────
    componentsAdvSelect:      "/dashboard/components/advanced-select",
    componentsDatepicker:     "/dashboard/components/datepicker",
    componentsDateRange:      "/dashboard/components/date-range",
    componentsFileUpload:     "/dashboard/components/file-upload",
    componentsDropzone:       "/dashboard/components/dropzone",
    componentsWysiwyg:        "/dashboard/components/wysiwyg",
    componentsQuantity:       "/dashboard/components/quantity-counter",
    componentsCopyClipboard:  "/dashboard/components/copy-to-clipboard",
    componentsInputMask:      "/dashboard/components/input-mask",
    componentsStepForm:       "/dashboard/components/step-form",
    componentsAddField:       "/dashboard/components/add-field",
    componentsTogglePassword: "/dashboard/components/toggle-password",
    componentsCountChars:     "/dashboard/components/count-characters",
    componentsFormSearch:     "/dashboard/components/form-search",
    componentsToggleSwitch:   "/dashboard/components/toggle-switch",
  
    // ── Charts group ──────────────────────────────────────────────────────────
    componentsCharts:    "/dashboard/components/charts",
    componentsCounter:   "/dashboard/components/counter",
    componentsPieChart:  "/dashboard/components/pie-chart",
    componentsStatCard:  "/dashboard/components/stat-card",
  
    // ── Others group ──────────────────────────────────────────────────────────
    componentsLightbox:   "/dashboard/components/lightbox",
    componentsLeaflet:    "/dashboard/components/leaflet",
    componentsVectorMap:  "/dashboard/components/vector-map",
    componentsSortable:   "/dashboard/components/sortable",
    componentsStickyBlock:"/dashboard/components/sticky-block",
    componentsGoTo:       "/dashboard/components/go-to",
  } as const;
