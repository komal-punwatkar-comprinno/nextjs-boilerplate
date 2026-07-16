"use client";

export interface PaginationProps {
  /** Current active page (1-based). */
  page: number;
  /** Total number of pages. */
  totalPages: number;
  /** Called with the new page number when user navigates. */
  onPageChange: (page: number) => void;
  /** How many page buttons to show around the current page. Defaults to 1. */
  siblingCount?: number;
}

/**
 * Generates the page number array including ellipsis markers.
 * Returns a mix of numbers and the string "..." for gaps.
 */
function buildRange(
  current: number,
  total: number,
  siblings: number
): (number | "...")[] {
  const delta = siblings + 2; // siblings on each side + first/last pages

  if (total <= delta * 2 + 1) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const range: (number | "...")[] = [];
  const left = Math.max(2, current - siblings);
  const right = Math.min(total - 1, current + siblings);

  range.push(1);
  if (left > 2) range.push("...");
  for (let i = left; i <= right; i++) range.push(i);
  if (right < total - 1) range.push("...");
  range.push(total);

  return range;
}

/**
 * Page navigation control. Renders numbered page buttons with prev/next arrows
 * and ellipsis for large page counts.
 *
 * @example
 * const { page, setPage } = usePagination({ totalItems: 200, pageSize: 20 });
 * <Pagination page={page} totalPages={10} onPageChange={setPage} />
 */
export function Pagination({
  page,
  totalPages,
  onPageChange,
  siblingCount = 1,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = buildRange(page, totalPages, siblingCount);

  const btnBase =
    "inline-flex h-8 min-w-[2rem] items-center justify-center rounded-md px-2 text-sm font-medium transition-colors";
  const btnActive =
    "bg-[#4CCBBF] text-[#1F2937] dark:bg-[#4CCBBF] dark:text-[#1F2937]";
  const btnInactive =
    "border border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50 " +
    "dark:border-[#3D4A5C] dark:bg-[#2A3441] dark:text-[#9FAEC1] dark:hover:bg-[#353B46] dark:hover:text-[#E8EDF2]";
  const btnDisabled = "pointer-events-none opacity-40";

  return (
    <nav aria-label="Pagination" className="flex items-center gap-1">
      {/* Previous */}
      <button
        type="button"
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className={[btnBase, btnInactive, page <= 1 ? btnDisabled : ""].join(
          " "
        )}
      >
        ‹
      </button>

      {/* Page numbers */}
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="px-1 text-zinc-400 dark:text-[#9FAEC1]/60 select-none">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            aria-label={`Page ${p}`}
            aria-current={p === page ? "page" : undefined}
            onClick={() => onPageChange(p)}
            className={[btnBase, p === page ? btnActive : btnInactive].join(
              " "
            )}
          >
            {p}
          </button>
        )
      )}

      {/* Next */}
      <button
        type="button"
        aria-label="Next page"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className={[
          btnBase,
          btnInactive,
          page >= totalPages ? btnDisabled : "",
        ].join(" ")}
      >
        ›
      </button>
    </nav>
  );
}

