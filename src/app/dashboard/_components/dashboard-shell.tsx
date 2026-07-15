"use client";

import { usePathname } from "next/navigation";
import { Sidebar, COMPONENT_SECTION_IDS } from "@/components/sidebar";
import { Navbar } from "@/components/navbar";
import { useScrollSpy } from "@/hooks/use-scroll-spy";

/**
 * Client wrapper for the dashboard shell.
 * Runs the scroll-spy hook and passes the active section ID to the Sidebar
 * so the nested Components sub-nav highlights as the user scrolls.
 */
export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isOnComponents = pathname === "/dashboard/components";

  // Only observe sections when we are actually on the components page
  const sectionIds = isOnComponents ? [...COMPONENT_SECTION_IDS] : [];
  const activeSection = useScrollSpy(sectionIds);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar — fixed full viewport height, scrolls internally */}
      <aside className="w-64 shrink-0 h-full overflow-y-auto sidebar-scroll">
        <Sidebar className="min-h-full" activeSection={activeSection} />
      </aside>

      {/* Right column — navbar stays at top, main content scrolls */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto bg-slate-50 p-8">{children}</main>
      </div>
    </div>
  );
}
