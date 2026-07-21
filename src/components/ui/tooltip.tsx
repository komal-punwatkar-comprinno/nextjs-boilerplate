export type TooltipPlacement = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  content: string;
  placement?: TooltipPlacement;
  children: React.ReactNode;
  className?: string;
}

const placementMap: Record<TooltipPlacement, { wrapper: string; tip: string; arrow: string }> = {
  top: {
    wrapper: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    tip:     "",
    arrow:   "absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#0f172a]",
  },
  bottom: {
    wrapper: "top-full left-1/2 -translate-x-1/2 mt-2",
    tip:     "",
    arrow:   "absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-[#0f172a]",
  },
  left: {
    wrapper: "right-full top-1/2 -translate-y-1/2 mr-2",
    tip:     "",
    arrow:   "absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-[#0f172a]",
  },
  right: {
    wrapper: "left-full top-1/2 -translate-y-1/2 ml-2",
    tip:     "",
    arrow:   "absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#0f172a]",
  },
};

/**
 * Hover tooltip using CSS group-hover — zero JS.
 *
 * @example
 * <Tooltip content="Delete item" placement="top">
 *   <Button variant="danger">Delete</Button>
 * </Tooltip>
 */
export function Tooltip({ content, placement = "top", children, className = "" }: TooltipProps) {
  const p = placementMap[placement];

  return (
    <div className={`group/tooltip relative inline-flex ${className}`}>
      {children}
      <div
        className={[
          "pointer-events-none absolute z-50 whitespace-nowrap rounded-lg bg-[#0f172a] px-2.5 py-1.5",
          "text-xs font-medium text-white opacity-0 shadow-xl transition-opacity",
          "group-hover/tooltip:opacity-100",
          p.wrapper,
        ].join(" ")}
      >
        {content}
        <span className={p.arrow} />
      </div>
    </div>
  );
}
