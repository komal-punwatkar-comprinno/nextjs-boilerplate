"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { AuthContext, type AuthContextValue } from "@/contexts/auth-context";
import { STORAGE_KEYS } from "@/constants/storage-keys";
import { routes } from "@/config/routes";
import type { AuthUser } from "@/types/auth";

interface AuthProviderProps {
  children: React.ReactNode;
  /**
   * Optionally seed the provider with a user that was resolved server-side.
   * Pass `null` explicitly when the user is known to be unauthenticated.
   */
  initialUser?: AuthUser | null;
}

/**
 * Wraps the application (or a subtree) and supplies the authenticated session
 * to every descendant Client Component via `useAuth()`.
 *
 * Place this inside the root layout, wrapping `{children}`, once the Cognito
 * integration is configured.
 *
 * @example
 * // app/layout.tsx
 * <AuthProvider>{children}</AuthProvider>
 */
export function AuthProvider({
  children,
  initialUser = null,
}: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(initialUser);
  const [isLoading, setIsLoading] = useState(initialUser === null);

  // On mount, attempt to restore the session from local storage.
  // Replace this block with a real session-verification call once the
  // Cognito integration is in place.
  useEffect(() => {
    if (initialUser !== null) {
      setIsLoading(false);
      return;
    }

    try {
      const raw = localStorage.getItem(STORAGE_KEYS.USER);
      if (raw) {
        const parsed: AuthUser = JSON.parse(raw) as AuthUser;
        setUser(parsed);
      }
    } catch {
      // Malformed storage — ignore and stay unauthenticated.
    } finally {
      setIsLoading(false);
    }
  }, [initialUser]);

  const logout = useCallback(async () => {
    // Clear local state and persisted data.
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);

    // Navigate to login (full reload clears any in-memory state).
    window.location.assign(routes.login);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      isAuthenticated: user !== null,
      logout,
    }),
    [user, isLoading, logout]
  );

  return <AuthContext value={value}>{children}</AuthContext>;
}
