"use client";

import { useState } from "react";

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  defaultTab?: string;
  className?: string;
}

/**
 * Tabbed content panels with ARIA support.
 *
 * @example
 * <Tabs
 *   items={[
 *     { id: "tab1", label: "Overview",  content: <p>Overview content</p> },
 *     { id: "tab2", label: "Analytics", content: <p>Analytics content</p> },
 *   ]}
 * />
 */
export function Tabs({ items, defaultTab, className = "" }: TabsProps) {
  const [active, setActive] = useState(defaultTab ?? items[0]?.id ?? "");

  const activeItem = items.find((t) => t.id === active);

  return (
    <div className={className}>
      {/* Tab list */}
      <div
        role="tablist"
        className="flex border-b border-zinc-200 dark:border-[#2D3640]"
      >
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <button
              key={item.id}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={`panel-${item.id}`}
              id={`tab-${item.id}`}
              onClick={() => setActive(item.id)}
              className={[
                "px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px",
                isActive
                  ? "border-[#4CCBBF] text-[#4CCBBF]"
                  : "border-transparent text-zinc-500 hover:text-zinc-700 dark:text-[#64748B] dark:hover:text-[#E2E8F0]",
              ].join(" ")}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Tab panel */}
      {activeItem && (
        <div
          role="tabpanel"
          id={`panel-${activeItem.id}`}
          aria-labelledby={`tab-${activeItem.id}`}
          className="pt-4"
        >
          {activeItem.content}
        </div>
      )}
    </div>
  );
}
