"use client";

export interface StickyBlockProps {
  offset?: number;
  className?: string;
  children: React.ReactNode;
}

/**
 * Makes children sticky within a scrollable parent container.
 */
export function StickyBlock({ offset = 0, className = "", children }: StickyBlockProps) {
  return (
    <div
      className={["sticky", className].join(" ")}
      style={{ top: `${offset}px` }}
    >
      {children}
    </div>
  );
}
