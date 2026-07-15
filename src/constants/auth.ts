/**
 * Authentication-related constants.
 */

/** Name of the HTTP-only cookie that holds the session token. */
export const AUTH_COOKIE_KEY = "session";

/** Number of seconds before the access token is considered expired
 *  (applies to any local expiry check — the server is authoritative). */
export const ACCESS_TOKEN_TTL_SECONDS = 3_600; // 1 hour

/** Minimum milliseconds remaining before a proactive token refresh triggers. */
export const TOKEN_REFRESH_THRESHOLD_MS = 5 * 60 * 1_000; // 5 minutes
