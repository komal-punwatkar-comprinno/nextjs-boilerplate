/**
 * Keys used for browser storage (localStorage / sessionStorage).
 *
 * Centralising keys avoids typos and collisions across modules.
 */
export const STORAGE_KEYS = {
  /** JWT access token cached in local storage for client-side auth checks. */
  ACCESS_TOKEN: "access_token",
  /** Serialised `AuthUser` object. */
  USER: "auth_user",
  /** User's preferred UI theme. */
  THEME: "theme",
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
