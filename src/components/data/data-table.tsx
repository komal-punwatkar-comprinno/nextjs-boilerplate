"use client";

import { useState } from "react";

export interface DataTableColumn<T = Record<string, unknown>> {
  accessor: string;
  header: string;
  sortable?: boolean;
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
}

export interface DataTablePagination {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
}

export interface DataTableProps<T = Record<string, unknown>> {
  columns: DataTableColumn<T>[];
  data: T[];
  pagination?: DataTablePagination;
  onSort?: (accessor: string, direction: "asc" | "desc") => void;
  onRowClick?: (row: T, index: number) => void;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
}

/**
 * Full-featured data table with sortable headers, loading skeleton, and pagination.
 */
export function DataTable<T = Record<string, unknown>>({
  columns,
  data,
  pagination,
  onSort,
  onRowClick,
  loading = false,
  emptyMessage = "No data available",
  className = "",
}: DataTableProps<T>) {
  const [sortCol, setSortCol] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  function handleSort(accessor: string) {
    const newDir = sortCol === accessor && sortDir === "asc" ? "desc" : "asc";
    setSortCol(accessor);
    setSortDir(newDir);
    onSort?.(accessor, newDir);
  }

  function getValue(row: T, accessor: string): unknown {
    return (row as Record<string, unknown>)[accessor];
  }

  const totalPages = pagination
    ? Math.ceil(pagination.total / pagination.pageSize)
    : 0;

  return (
    <div
      className={[
        "w-full overflow-hidden rounded-xl border border-zinc-200 bg-white",
        "dark:border-[#2D3640] dark:bg-[#242B33]",
        className,
      ].join(" ")}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-100 bg-zinc-50 dark:border-[#2D3640] dark:bg-[#2A3441]">
              {columns.map((col) => (
                <th
                  key={col.accessor}
                  className={[
                    "whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-500",
                    "dark:text-[#9FAEC1]",
                    col.sortable ? "cursor-pointer select-none hover:text-zinc-900 dark:hover:text-[#E8EDF2]" : "",
                  ].join(" ")}
                  onClick={() => col.sortable && handleSort(col.accessor)}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.header}
                    {col.sortable && sortCol === col.accessor && (
                      <svg
                        className={["h-3 w-3 transition-transform", sortDir === "desc" ? "rotate-180" : ""].join(" ")}
                        viewBox="0 0 12 12"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M6 2l4 5H2l4-5z" />
                      </svg>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={`skeleton-${i}`} className="border-b border-zinc-50 dark:border-[#2D3640]">
                    {columns.map((col) => (
                      <td key={col.accessor} className="px-4 py-3">
                        <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-200 dark:bg-[#3D4A5C]" />
                      </td>
                    ))}
                  </tr>
                ))
              : data.length === 0
                ? (
                    <tr>
                      <td
                        colSpan={columns.length}
                        className="px-4 py-12 text-center text-zinc-400 dark:text-[#9FAEC1]"
                      >
                        {emptyMessage}
                      </td>
                    </tr>
                  )
                : data.map((row, rowIdx) => (
                    <tr
                      key={rowIdx}
                      onClick={() => onRowClick?.(row, rowIdx)}
                      className={[
                        "border-b border-zinc-50 transition-colors dark:border-[#2D3640]",
                        onRowClick ? "cursor-pointer hover:bg-zinc-50 dark:hover:bg-[#2A3441]" : "",
                      ].join(" ")}
                    >
                      {columns.map((col) => (
                        <td
                          key={col.accessor}
                          className="whitespace-nowrap px-4 py-3 text-zinc-700 dark:text-[#E8EDF2]"
                        >
                          {col.render
                            ? col.render(getValue(row, col.accessor), row, rowIdx)
                            : String(getValue(row, col.accessor) ?? "")}
                        </td>
                      ))}
                    </tr>
                  ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-zinc-100 px-4 py-3 dark:border-[#2D3640]">
          <span className="text-xs text-zinc-500 dark:text-[#9FAEC1]">
            Page {pagination.page} of {totalPages}
          </span>
          <div className="flex gap-1">
            <button
              type="button"
              disabled={pagination.page <= 1}
              onClick={() => pagination.onPageChange(pagination.page - 1)}
              className="rounded px-2 py-1 text-xs font-medium text-zinc-600 hover:bg-zinc-100 disabled:opacity-40 dark:text-[#9FAEC1] dark:hover:bg-[#2A3441]"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={pagination.page >= totalPages}
              onClick={() => pagination.onPageChange(pagination.page + 1)}
              className="rounded px-2 py-1 text-xs font-medium text-zinc-600 hover:bg-zinc-100 disabled:opacity-40 dark:text-[#9FAEC1] dark:hover:bg-[#2A3441]"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
