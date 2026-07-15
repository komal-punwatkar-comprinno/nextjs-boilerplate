import { routes } from "@/config/routes";

/** Primary navigation available to authenticated users. */
export const primaryNavigation = [
  {
    href: routes.dashboard,
    label: "Dashboard",
  },
] as const
