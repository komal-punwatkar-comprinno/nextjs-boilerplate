/**
 * Date formatting utilities.
 *
 * Uses the native `Intl.DateTimeFormat` API — no external dependencies.
 */

/**
 * Format a date as a human-readable string.
 *
 * @example
 * formatDate(new Date()) // "Jul 15, 2026"
 */
export function formatDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  },
  locale = "en-US"
): string {
  return new Intl.DateTimeFormat(locale, options).format(new Date(date));
}

/**
 * Format a date and time as a human-readable string.
 *
 * @example
 * formatDateTime(new Date()) // "Jul 15, 2026, 11:14 AM"
 */
export function formatDateTime(
  date: Date | string | number,
  locale = "en-US"
): string {
  return formatDate(
    date,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    },
    locale
  );
}

/**
 * Returns a relative time string (e.g. "3 hours ago", "in 2 days").
 *
 * @example
 * formatRelativeTime(Date.now() - 60_000) // "1 minute ago"
 */
export function formatRelativeTime(
  date: Date | string | number,
  locale = "en-US"
): string {
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  const diffMs = new Date(date).getTime() - Date.now();
  const diffSeconds = Math.round(diffMs / 1_000);
  const diffMinutes = Math.round(diffSeconds / 60);
  const diffHours = Math.round(diffMinutes / 60);
  const diffDays = Math.round(diffHours / 24);

  if (Math.abs(diffSeconds) < 60) return rtf.format(diffSeconds, "second");
  if (Math.abs(diffMinutes) < 60) return rtf.format(diffMinutes, "minute");
  if (Math.abs(diffHours) < 24) return rtf.format(diffHours, "hour");
  return rtf.format(diffDays, "day");
}

/**
 * Returns `true` when the given Unix timestamp (milliseconds) is in the past.
 */
export function isExpired(expiresAtMs: number): boolean {
  return Date.now() >= expiresAtMs;
}
