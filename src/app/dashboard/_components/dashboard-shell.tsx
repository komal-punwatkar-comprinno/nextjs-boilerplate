"use client";

import { useMemo, useCallback, useRef, useEffect, useState } from "react";
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
  // Start collapsed on mobile (< lg), expanded on desktop
  const [collapsed, setCollapsed] = useState(false);

  const isOnComponents =
    pathname === routes.components ||
    pathname.startsWith(routes.components + "/");

  const sectionIds = useMemo(
    () => (isOnComponents ? [...COMPONENT_SECTION_IDS] : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isOnComponents]
  );

  // When navigating *into* the components section from outside (e.g. from
  // Settings), suppress scroll-spy URL updates for a short window so the
  // sub-route's scrollTo effect can pin the correct URL first.  Without this,
  // scroll-spy fires its init scroll check (~100 ms after mount) and
  // replaceState-s the URL to "colors" before the page has scrolled to the
  // intended section.
  const suppressUrlUpdateUntil = useRef(0);
  const prevIsOnComponents = useRef(isOnComponents);

  useEffect(() => {
    if (!prevIsOnComponents.current && isOnComponents) {
      // Just entered the components section — give the scrollTo effect 400 ms
      // to fire and pin its URL before we allow scroll-spy to overwrite it.
      suppressUrlUpdateUntil.current = Date.now() + 400;
    }
    prevIsOnComponents.current = isOnComponents;
  }, [isOnComponents]);

  // Fired by scroll-spy when active section changes — use native History API
  // instead of router.replace to avoid ANY re-render during scroll
  const handleActiveChange = useCallback((id: string) => {
    if (Date.now() < suppressUrlUpdateUntil.current) return;
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
    <div className="flex h-screen overflow-hidden bg-[#F5F6FA] dark:bg-[#1C2127]">

      {/* ── Mobile overlay backdrop ───────────────────────────────────────── */}
      {!collapsed && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          aria-hidden="true"
          onClick={() => setCollapsed(true)}
        />
      )}

      {/* ── Sidebar ──────────────────────────────────────────────────────── */}
      {/* Mobile: fixed overlay drawer, slides in from left
          Desktop: static, collapses to icon-only              */}
      <aside
        className={[
          "fixed inset-y-0 left-0 z-30 h-full overflow-y-auto sidebar-scroll transition-all duration-300",
          // Mobile: full-width drawer, hidden when collapsed
          collapsed ? "-translate-x-full lg:translate-x-0" : "translate-x-0",
          // Desktop: static, width toggles
          collapsed ? "lg:w-[60px] lg:relative lg:shrink-0" : "w-64 lg:w-56 lg:relative lg:shrink-0",
        ].join(" ")}
      >
        <Sidebar
          className="min-h-full"
          collapsed={collapsed}
          activeSection={activeSection}
          onSectionClick={isOnComponents ? handleSectionClick : undefined}
        />
      </aside>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div className={`flex flex-1 flex-col overflow-hidden transition-all duration-300 ${!collapsed ? "lg:ml-0" : ""}`}>
        <Navbar onMenuToggle={() => setCollapsed(v => !v)} />
        <main className="flex-1 overflow-y-auto bg-[#F5F6FA] p-4 sm:p-6 dark:bg-[#1C2127]">
          {children}
        </main>
      </div>
    </div>
  );
}

