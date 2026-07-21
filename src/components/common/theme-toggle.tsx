"use client";

import { useTheme } from "@/contexts/theme-context";

/**
 * Sun/moon toggle button — place anywhere in the UI.
 * Reads theme from ThemeContext and calls toggleTheme on click.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={[
        "rounded-md p-2 transition-colors",
        "text-slate-500 hover:bg-slate-100 hover:text-slate-700",
        "dark:text-[#9FAEC1] dark:hover:bg-[#2A3441] dark:hover:text-[#E8EDF2]",
        className,
      ].join(" ")}
    >
      {isDark ? (
        /* Sun icon */
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m15.07-6.07-.71.71M6.34 17.66l-.71.71m12.02 0-.71-.71M6.34 6.34l-.71-.71M12 7a5 5 0 100 10A5 5 0 0012 7z" />
        </svg>
      ) : (
        /* Moon icon */
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
        </svg>
      )}
    </button>
  );
}
