"use client";

import { useState, useCallback } from "react";
import { useDebounce } from "@/hooks/use-debounce";

export interface UseSearchReturn {
  /** Raw value from the input (updates immediately). */
  query: string;
  /** Debounced value to use for API calls. */
  debouncedQuery: string;
  /** Update the search query. */
  setQuery: (value: string) => void;
  /** Reset the query to empty string. */
  clearQuery: () => void;
}

/**
 * Manages a search input's state with built-in debouncing.
 *
 * Use `query` to control the input value and `debouncedQuery` to trigger
 * API calls — the debounced value only updates after `delay` ms of inactivity.
 *
 * @example
 * const { query, debouncedQuery, setQuery, clearQuery } = useSearch();
 *
 * useEffect(() => {
 *   if (debouncedQuery) fetchUsers(debouncedQuery);
 * }, [debouncedQuery]);
 *
 * return <Input value={query} onChange={(e) => setQuery(e.target.value)} />;
 */
export function useSearch(initialQuery = "", delay = 300): UseSearchReturn {
  const [query, setQueryState] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, delay);

  const setQuery = useCallback((value: string) => {
    setQueryState(value);
  }, []);

  const clearQuery = useCallback(() => {
    setQueryState("");
  }, []);

  return { query, debouncedQuery, setQuery, clearQuery };
}
