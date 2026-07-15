/**
 * Local storage helpers with:
 * - SSR safety (no-ops when `window` is unavailable).
 * - JSON serialization / deserialization.
 * - Silent error handling so a storage failure never crashes the application.
 */

/** Returns `true` when `localStorage` is accessible. */
function isAvailable(): boolean {
  return typeof window !== "undefined" && "localStorage" in window;
}

/**
 * Retrieve and deserialize a value from local storage.
 * Returns `null` when the key does not exist or parsing fails.
 *
 * @example
 * const token = storageGet<string>("access_token");
 */
export function storageGet<T>(key: string): T | null {
  if (!isAvailable()) return null;
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

/**
 * Serialize and store a value in local storage.
 *
 * @example
 * storageSet("access_token", "eyJ...");
 */
export function storageSet<T>(key: string, value: T): void {
  if (!isAvailable()) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage quota exceeded or security error — fail silently.
  }
}

/**
 * Remove a key from local storage.
 *
 * @example
 * storageRemove("access_token");
 */
export function storageRemove(key: string): void {
  if (!isAvailable()) return;
  try {
    localStorage.removeItem(key);
  } catch {
    // Ignore.
  }
}

/**
 * Remove all keys from local storage.
 * Use with caution — this also clears third-party keys.
 */
export function storageClear(): void {
  if (!isAvailable()) return;
  try {
    localStorage.clear();
  } catch {
    // Ignore.
  }
}
