import { apiClient, type RequestOptions } from "@/lib/api-client";
import type { ApiResponse, PaginatedResponse } from "@/types/api";

/**
 * Base service class.
 *
 * Feature services should extend this class and inject the resource base path.
 * All HTTP methods delegate to `apiClient` so there is a single network entry
 * point in the application.
 *
 * @example
 * class UserService extends BaseService {
 *   constructor() { super("/users"); }
 *
 *   async getById(id: string) {
 *     return this.getOne<User>(`/${id}`);
 *   }
 * }
 */
export abstract class BaseService {
  protected readonly basePath: string;

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  /** Resolve a sub-path against the service base path. */
  protected url(subPath = ""): string {
    return `${this.basePath}${subPath}`;
  }

  // ─── Convenience wrappers ────────────────────────────────────────────────

  protected async getList<T>(
    subPath = "",
    options?: RequestOptions
  ): Promise<PaginatedResponse<T>> {
    return apiClient.get<PaginatedResponse<T>>(this.url(subPath), options);
  }

  protected async getOne<T>(
    subPath = "",
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return apiClient.get<ApiResponse<T>>(this.url(subPath), options);
  }

  protected async create<T>(
    body: unknown,
    subPath = "",
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return apiClient.post<ApiResponse<T>>(this.url(subPath), body, options);
  }

  protected async replace<T>(
    body: unknown,
    subPath = "",
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return apiClient.put<ApiResponse<T>>(this.url(subPath), body, options);
  }

  protected async update<T>(
    body: unknown,
    subPath = "",
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return apiClient.patch<ApiResponse<T>>(this.url(subPath), body, options);
  }

  protected async remove<T = void>(
    subPath = "",
    options?: RequestOptions
  ): Promise<T> {
    return apiClient.delete<T>(this.url(subPath), options);
  }
}
