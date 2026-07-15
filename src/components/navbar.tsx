"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

/** Maps pathnames to human-readable page titles for the breadcrumb area. */
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
  /** Called when hamburger is clicked (parent can toggle sidebar on mobile). */
  onMenuToggle?: () => void;
}

/**
 * Dashboard top navigation bar.
 * Contains hamburger toggle, page title, search, notifications, and user avatar.
 */
export function Navbar({ onMenuToggle }: TopBarProps) {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm">
      {/* Left side */}
      <div className="flex items-center gap-4">
        {/* Hamburger (mobile / collapsible sidebar) */}
        <button
          type="button"
          aria-label="Toggle sidebar"
          onClick={onMenuToggle}
          className="rounded-md p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Page title */}
        <div>
          <h1 className="text-base font-semibold text-slate-800">{pageTitle}</h1>
          <p className="text-xs text-slate-400">
            Dashboard &rsaquo; {pageTitle}
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <button
          type="button"
          aria-label="Search"
          className="rounded-md p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        {/* Notification bell */}
        <div className="relative">
          <button
            type="button"
            aria-label="Notifications"
            onClick={() => { setNotifOpen((v) => !v); setUserOpen(false); }}
            className="relative rounded-md p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {/* Badge */}
            <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
          </button>

          {/* Notification dropdown */}
          {notifOpen && (
            <>
              <div className="fixed inset-0 z-10" aria-hidden="true" onClick={() => setNotifOpen(false)} />
              <div className="absolute right-0 top-full z-20 mt-2 w-80 rounded-xl border border-slate-200 bg-white shadow-lg">
                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                  <p className="text-sm font-semibold text-slate-800">Notifications</p>
                  <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700">3 new</span>
                </div>
                <ul className="max-h-72 divide-y divide-slate-50 overflow-y-auto">
                  {[
                    { icon: "🎉", title: "New project created", time: "2 min ago", unread: true },
                    { icon: "👤", title: "New team member joined", time: "1 hr ago", unread: true },
                    { icon: "✅", title: "Task #42 completed", time: "3 hrs ago", unread: true },
                    { icon: "📊", title: "Monthly report ready", time: "Yesterday", unread: false },
                  ].map((n, i) => (
                    <li key={i} className={`flex items-start gap-3 px-4 py-3 text-sm hover:bg-slate-50 cursor-pointer ${n.unread ? "bg-indigo-50/40" : ""}`}>
                      <span className="mt-0.5 text-lg">{n.icon}</span>
                      <div className="flex-1">
                        <p className={`text-sm ${n.unread ? "font-medium text-slate-800" : "text-slate-600"}`}>{n.title}</p>
                        <p className="text-xs text-slate-400">{n.time}</p>
                      </div>
                      {n.unread && <span className="mt-1.5 h-2 w-2 rounded-full bg-indigo-500 shrink-0" />}
                    </li>
                  ))}
                </ul>
                <div className="border-t border-slate-100 px-4 py-3">
                  <button className="w-full text-center text-xs font-medium text-indigo-600 hover:text-indigo-700">
                    View all notifications
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Divider */}
        <div className="mx-1 h-6 w-px bg-slate-200" />

        {/* User avatar */}
        <div className="relative">
          <button
            type="button"
            aria-label="User menu"
            onClick={() => { setUserOpen((v) => !v); setNotifOpen(false); }}
            className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-slate-100"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://i.pravatar.cc/150?img=8"
              alt="User avatar"
              className="h-8 w-8 rounded-full object-cover"
            />
            <div className="hidden text-left sm:block">
              <p className="text-sm font-medium text-slate-700">Alex Johnson</p>
              <p className="text-xs text-slate-400">Admin</p>
            </div>
            <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* User dropdown */}
          {userOpen && (
            <>
              <div className="fixed inset-0 z-10" aria-hidden="true" onClick={() => setUserOpen(false)} />
              <div className="absolute right-0 top-full z-20 mt-2 w-52 rounded-xl border border-slate-200 bg-white shadow-lg">
                <div className="border-b border-slate-100 px-4 py-3">
                  <p className="text-sm font-semibold text-slate-800">Alex Johnson</p>
                  <p className="text-xs text-slate-400">alex@example.com</p>
                </div>
                <ul className="p-1.5">
                  {[
                    { label: "Profile", icon: "👤" },
                    { label: "Settings", icon: "⚙️" },
                    { label: "Help & Support", icon: "❓" },
                  ].map((item) => (
                    <li key={item.label}>
                      <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50">
                        <span>{item.icon}</span>
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-slate-100 p-1.5">
                  <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50">
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
