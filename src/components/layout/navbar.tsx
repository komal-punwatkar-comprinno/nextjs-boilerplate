"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { ThemeToggle } from "../common/theme-toggle";

function getPageTitle(pathname: string): string {
  if (pathname === "/dashboard") return "Overview";
  if (pathname.startsWith("/dashboard/learning-progress")) return "Learning Progress";
  if (pathname.startsWith("/dashboard/certification-progress")) return "Certifications";
  if (pathname.startsWith("/dashboard/skillset-heatmap")) return "Skillset Heatmap";
  if (pathname.startsWith("/dashboard/analytics")) return "Analytics Dashboard";
  if (pathname.startsWith("/dashboard/skillset-templates")) return "Skillset Templates";
  if (pathname.startsWith("/dashboard/training-plans")) return "Training Plans";
  if (pathname.startsWith("/dashboard/user-management")) return "User Management";
  return "Dashboard";
}

function capitalize(str: string): string {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
}

export interface TopBarProps {
  onMenuToggle?: () => void;
}

export function Navbar({ onMenuToggle }: TopBarProps) {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);
  const { user, logout } = useAuth();
  const [userOpen, setUserOpen] = useState(false);

  const userName = user?.name || user?.email || "User";
  const userRole = capitalize(user?.role || "member");

  const iconBtn =
    "rounded-lg p-2 cursor-pointer transition-colors " +
    "text-slate-400 hover:bg-slate-100 hover:text-slate-600 " +
    "dark:text-[#64748B] dark:hover:bg-[#262D35] dark:hover:text-[#E2E8F0]";

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-3 sm:px-5 dark:border-[#2D3640] dark:bg-[#242B33]">

      {/* ── Left ── */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Sidebar toggle */}
        <button type="button" aria-label="Toggle sidebar" onClick={onMenuToggle} className={iconBtn}>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v18" />
          </svg>
        </button>

        {/* Page title */}
        <div>
          <h1 className="text-sm font-semibold text-slate-800 dark:text-[#E2E8F0]">{pageTitle}</h1>
          <p className="hidden text-[11px] text-slate-400 sm:block dark:text-[#64748B]">
            Dashboard {pageTitle !== "Overview" && <>›&nbsp;{pageTitle}</>}
          </p>
        </div>
      </div>

      {/* ── Right ── */}
      <div className="flex items-center gap-1">

        {/* Theme toggle */}
        <ThemeToggle />

        {/* Divider */}
        <div className="mx-1.5 hidden h-5 w-px bg-slate-200 sm:block dark:bg-[#2D3640]" />

        {/* User menu */}
        <div className="relative">
          <button
            type="button"
            aria-label="User menu"
            onClick={() => setUserOpen((v) => !v)}
            className="flex cursor-pointer items-center justify-center rounded-full p-0.5 transition-colors hover:ring-2 hover:ring-slate-200 dark:hover:ring-[#3D4A5C]"
          >
            {/* Avatar circle with initials */}
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1B2A49] text-xs font-semibold text-white dark:bg-[#4CCBBF] dark:text-[#1C2127]">
              {userName.charAt(0).toUpperCase()}
            </div>
          </button>

          {userOpen && (
            <>
              <div className="fixed inset-0 z-10" aria-hidden="true" onClick={() => setUserOpen(false)} />
              <div className="absolute right-0 top-full z-20 mt-2 w-52 rounded-xl border border-slate-200 bg-white shadow-lg dark:border-[#2D3640] dark:bg-[#242B33]">
                <div className="border-b border-slate-100 px-4 py-3 dark:border-[#2D3640]">
                  <p className="truncate text-xs font-semibold text-slate-800 dark:text-[#E2E8F0]">{userName}</p>
                  <p className="truncate text-[10px] text-slate-400 dark:text-[#64748B]">{userRole}</p>
                  {user?.email && (
                    <p className="mt-0.5 truncate text-[11px] text-slate-400 dark:text-[#64748B]">{user.email}</p>
                  )}
                </div>
                <div className="border-t border-slate-100 p-1 dark:border-[#2D3640]">
                  <button
                    onClick={logout}
                    className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#ED495D] transition-colors hover:bg-[#ED495D]/5"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
