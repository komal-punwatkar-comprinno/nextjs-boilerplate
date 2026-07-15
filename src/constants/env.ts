/**
 * Environment-aware constants.
 *
 * All environment variables used in the client bundle must be prefixed with
 * `NEXT_PUBLIC_`. Server-only variables can use any name but must only be
 * read in Server Components, Route Handlers, or Server Actions.
 */

/** Base URL of the backend API (e.g. API Gateway endpoint). */
export const API_BASE_URL: string =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

/** Current deployment environment. */
export const APP_ENV =
  (process.env.NEXT_PUBLIC_APP_ENV as "development" | "staging" | "production") ??
  "development";

export const IS_PRODUCTION = APP_ENV === "production";
export const IS_DEVELOPMENT = APP_ENV === "development";
