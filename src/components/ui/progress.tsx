export type ProgressSize = "sm" | "md" | "lg";

export interface ProgressProps {
  value: number;
  color?: string;
  size?: ProgressSize;
  striped?: boolean;
  animated?: boolean;
  className?: string;
}

const sizeMap: Record<ProgressSize, string> = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
};

/**
 * Horizontal progress bar.
 *
 * @example
 * <Progress value={75} />
 * <Progress value={40} color="bg-[#ED495D]" striped animated size="md" />
 */
export function Progress({
  value,
  color = "bg-[#4CCBBF]",
  size = "md",
  striped = false,
  animated = false,
  className = "",
}: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, value));

  const stripeClass = striped
    ? "bg-[length:1rem_1rem] bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)]"
    : "";

  const animateClass = animated ? "animate-[progress-bar-stripes_1s_linear_infinite]" : "";

  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      className={[
        "w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-[#2D3640]",
        sizeMap[size],
        className,
      ].join(" ")}
    >
      <div
        className={["h-full rounded-full transition-all duration-500", color, stripeClass, animateClass].join(" ")}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
