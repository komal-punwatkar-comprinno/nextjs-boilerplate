"use client";

import { use } from "react";

import { AuthContext } from "@/contexts/auth-context";

/**
 * Access the authenticated session and auth helpers from any Client Component.
 *
 * Must be rendered inside `<AuthProvider>`.
 *
 * @example
 * const { user, isAuthenticated, logout } = useAuth();
 */
export function useAuth() {
  const ctx = use(AuthContext);

  if (!ctx) {
    throw new Error(
      "`useAuth` must be called inside an `<AuthProvider>` tree."
    );
  }

  return ctx;
}
