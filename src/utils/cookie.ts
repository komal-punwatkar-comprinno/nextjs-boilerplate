/**
 * Client-side cookie helpers.
 *
 * These are thin wrappers around `document.cookie` for cases where a cookie
 * must be read or written from the browser.
 *
 * For server-side cookie access in Route Handlers or Server Actions use the
 * Next.js `cookies()` API from `next/headers`.
 *
 * All helpers are SSR-safe (no-ops when `document` is unavailable).
 */

interface SetCookieOptions {
  /** Expiry in days from now. Omit for a session cookie. */
  days?: number;
  /** Cookie path (default: "/"). */
  path?: string;
  /** `true` to set the Secure flag (recommended in production). */
  secure?: boolean;
  /** SameSite attribute (default: "Lax"). */
  sameSite?: "Strict" | "Lax" | "None";
}

/**
 * Read a cookie value by name.
 * Returns `null` when the cookie does not exist or running on the server.
 *
 * @example
 * const theme = cookieGet("theme");
 */
export function cookieGet(name: string): string | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));

  return match ? decodeURIComponent(match.split("=")[1]!) : null;
}

/**
 * Write a cookie.
 *
 * @example
 * cookieSet("theme", "dark", { days: 365 });
 */
export function cookieSet(
  name: string,
  value: string,
  options: SetCookieOptions = {}
): void {
  if (typeof document === "undefined") return;

  const { days, path = "/", secure = false, sameSite = "Lax" } = options;

  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=${path}; SameSite=${sameSite}`;

  if (days !== undefined) {
    const expires = new Date(Date.now() + days * 864e5);
    cookie += `; expires=${expires.toUTCString()}`;
  }

  if (secure) {
    cookie += "; Secure";
  }

  document.cookie = cookie;
}

/**
 * Delete a cookie by setting its expiry to the past.
 *
 * @example
 * cookieRemove("theme");
 */
export function cookieRemove(name: string, path = "/"): void {
  cookieSet(name, "", { days: -1, path });
}
