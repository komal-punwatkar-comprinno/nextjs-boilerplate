"use client";

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
  trend?: "up" | "down";
  className?: string;
}

/**
 * Statistics card for dashboard metrics — shows title, value, and optional change indicator.
 */
export function StatCard({
  title,
  value,
  change,
  icon,
  trend,
  className = "",
}: StatCardProps) {
  const isPositive = trend === "up" || (change !== undefined && change > 0);
  const isNegative = trend === "down" || (change !== undefined && change < 0);

  return (
    <div
      className={[
        "rounded-xl border border-zinc-200 bg-white p-5",
        "dark:border-[#2D3640] dark:bg-[#242B33]",
        className,
      ].join(" ")}
    >
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-zinc-500 dark:text-[#9FAEC1]">{title}</p>
          <p className="mt-1 text-2xl font-bold text-zinc-900 dark:text-[#E8EDF2]">{value}</p>
        </div>
        {icon && (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 dark:bg-[#2A3441] dark:text-[#9FAEC1]">
            {icon}
          </div>
        )}
      </div>

      {change !== undefined && (
        <div className="mt-3 flex items-center gap-1">
          {/* Trend arrow */}
          <svg
            className={[
              "h-4 w-4",
              isPositive ? "text-emerald-500" : "",
              isNegative ? "text-[#ED495D]" : "",
              !isPositive && !isNegative ? "text-zinc-400" : "",
            ].join(" ")}
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            {isNegative ? (
              <path d="M8 10l4-4H4l4 4z" />
            ) : (
              <path d="M8 6l4 4H4l4-4z" />
            )}
          </svg>
          <span
            className={[
              "text-xs font-medium",
              isPositive ? "text-emerald-600 dark:text-emerald-400" : "",
              isNegative ? "text-[#ED495D]" : "",
              !isPositive && !isNegative ? "text-zinc-500 dark:text-[#9FAEC1]" : "",
            ].join(" ")}
          >
            {Math.abs(change)}%
          </span>
          <span className="text-xs text-zinc-400 dark:text-[#9FAEC1]">vs last period</span>
        </div>
      )}
    </div>
  );
}
