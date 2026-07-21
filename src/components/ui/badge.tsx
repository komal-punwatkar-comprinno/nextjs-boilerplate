export type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "info";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-zinc-100 text-zinc-700 dark:bg-[#353B46] dark:text-[#9FAEC1]",
  success: "bg-green-100 text-green-700 dark:bg-[#4CCB98]/20 dark:text-[#4CCB98]",
  warning: "bg-amber-100 text-amber-700 dark:bg-[#FCA90B]/20 dark:text-[#FCA90B]",
  danger:  "bg-red-100 text-red-700 dark:bg-[#ED495D]/20 dark:text-[#ED495D]",
  info:    "bg-blue-100 text-blue-700 dark:bg-[#C5E5FF]/15 dark:text-[#C5E5FF]",
};

/**
 * Small inline status / category label.
 *
 * @example
 * <Badge variant="success">Active</Badge>
 * <Badge variant="danger">Suspended</Badge>
 */
export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantClasses[variant],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
