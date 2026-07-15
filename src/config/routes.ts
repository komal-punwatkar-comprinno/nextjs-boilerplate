/**
 * Application routes shared by navigation, redirects, and access-control code.
 */
export const routes = {
  home: "/",
  login: "/login",
  dashboard: "/dashboard",
  components: "/dashboard/components",
  componentsColors: "/dashboard/components/colors",
  componentsTypography: "/dashboard/components/typography",
  componentsButtons: "/dashboard/components/buttons",
  componentsBadges: "/dashboard/components/badges",
  componentsForms: "/dashboard/components/forms",
  componentsCards: "/dashboard/components/cards",
  componentsAvatars: "/dashboard/components/avatars",
  componentsIcons: "/dashboard/components/icons",
  componentsSpinners: "/dashboard/components/spinners",
  componentsPagination: "/dashboard/components/pagination",
  componentsModals: "/dashboard/components/modals",
  componentsTables: "/dashboard/components/tables",
} as const;
