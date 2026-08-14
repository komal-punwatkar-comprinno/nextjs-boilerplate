import { API_BASE_URL } from "@/constants/env";
import { STORAGE_KEYS } from "@/constants/storage-keys";
import type { ApiError } from "@/types/api";

// ─── Configuration ───────────────────────────────────────────────────────────

/** Request timeout in ms (matches existing SkillSphere: 30s) */
const REQUEST_TIMEOUT = 30_000;

/** Max retry attempts for failed requests */
const MAX_RETRIES = 3;

/** Exponential backoff delays in ms */
const RETRY_DELAYS = [1000, 2000, 4000];

// ─── Types ───────────────────────────────────────────────────────────────────

/** Options accepted by every request method. */
export interface RequestOptions extends Omit<RequestInit, "method" | "body"> {
  /** Query-string parameters appended to the URL. */
  params?: Record<string, string | number | boolean | undefined | null>;
  /** Skip automatic retry on failure. */
  noRetry?: boolean;
  /** Skip attaching the Authorization header (for auth endpoints). */
  noAuth?: boolean;
  /** Custom timeout in ms (defaults to REQUEST_TIMEOUT). */
  timeout?: number;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Builds a full URL from a path and optional query-string parameters.
 * Prepends API_BASE_URL if the path is relative.
 */
function buildUrl(path: string, params?: RequestOptions["params"]): string {
  const base = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;

  if (!params) return base;

  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      query.set(key, String(value));
    }
  }

  const queryString = query.toString();
  return queryString ? `${base}?${queryString}` : base;
}

/** Sleep utility for retry delays. */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Returns the default headers used for every request.
 * Uses `id_token` for Authorization (matching existing SkillSphere backend).
 */
function getDefaultHeaders(noAuth?: boolean): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (!noAuth && typeof window !== "undefined") {
    const token = localStorage.getItem(STORAGE_KEYS.ID_TOKEN);
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return headers;
}

/**
 * Fetch with AbortController-based timeout.
 */
async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeout: number
): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("Request timeout — please try again");
    }
    throw error;
  } finally {
    clearTimeout(id);
  }
}

/**
 * Fetch with retry and exponential backoff.
 * Retries on:
 *  - Network errors (fetch throws)
 *  - Server errors (5xx)
 * Does NOT retry on:
 *  - Client errors (4xx) — these are intentional responses
 */
async function fetchWithRetry(
  url: string,
  options: RequestInit,
  retries: number = MAX_RETRIES,
  timeout: number = REQUEST_TIMEOUT
): Promise<Response> {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await fetchWithTimeout(url, options, timeout);

      // Retry on server errors (5xx), but not on the last attempt
      if (response.status >= 500 && attempt < retries - 1) {
        console.warn(
          `[apiClient] Server error ${response.status}, retrying... (${attempt + 1}/${retries})`
        );
        await sleep(RETRY_DELAYS[attempt] ?? 4000);
        continue;
      }

      return response;
    } catch (error) {
      // Retry on network errors or timeout, but not on the last attempt
      if (attempt < retries - 1) {
        console.warn(
          `[apiClient] Request failed, retrying... (${attempt + 1}/${retries})`,
          error instanceof Error ? error.message : error
        );
        await sleep(RETRY_DELAYS[attempt] ?? 4000);
        continue;
      }
      throw error;
    }
  }

  // Should never reach here, but TypeScript needs it
  throw new Error("Max retries exceeded");
}

/**
 * Parses the response body and throws a typed `ApiError` on non-2xx status.
 */
async function handleResponse<T>(response: Response): Promise<T> {
  let body: unknown;
  try {
    body = await response.json();
  } catch {
    body = null;
  }

  if (!response.ok) {
    const apiError: ApiError = {
      message:
        (body as { error?: string })?.error ??
        (body as { message?: string })?.message ??
        response.statusText,
      status: response.status,
      code: (body as { code?: string })?.code,
      details: (body as { details?: Record<string, string | string[]> })?.details,
    };
    throw apiError;
  }

  return body as T;
}

// ─── API Client ──────────────────────────────────────────────────────────────

/**
 * Centralized API client for SkillSphere.
 *
 * Features:
 * - Automatic `Bearer <id_token>` auth header
 * - 30s request timeout
 * - Exponential backoff retry (3 attempts) on network/server errors
 * - Typed error handling
 *
 * All service methods must call through this client — pages must never call
 * `fetch` directly.
 *
 * @example
 * const user = await apiClient.get<User>("/users/me");
 * await apiClient.post<void>("/auth/logout", {});
 */
export const apiClient = {
  /** GET request. */
  async get<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { params, noRetry, noAuth, timeout, ...rest } = options;
    const url = buildUrl(path, params);
    const headers = { ...getDefaultHeaders(noAuth), ...rest.headers };
    const fetchOptions: RequestInit = { ...rest, method: "GET", headers };

    const response = noRetry
      ? await fetchWithTimeout(url, fetchOptions, timeout ?? REQUEST_TIMEOUT)
      : await fetchWithRetry(url, fetchOptions, MAX_RETRIES, timeout ?? REQUEST_TIMEOUT);

    return handleResponse<T>(response);
  },

  /** POST request. */
  async post<T>(
    path: string,
    body: unknown,
    options: RequestOptions = {}
  ): Promise<T> {
    const { params, noRetry, noAuth, timeout, ...rest } = options;
    const url = buildUrl(path, params);
    const headers = { ...getDefaultHeaders(noAuth), ...rest.headers };
    const fetchOptions: RequestInit = { ...rest, method: "POST", headers, body: JSON.stringify(body) };

    const response = noRetry
      ? await fetchWithTimeout(url, fetchOptions, timeout ?? REQUEST_TIMEOUT)
      : await fetchWithRetry(url, fetchOptions, MAX_RETRIES, timeout ?? REQUEST_TIMEOUT);

    return handleResponse<T>(response);
  },

  /** PUT request (full replacement). */
  async put<T>(
    path: string,
    body: unknown,
    options: RequestOptions = {}
  ): Promise<T> {
    const { params, noRetry, noAuth, timeout, ...rest } = options;
    const url = buildUrl(path, params);
    const headers = { ...getDefaultHeaders(noAuth), ...rest.headers };
    const fetchOptions: RequestInit = { ...rest, method: "PUT", headers, body: JSON.stringify(body) };

    const response = noRetry
      ? await fetchWithTimeout(url, fetchOptions, timeout ?? REQUEST_TIMEOUT)
      : await fetchWithRetry(url, fetchOptions, MAX_RETRIES, timeout ?? REQUEST_TIMEOUT);

    return handleResponse<T>(response);
  },

  /** PATCH request (partial update). */
  async patch<T>(
    path: string,
    body: unknown,
    options: RequestOptions = {}
  ): Promise<T> {
    const { params, noRetry, noAuth, timeout, ...rest } = options;
    const url = buildUrl(path, params);
    const headers = { ...getDefaultHeaders(noAuth), ...rest.headers };
    const fetchOptions: RequestInit = { ...rest, method: "PATCH", headers, body: JSON.stringify(body) };

    const response = noRetry
      ? await fetchWithTimeout(url, fetchOptions, timeout ?? REQUEST_TIMEOUT)
      : await fetchWithRetry(url, fetchOptions, MAX_RETRIES, timeout ?? REQUEST_TIMEOUT);

    return handleResponse<T>(response);
  },

  /** DELETE request. */
  async delete<T = void>(path: string, options: RequestOptions = {}): Promise<T> {
    const { params, noRetry, noAuth, timeout, ...rest } = options;
    const url = buildUrl(path, params);
    const headers = { ...getDefaultHeaders(noAuth), ...rest.headers };
    const fetchOptions: RequestInit = { ...rest, method: "DELETE", headers };

    const response = noRetry
      ? await fetchWithTimeout(url, fetchOptions, timeout ?? REQUEST_TIMEOUT)
      : await fetchWithRetry(url, fetchOptions, MAX_RETRIES, timeout ?? REQUEST_TIMEOUT);

    return handleResponse<T>(response);
  },
} as const;
