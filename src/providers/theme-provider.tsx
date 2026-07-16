"use client";

import { useState, useEffect, useCallback } from "react";
import { ThemeContext, type Theme } from "@/contexts/theme-context";

const STORAGE_KEY = "theme";

/** Applies or removes the `dark` class on <html>. Safe to call client-side only. */
function applyTheme(theme: Theme) {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  /**
   * Start with "light" — this is what the server renders and what React uses
   * during hydration. suppressHydrationWarning on <html> lets the inline script
   * apply the real class without causing a hydration mismatch.
   *
   * A useEffect then reads the DOM immediately after mount and corrects the
   * state to match whatever the inline <head> script already applied.
   * This happens before the user can click anything, so the toggle always
   * reads the correct current theme.
   */
  const [theme, setThemeState] = useState<Theme>("light");

  // Sync React state with the DOM class that the inline script set.
  // Runs once on mount — no flash, no state/DOM desync.
  useEffect(() => {
    const current = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    setThemeState(current);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    applyTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (_) {}
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next: Theme = prev === "light" ? "dark" : "light";
      applyTheme(next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch (_) {}
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
