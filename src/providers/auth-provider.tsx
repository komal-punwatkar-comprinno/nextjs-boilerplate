"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { AuthContext, type AuthContextValue } from "@/contexts/auth-context";
import { authService } from "@/services/auth-service";
import { TOKEN_REFRESH_THRESHOLD_MS } from "@/constants/auth";
import { STORAGE_KEYS } from "@/constants/storage-keys";
import { routes } from "@/config/routes";
import type { AuthUser } from "@/types/auth";
import type { Role } from "@/constants/roles";

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * AuthProvider — manages Cognito JWT tokens, auto-refresh, and user state.
 *
 * Behavior matches the existing SkillSphere auth-guard.js:
 * - Reads tokens + user from localStorage on mount
 * - Validates token expiry
 * - Schedules proactive refresh (5 minutes before expiry)
 * - Syncs role from the id_token back to the user object
 * - Redirects to login when session is invalid
 *
 * @example
 * // app/layout.tsx
 * <AuthProvider>{children}</AuthProvider>
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const refreshTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /**
   * Clear the refresh timer.
   */
  const clearRefreshTimer = useCallback(() => {
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
      refreshTimerRef.current = null;
    }
  }, []);

  /**
   * Redirect to login and clear all session data.
   */
  const redirectToLogin = useCallback(() => {
    clearRefreshTimer();
    authService.logout();
    // Use window.location for a full page reload (clears in-memory state)
    window.location.assign(routes.login);
  }, [clearRefreshTimer]);

  /**
   * Sync the role from the id_token payload back to the stored user object.
   * This ensures the user's role stays current even if an admin changes it.
   */
  const syncRoleFromToken = useCallback((tokenPayload: Record<string, unknown>) => {
    const tokenRole = tokenPayload["custom:role"] as string | undefined;
    if (!tokenRole) return;

    const storedUser = authService.getStoredUser();
    if (storedUser && storedUser.role !== tokenRole) {
      const updatedUser: AuthUser = { ...storedUser, role: tokenRole as Role };
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  }, []);

  /**
   * Refresh the access + id tokens using the stored refresh token.
   */
  const refreshToken = useCallback(async () => {
    const tokens = authService.getStoredTokens();
    if (!tokens?.refresh_token) {
      redirectToLogin();
      return;
    }

    try {
      const data = await authService.refreshToken({
        refresh_token: tokens.refresh_token,
      });

      // Save new tokens
      authService.updateTokens(data);

      // Decode new id_token to get expiry and sync role
      const payload = authService.decodeToken(data.id_token);
      if (payload) {
        syncRoleFromToken(payload);
        const expiresAt = (payload.exp as number) * 1000;
        scheduleRefresh(expiresAt);
      }
    } catch (error) {
      console.error("[AuthProvider] Token refresh failed:", error);
      redirectToLogin();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirectToLogin, syncRoleFromToken]);

  /**
   * Schedule a proactive token refresh before expiry.
   * Matches auth-guard.js: refresh 5 minutes before token expires.
   */
  const scheduleRefresh = useCallback(
    (expiresAt: number) => {
      clearRefreshTimer();

      const now = Date.now();
      const timeUntilExpiry = expiresAt - now;
      const refreshTime = timeUntilExpiry - TOKEN_REFRESH_THRESHOLD_MS;

      if (refreshTime > 0) {
        refreshTimerRef.current = setTimeout(refreshToken, refreshTime);
      } else if (timeUntilExpiry > 0) {
        // Token expires very soon — refresh immediately
        refreshTimerRef.current = setTimeout(refreshToken, 0);
      }
      // If timeUntilExpiry <= 0, token is already expired — handled elsewhere
    },
    [clearRefreshTimer, refreshToken]
  );

  /**
   * Initialize: restore session from localStorage, validate, schedule refresh.
   */
  useEffect(() => {
    const storedUser = authService.getStoredUser();
    const tokens = authService.getStoredTokens();

    if (!storedUser || !tokens) {
      setIsLoading(false);
      return;
    }

    // Decode the id_token to check expiry
    const payload = authService.decodeToken(tokens.id_token);
    if (!payload || typeof payload.exp !== "number") {
      // Invalid token — clear and stay unauthenticated
      authService.logout();
      setIsLoading(false);
      return;
    }

    const expiresAt = payload.exp * 1000;

    if (expiresAt < Date.now()) {
      // Token expired — attempt a refresh
      refreshToken().finally(() => {
        const refreshedUser = authService.getStoredUser();
        setUser(refreshedUser);
        setIsLoading(false);
      });
      return;
    }

    // Token is valid — sync role and schedule refresh
    syncRoleFromToken(payload);
    setUser(authService.getStoredUser());
    scheduleRefresh(expiresAt);
    setIsLoading(false);

    return () => {
      clearRefreshTimer();
    };
  // Run only on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Logout: clear tokens, user state, and redirect.
   */
  const logout = useCallback(() => {
    clearRefreshTimer();
    setUser(null);
    authService.logout();
    window.location.assign(routes.login);
  }, [clearRefreshTimer]);

  /**
   * Update user in both state and localStorage.
   */
  const handleSetUser = useCallback((updatedUser: AuthUser) => {
    setUser(updatedUser);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      isAuthenticated: user !== null,
      logout,
      setUser: handleSetUser,
    }),
    [user, isLoading, logout, handleSetUser]
  );

  return <AuthContext value={value}>{children}</AuthContext>;
}
