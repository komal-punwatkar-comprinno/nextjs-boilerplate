/** Standard shape exposed by the application service layer for successful API calls. */
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

/** Pagination details normalized by the application service layer. */
export interface PaginationMeta {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

/** A paginated response exposed by list services. */
export type PaginatedResponse<T> = ApiResponse<T[]> & {
  meta: PaginationMeta;
};

/** Error shape exposed by the application service layer. */
export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: Record<string, string | string[]>;
}
