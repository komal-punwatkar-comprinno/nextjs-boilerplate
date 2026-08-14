"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Sidebar } from "@/components/sidebar";
import { Navbar } from "@/components/layout/navbar";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user, isLoading } = useAuth();

  // While auth state is loading, show a minimal shell to avoid layout shift
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F5F6FA] dark:bg-[#1C2127]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#4CCBBF]" />
      </div>
    );
  }

  const userRole = user?.role ?? "member";

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
      <aside
        className={[
          "fixed inset-y-0 left-0 z-30 h-full overflow-y-auto transition-all duration-300",
          collapsed ? "-translate-x-full lg:translate-x-0" : "translate-x-0",
          collapsed ? "lg:w-[60px] lg:relative lg:shrink-0" : "w-64 lg:w-56 lg:relative lg:shrink-0",
        ].join(" ")}
      >
        <Sidebar collapsed={collapsed} userRole={userRole} />
      </aside>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col overflow-hidden transition-all duration-300">
        <Navbar onMenuToggle={() => setCollapsed((v) => !v)} />
        <main className="flex-1 overflow-y-auto bg-[#F5F6FA] p-4 sm:p-6 dark:bg-[#1C2127]">
          {children}
        </main>
      </div>
    </div>
  );
}
