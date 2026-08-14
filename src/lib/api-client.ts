import type { ApiError } from "@/types/api";

/** Options accepted by every request method. */
export interface RequestOptions extends Omit<RequestInit, "method" | "body"> {
  /** Query-string parameters appended to the URL. */
  params?: Record<string, string | number | boolean | undefined | null>;
}

/**
 * Builds a URL from a base path and optional query-string parameters,
 * omitting keys whose value is `undefined` or `null`.
 */
function buildUrl(
  base: string,
  params?: RequestOptions["params"]
): string {
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

/**
 * Parses the response body and throws a typed `ApiError` on non-2xx status.
 */
async function handleResponse<T>(response: Response): Promise<T> {
  // Attempt to parse JSON regardless of status so error bodies are captured.
  let body: unknown;
  try {
    body = await response.json();
  } catch {
    body = null;
  }

  if (!response.ok) {
    const apiError: ApiError = {
      message:
        (body as { message?: string })?.message ?? response.statusText,
      status: response.status,
      code: (body as { code?: string })?.code,
      details: (body as { details?: Record<string, string | string[]> })
        ?.details,
    };
    throw apiError;
  }

  return body as T;
}

/**
 * Returns the default headers used for every request.
 * The Authorization header is set when a bearer token is available in
 * localStorage — this is safe because the client only runs in the browser.
 */
function defaultHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("access_token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return headers;
}

/**
 * Centralized API client.
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
    const { params, ...rest } = options;
    const url = buildUrl(path, params);
    const response = await fetch(url, {
      ...rest,
      method: "GET",
      headers: { ...defaultHeaders(), ...rest.headers },
    });
    return handleResponse<T>(response);
  },

  /** POST request. */
  async post<T>(
    path: string,
    body: unknown,
    options: RequestOptions = {}
  ): Promise<T> {
    const { params, ...rest } = options;
    const url = buildUrl(path, params);
    const response = await fetch(url, {
      ...rest,
      method: "POST",
      headers: { ...defaultHeaders(), ...rest.headers },
      body: JSON.stringify(body),
    });
    return handleResponse<T>(response);
  },

  /** PUT request (full replacement). */
  async put<T>(
    path: string,
    body: unknown,
    options: RequestOptions = {}
  ): Promise<T> {
    const { params, ...rest } = options;
    const url = buildUrl(path, params);
    const response = await fetch(url, {
      ...rest,
      method: "PUT",
      headers: { ...defaultHeaders(), ...rest.headers },
      body: JSON.stringify(body),
    });
    return handleResponse<T>(response);
  },

  /** PATCH request (partial update). */
  async patch<T>(
    path: string,
    body: unknown,
    options: RequestOptions = {}
  ): Promise<T> {
    const { params, ...rest } = options;
    const url = buildUrl(path, params);
    const response = await fetch(url, {
      ...rest,
      method: "PATCH",
      headers: { ...defaultHeaders(), ...rest.headers },
      body: JSON.stringify(body),
    });
    return handleResponse<T>(response);
  },

  /** DELETE request. */
  async delete<T = void>(
    path: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { params, ...rest } = options;
    const url = buildUrl(path, params);
    const response = await fetch(url, {
      ...rest,
      method: "DELETE",
      headers: { ...defaultHeaders(), ...rest.headers },
    });
    return handleResponse<T>(response);
  },
} as const;
