"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "../common/theme-toggle";

function getPageTitle(pathname: string): string {
  if (pathname === "/dashboard") return "Dashboard";
  if (pathname.startsWith("/dashboard/analytics")) return "Analytics";
  if (pathname.startsWith("/dashboard/users")) return "Users";
  if (pathname.startsWith("/dashboard/projects")) return "Projects";
  if (pathname.startsWith("/dashboard/messages")) return "Messages";
  if (pathname.startsWith("/dashboard/components")) return "Components";
  if (pathname.startsWith("/dashboard/settings")) return "Settings";
  return "Dashboard";
}

export interface TopBarProps {
  onMenuToggle?: () => void;
}

export function Navbar({ onMenuToggle }: TopBarProps) {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

        {/* Page title — hidden when mobile search open */}
        {!mobileSearchOpen && (
          <div>
            <h1 className="text-sm font-semibold text-slate-800 dark:text-[#E2E8F0]">{pageTitle}</h1>
            <p className="hidden text-[11px] text-slate-400 sm:block dark:text-[#64748B]">
              Dashboard {pageTitle !== "Dashboard" && <>›&nbsp;{pageTitle}</>}
            </p>
          </div>
        )}

        {/* Mobile search input — expands inline */}
        {mobileSearchOpen && (
          <div className="flex items-center gap-2 sm:hidden">
            <input
              autoFocus
              type="search"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search…"
              className="h-8 w-40 rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs outline-none focus:border-[#4CCBBF] focus:ring-1 focus:ring-[#4CCBBF] dark:border-[#2D3640] dark:bg-[#1C2127] dark:text-[#E2E8F0] dark:placeholder:text-[#64748B]"
            />
            <button
              type="button"
              onClick={() => { setMobileSearchOpen(false); setSearchQuery(""); }}
              className={iconBtn}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* ── Right ── */}
      <div className="flex items-center gap-1">

        {/* Desktop search — typeable input */}
        <div className="mr-2 hidden items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 sm:flex dark:border-[#2D3640] dark:bg-[#1C2127] focus-within:border-[#4CCBBF] focus-within:ring-1 focus-within:ring-[#4CCBBF] transition-all">
          <svg className="h-3.5 w-3.5 shrink-0 text-slate-400 dark:text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search…"
            className="w-32 bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-400 dark:text-[#E2E8F0] dark:placeholder:text-[#64748B]"
          />
          <kbd className="ml-1 hidden rounded border border-slate-200 px-1 py-0.5 font-mono text-[10px] text-slate-300 lg:block dark:border-[#2D3640] dark:text-[#475569]">
            ⌘K
          </kbd>
        </div>

        {/* Mobile search icon */}
        {!mobileSearchOpen && (
          <button
            type="button"
            aria-label="Search"
            onClick={() => setMobileSearchOpen(true)}
            className={`${iconBtn} sm:hidden`}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        )}

        {/* Theme toggle */}
        <ThemeToggle />

        {/* Notification bell */}
        <div className="relative">
          <button
            type="button"
            aria-label="Notifications"
            onClick={() => { setNotifOpen(v => !v); setUserOpen(false); }}
            className={`relative ${iconBtn}`}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#ED495D] ring-2 ring-white dark:ring-[#242B33]" />
          </button>

          {notifOpen && (
            <>
              <div className="fixed inset-0 z-10" aria-hidden="true" onClick={() => setNotifOpen(false)} />
              <div className="absolute right-0 top-full z-20 mt-2 w-72 rounded-xl border border-slate-200 bg-white shadow-lg sm:w-80 dark:border-[#2D3640] dark:bg-[#242B33]">
                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-[#2D3640]">
                  <p className="text-sm font-semibold text-slate-800 dark:text-[#E2E8F0]">Notifications</p>
                  <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ backgroundColor: "rgba(76,203,191,0.12)", color: "#4CCBBF" }}>
                    3 new
                  </span>
                </div>
                <ul className="max-h-64 divide-y divide-slate-50 overflow-y-auto dark:divide-[#2D3640]/50">
                  {[
                    { icon: "🎉", title: "New project created",    time: "2 min ago",  unread: true  },
                    { icon: "👤", title: "New team member joined", time: "1 hr ago",   unread: true  },
                    { icon: "✅", title: "Task #42 completed",     time: "3 hrs ago",  unread: true  },
                    { icon: "📊", title: "Monthly report ready",   time: "Yesterday",  unread: false },
                  ].map((n, i) => (
                    <li
                      key={i}
                      className={`flex cursor-pointer items-start gap-3 px-4 py-3 transition-colors hover:bg-slate-50 dark:hover:bg-[#2D3640]/40 ${n.unread ? "dark:bg-[#4CCBBF]/[0.03]" : ""}`}
                    >
                      <span className="mt-0.5 text-base">{n.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${n.unread ? "font-medium text-slate-700 dark:text-[#E2E8F0]" : "text-slate-500 dark:text-[#94A3B8]"}`}>
                          {n.title}
                        </p>
                        <p className="text-xs text-slate-400 dark:text-[#64748B]">{n.time}</p>
                      </div>
                      {n.unread && <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4CCBBF]" />}
                    </li>
                  ))}
                </ul>
                <div className="border-t border-slate-100 px-4 py-2.5 dark:border-[#2D3640]">
                  <button className="w-full cursor-pointer text-center text-xs font-medium text-[#4CCBBF] hover:text-[#3AAFA4]">
                    View all notifications
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Divider — hidden on small screens */}
        <div className="mx-1.5 hidden h-5 w-px bg-slate-200 sm:block dark:bg-[#2D3640]" />

        {/* User avatar */}
        <div className="relative">
          <button
            type="button"
            aria-label="User menu"
            onClick={() => { setUserOpen(v => !v); setNotifOpen(false); }}
            className="flex cursor-pointer items-center gap-2 rounded-lg px-1.5 py-1.5 transition-colors hover:bg-slate-100 sm:px-2 dark:hover:bg-[#262D35]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://i.pravatar.cc/150?img=8" alt="User avatar" className="h-7 w-7 rounded-full object-cover" />
            <div className="hidden text-left sm:block">
              <p className="text-xs font-semibold text-slate-700 dark:text-[#E2E8F0]">Alex Johnson</p>
              <p className="text-[10px] text-slate-400 dark:text-[#64748B]">Admin</p>
            </div>
            <svg className="hidden h-3.5 w-3.5 text-slate-400 sm:block dark:text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {userOpen && (
            <>
              <div className="fixed inset-0 z-10" aria-hidden="true" onClick={() => setUserOpen(false)} />
              <div className="absolute right-0 top-full z-20 mt-2 w-48 rounded-xl border border-slate-200 bg-white shadow-lg dark:border-[#2D3640] dark:bg-[#242B33]">
                <div className="border-b border-slate-100 px-4 py-3 dark:border-[#2D3640]">
                  <p className="text-xs font-semibold text-slate-800 dark:text-[#E2E8F0]">Alex Johnson</p>
                  <p className="text-[11px] text-slate-400 dark:text-[#64748B]">alex@example.com</p>
                </div>
                <ul className="p-1">
                  {[
                    { label: "Profile",        icon: "👤" },
                    { label: "Settings",       icon: "⚙️" },
                    { label: "Help & Support", icon: "❓" },
                  ].map((item) => (
                    <li key={item.label}>
                      <button className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors text-slate-600 hover:bg-slate-50 dark:text-[#94A3B8] dark:hover:bg-[#2D3640]/60 dark:hover:text-[#E2E8F0]">
                        <span>{item.icon}</span>
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-slate-100 p-1 dark:border-[#2D3640]">
                  <button className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#ED495D] transition-colors hover:bg-[#ED495D]/5">
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
