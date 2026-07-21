/**
 * Dashboard widget configuration.
 * Defines the default layout and widgets for the dashboard overview page.
 */

export interface DashboardWidget {
  id: string;
  title: string;
  type: "stat" | "chart" | "table" | "list";
  /** Grid column span (1-4) */
  colSpan?: 1 | 2 | 3 | 4;
  /** Grid row span */
  rowSpan?: 1 | 2;
  /** Data source endpoint (for future API integration) */
  endpoint?: string;
}

export interface DashboardConfig {
  /** Page title */
  title: string;
  /** Refresh interval in ms (0 = no auto-refresh) */
  refreshInterval: number;
  /** Default widgets shown on dashboard */
  widgets: DashboardWidget[];
}

export const dashboardConfig: DashboardConfig = {
  title: "Dashboard Overview",
  refreshInterval: 0,
  widgets: [
    {
      id: "total-users",
      title: "Total Users",
      type: "stat",
      colSpan: 1,
    },
    {
      id: "revenue",
      title: "Revenue",
      type: "stat",
      colSpan: 1,
    },
    {
      id: "active-projects",
      title: "Active Projects",
      type: "stat",
      colSpan: 1,
    },
    {
      id: "pending-tasks",
      title: "Pending Tasks",
      type: "stat",
      colSpan: 1,
    },
    {
      id: "revenue-chart",
      title: "Revenue Over Time",
      type: "chart",
      colSpan: 2,
      rowSpan: 2,
      endpoint: "/api/analytics/revenue",
    },
    {
      id: "user-growth",
      title: "User Growth",
      type: "chart",
      colSpan: 2,
      rowSpan: 2,
      endpoint: "/api/analytics/users",
    },
    {
      id: "recent-activity",
      title: "Recent Activity",
      type: "list",
      colSpan: 2,
    },
    {
      id: "top-projects",
      title: "Top Projects",
      type: "table",
      colSpan: 2,
    },
  ],
};
