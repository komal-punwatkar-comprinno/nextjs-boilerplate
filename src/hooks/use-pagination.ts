"use client";

import { useState, useCallback, useMemo } from "react";

export interface UsePaginationOptions {
  /** Total number of items across all pages. */
  totalItems: number;
  /** Number of items per page. Defaults to 20. */
  pageSize?: number;
  /** Initial page (1-based). Defaults to 1. */
  initialPage?: number;
}

export interface UsePaginationReturn {
  /** Current page (1-based). */
  page: number;
  /** Items per page. */
  pageSize: number;
  /** Total number of pages. */
  totalPages: number;
  /** Total items count. */
  totalItems: number;
  /** Index of the first item on this page (0-based, useful for slicing arrays). */
  startIndex: number;
  /** Index after the last item on this page (0-based, exclusive). */
  endIndex: number;
  /** Whether a previous page exists. */
  hasPrevPage: boolean;
  /** Whether a next page exists. */
  hasNextPage: boolean;
  /** Navigate to a specific page. */
  setPage: (page: number) => void;
  /** Go to the next page. No-op on the last page. */
  nextPage: () => void;
  /** Go to the previous page. No-op on the first page. */
  prevPage: () => void;
  /** Reset to page 1. */
  reset: () => void;
}

/**
 * All pagination state in one hook. Pair with the `<Pagination>` component.
 *
 * @example
 * const pagination = usePagination({ totalItems: users.length, pageSize: 10 });
 * const visibleUsers = users.slice(pagination.startIndex, pagination.endIndex);
 *
 * return (
 *   <>
 *     <UserTable rows={visibleUsers} />
 *     <Pagination
 *       page={pagination.page}
 *       totalPages={pagination.totalPages}
 *       onPageChange={pagination.setPage}
 *     />
 *   </>
 * );
 */
export function usePagination({
  totalItems,
  pageSize = 20,
  initialPage = 1,
}: UsePaginationOptions): UsePaginationReturn {
  const [page, setPageState] = useState(initialPage);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(totalItems / pageSize)),
    [totalItems, pageSize]
  );

  const clamp = useCallback(
    (p: number) => Math.min(Math.max(1, p), totalPages),
    [totalPages]
  );

  const setPage = useCallback(
    (p: number) => setPageState(clamp(p)),
    [clamp]
  );

  const nextPage = useCallback(
    () => setPageState((p) => clamp(p + 1)),
    [clamp]
  );

  const prevPage = useCallback(
    () => setPageState((p) => clamp(p - 1)),
    [clamp]
  );

  const reset = useCallback(() => setPageState(1), []);

  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  return {
    page,
    pageSize,
    totalPages,
    totalItems,
    startIndex,
    endIndex,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
    setPage,
    nextPage,
    prevPage,
    reset,
  };
}
