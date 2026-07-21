export type DividerAlignment = "left" | "center" | "right";

export interface DividerProps {
  label?: string;
  alignment?: DividerAlignment;
  className?: string;
}

/**
 * Horizontal rule with optional inline label.
 *
 * @example
 * <Divider />
 * <Divider label="or" />
 * <Divider label="Section title" alignment="left" />
 */
export function Divider({ label, alignment = "center", className = "" }: DividerProps) {
  if (!label) {
    return (
      <hr className={`border-t border-zinc-200 dark:border-[#2D3640] ${className}`} />
    );
  }

  const justifyMap: Record<DividerAlignment, string> = {
    left:   "justify-start",
    center: "justify-center",
    right:  "justify-end",
  };

  return (
    <div className={`relative flex items-center ${className}`}>
      <div className="flex-1 border-t border-zinc-200 dark:border-[#2D3640]" />
      <span
        className={[
          "mx-3 shrink-0 text-xs font-medium text-zinc-400 dark:text-[#64748B]",
          justifyMap[alignment],
        ].join(" ")}
      >
        {label}
      </span>
      {alignment !== "right" && (
        <div className="flex-1 border-t border-zinc-200 dark:border-[#2D3640]" />
      )}
      {alignment === "right" && (
        <div className="w-4 border-t border-zinc-200 dark:border-[#2D3640]" />
      )}
    </div>
  );
}
