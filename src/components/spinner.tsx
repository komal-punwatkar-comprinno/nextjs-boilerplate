export type SpinnerSize = "sm" | "md" | "lg";

export interface SpinnerProps {
  size?: SpinnerSize;
  /** Screen-reader label. Defaults to "Loading…" */
  label?: string;
  className?: string;
}

const sizeClasses: Record<SpinnerSize, string> = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-10 w-10 border-4",
};

/**
 * Circular loading spinner.
 *
 * @example
 * <Spinner size="lg" label="Loading users…" />
 */
export function Spinner({
  size = "md",
  label = "Loading…",
  className = "",
}: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={`inline-block animate-spin rounded-full border-zinc-300 border-t-zinc-700 ${sizeClasses[size]} ${className}`}
    />
  );
}

