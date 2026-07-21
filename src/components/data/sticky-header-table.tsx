"use client";

export interface StickyHeaderColumn<T = Record<string, unknown>> {
  accessor: string;
  header: string;
  width?: string;
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
}

export interface StickyHeaderTableProps<T = Record<string, unknown>> {
  columns: StickyHeaderColumn<T>[];
  data: T[];
  maxHeight?: string;
  onRowClick?: (row: T, index: number) => void;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
}

/**
 * Table variant with a sticky header that stays fixed during vertical scroll.
 */
export function StickyHeaderTable<T = Record<string, unknown>>({
  columns,
  data,
  maxHeight = "400px",
  onRowClick,
  loading = false,
  emptyMessage = "No data available",
  className = "",
}: StickyHeaderTableProps<T>) {
  function getValue(row: T, accessor: string): unknown {
    return (row as Record<string, unknown>)[accessor];
  }

  return (
    <div
      className={[
        "w-full overflow-hidden rounded-xl border border-zinc-200 bg-white",
        "dark:border-[#2D3640] dark:bg-[#242B33]",
        className,
      ].join(" ")}
    >
      <div className="overflow-auto" style={{ maxHeight }}>
        <table className="w-full text-left text-sm">
          <thead className="sticky top-0 z-10">
            <tr className="border-b border-zinc-100 bg-zinc-50 dark:border-[#2D3640] dark:bg-[#2A3441]">
              {columns.map((col) => (
                <th
                  key={col.accessor}
                  style={col.width ? { width: col.width } : undefined}
                  className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-[#9FAEC1]"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
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
    </div>
  );
}
