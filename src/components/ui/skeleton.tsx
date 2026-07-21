"use client";

import { cn } from "@/lib/utils";

export type SkeletonVariant = "text" | "circular" | "rectangular";

export interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  className?: string;
}

export function Skeleton({ variant = "text", width, height, className }: SkeletonProps) {
  const style: React.CSSProperties = {
    width: width ?? (variant === "circular" ? height ?? "2.5rem" : "100%"),
    height: height ?? (variant === "text" ? "1rem" : variant === "circular" ? width ?? "2.5rem" : "4rem"),
  };

  return (
    <span
      aria-hidden="true"
      className={cn(
        "block animate-pulse",
        "bg-zinc-200 dark:bg-[#2A3441]",
        variant === "text" && "rounded",
        variant === "circular" && "rounded-full",
        variant === "rectangular" && "rounded-md",
        className
      )}
      style={style}
    />
  );
}
