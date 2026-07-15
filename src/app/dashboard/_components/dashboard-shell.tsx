"use client";

import { useMemo, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Sidebar, COMPONENT_SECTION_IDS } from "@/components/sidebar";
import { Navbar } from "@/components/navbar";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { routes } from "@/config/routes";

const sectionRoutes: Record<string, string> = {
  colors:     routes.componentsColors,
  typography: routes.componentsTypography,
  buttons:    routes.componentsButtons,
  badges:     routes.componentsBadges,
  forms:      routes.componentsForms,
  cards:      routes.componentsCards,
  avatars:    routes.componentsAvatars,
  icons:      routes.componentsIcons,
  spinners:   routes.componentsSpinners,
  pagination: routes.componentsPagination,
  modals:     routes.componentsModals,
  tables:     routes.componentsTables,
};

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isOnComponents =
    pathname === routes.components ||
    pathname.startsWith(routes.components + "/");

  const sectionIds = useMemo(
    () => (isOnComponents ? [...COMPONENT_SECTION_IDS] : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isOnComponents]
  );

  // Fired by scroll-spy when active section changes — use native History API
  // instead of router.replace to avoid ANY re-render during scroll
  const handleActiveChange = useCallback((id: string) => {
    const target = sectionRoutes[id];
    if (target && typeof window !== "undefined") {
      window.history.replaceState(null, "", target);
    }
  }, []);

  const { activeId: activeSection, forceActive } = useScrollSpy(sectionIds, handleActiveChange);

  // Called by sidebar on sub-item click — immediately set active + URL + scroll
  const handleSectionClick = useCallback((id: string) => {
    forceActive(id);
    const target = sectionRoutes[id];
    if (target && typeof window !== "undefined") {
      window.history.replaceState(null, "", target);
    }
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  }, [forceActive]);

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="w-64 shrink-0 h-full overflow-y-auto sidebar-scroll">
        <Sidebar
          className="min-h-full"
          activeSection={activeSection}
          onSectionClick={isOnComponents ? handleSectionClick : undefined}
        />
      </aside>
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto bg-slate-50 p-8">{children}</main>
      </div>
    </div>
  );
}
