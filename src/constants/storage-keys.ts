/**
 * Keys used for browser storage (localStorage / sessionStorage).
 *
 * Centralising keys avoids typos and collisions across modules.
 * These match the existing SkillSphere frontend's localStorage keys.
 */
export const STORAGE_KEYS = {
  /** Cognito access token */
  ACCESS_TOKEN: "access_token",
  /** Cognito ID token (used for API Authorization header) */
  ID_TOKEN: "id_token",
  /** Cognito refresh token */
  REFRESH_TOKEN: "refresh_token",
  /** Serialised AuthUser object (email, name, role, team, manager) */
  USER: "user",
  /** User's preferred UI theme */
  THEME: "theme",
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
