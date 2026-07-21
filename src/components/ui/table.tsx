"use client";

import { cn } from "@/lib/utils";

/* ─── Table Root ─── */
export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  striped?: boolean;
}

function TableRoot({ striped, className, children, ...props }: TableProps) {
  return (
    <div className="w-full overflow-x-auto rounded-md border border-zinc-200 dark:border-[#2D3640]">
      <table
        className={cn(
          "w-full text-sm",
          striped && "[&_tbody_tr:nth-child(even)]:bg-zinc-50 dark:[&_tbody_tr:nth-child(even)]:bg-[#2A3441]",
          className
        )}
        {...props}
      >
        {children}
      </table>
    </div>
  );
}

/* ─── Head ─── */
export interface TableHeadProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

function Head({ className, children, ...props }: TableHeadProps) {
  return (
    <thead
      className={cn(
        "border-b border-zinc-200 bg-zinc-50 text-left",
        "dark:border-[#2D3640] dark:bg-[#2A3441]",
        className
      )}
      {...props}
    >
      {children}
    </thead>
  );
}

/* ─── Body ─── */
export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

function Body({ className, children, ...props }: TableBodyProps) {
  return (
    <tbody className={cn("divide-y divide-zinc-200 dark:divide-[#2D3640]", className)} {...props}>
      {children}
    </tbody>
  );
}

/* ─── Row ─── */
export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {}

function Row({ className, children, ...props }: TableRowProps) {
  return (
    <tr
      className={cn(
        "transition-colors hover:bg-zinc-50 dark:hover:bg-[#2A3441]",
        className
      )}
      {...props}
    >
      {children}
    </tr>
  );
}

/* ─── HeaderCell ─── */
export interface TableHeaderCellProps extends React.ThHTMLAttributes<HTMLTableCellElement> {}

function HeaderCell({ className, children, ...props }: TableHeaderCellProps) {
  return (
    <th
      className={cn(
        "px-4 py-3 text-xs font-semibold uppercase tracking-wide",
        "text-zinc-500 dark:text-[#9FAEC1]",
        className
      )}
      {...props}
    >
      {children}
    </th>
  );
}

/* ─── Cell ─── */
export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {}

function Cell({ className, children, ...props }: TableCellProps) {
  return (
    <td
      className={cn(
        "px-4 py-3 text-zinc-700 dark:text-[#E8EDF2]",
        className
      )}
      {...props}
    >
      {children}
    </td>
  );
}

/* ─── Compound Export ─── */
export const Table = Object.assign(TableRoot, {
  Head,
  Body,
  Row,
  HeaderCell,
  Cell,
});
