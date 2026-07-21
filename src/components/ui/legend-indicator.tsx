"use client";

import { cn } from "@/lib/utils";

export type LegendIndicatorSize = "sm" | "md" | "lg";

export interface LegendIndicatorProps {
  color: string;
  label: string;
  size?: LegendIndicatorSize;
  className?: string;
}

const sizeClasses: Record<LegendIndicatorSize, { dot: string; text: string }> = {
  sm: { dot: "h-2 w-2", text: "text-xs" },
  md: { dot: "h-2.5 w-2.5", text: "text-sm" },
  lg: { dot: "h-3 w-3", text: "text-base" },
};

export function LegendIndicator({ color, label, size = "md", className }: LegendIndicatorProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        className={cn("rounded-full shrink-0", sizeClasses[size].dot)}
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />
      <span className={cn("text-zinc-700 dark:text-[#E8EDF2]", sizeClasses[size].text)}>
        {label}
      </span>
    </span>
  );
}
