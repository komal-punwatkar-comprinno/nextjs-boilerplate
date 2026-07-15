"use client";

import { createContext } from "react";

import type { AuthUser } from "@/types/auth";

export interface AuthContextValue {
  /** The currently signed-in user, or `null` when unauthenticated. */
  user: AuthUser | null;
  /** `true` while the initial session check is in progress. */
  isLoading: boolean;
  /** `true` when a valid session exists. */
  isAuthenticated: boolean;
  /** Trigger a logout and clear the session. */
  logout: () => Promise<void>;
}

/**
 * Provides the authenticated session to the Client Component tree.
 *
 * Consume via `useAuth()` — never read this context directly in feature code.
 */
export const AuthContext = createContext<AuthContextValue | null>(null);
