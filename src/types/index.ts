/**
 * Barrel file for shared TypeScript types.
 *
 * Re-export from here so consumers can import from `@/types`.
 */
export type {
  AuthUser,
  AuthSession,
  LoginCredentials,
} from "./auth";

export type {
  ApiResponse,
  PaginationMeta,
  PaginatedResponse,
  ApiError,
} from "./api";
