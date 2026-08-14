
export const routes = {
  // ── Public ────────────────────────────────────────────────────────────────
  home: "/",
  login: "/login",
  forgotPassword: "/forgot-password",

  // ── Dashboard ─────────────────────────────────────────────────────────────
  dashboard: "/dashboard",

  // ── Features (Common — all roles) ─────────────────────────────────────────
  learningProgress: "/dashboard/learning-progress",
  certificationProgress: "/dashboard/certification-progress",
  skillsetHeatmap: "/dashboard/skillset-heatmap",

  // ── Features (Admin / Manager only) ───────────────────────────────────────
  analytics: "/dashboard/analytics",
  skillsetTemplates: "/dashboard/skillset-templates",
  trainingPlans: "/dashboard/training-plans",
  userManagement: "/dashboard/user-management",
} as const;

/**
 * Route groups for access-control checks.
 */
export const publicRoutes: string[] = [
  routes.home,
  routes.login,
  routes.forgotPassword,
];

export const adminRoutes: string[] = [
  routes.analytics,
  routes.skillsetTemplates,
  routes.trainingPlans,
  routes.userManagement,
];
