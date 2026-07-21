"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface MegaMenuItem {
  label: string;
  href: string;
  /** Optional SVG path data for an icon. */
  icon?: string;
  /** Optional short description. */
  description?: string;
}

interface MegaMenuGroup {
  /** Group heading. */
  heading: string;
  items: MegaMenuItem[];
}

interface MegaMenuProps {
  /** Trigger element (e.g. a button or link). */
  trigger: React.ReactNode;
  /** Grouped link items. */
  items: MegaMenuGroup[];
  /** Whether the menu is open. */
  isOpen: boolean;
  /** Toggle handler. */
  onToggle: () => void;
  /** Additional class names for the wrapper. */
  className?: string;
}

/**
 * Full-width dropdown mega menu with grouped links, icons, and descriptions.
 * Animated appearance with slide-down + fade-in.
 *
 * @example
 * <MegaMenu
 *   trigger={<button>Products</button>}
 *   items={[{ heading: "Platform", items: [{ label: "Dashboard", href: "/dashboard" }] }]}
 *   isOpen={open}
 *   onToggle={() => setOpen(!open)}
 * />
 */
export function MegaMenu({
  trigger,
  items,
  isOpen,
  onToggle,
  className,
}: MegaMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onToggle();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onToggle]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onToggle();
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onToggle]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Trigger */}
      <div onClick={onToggle} role="button" aria-expanded={isOpen} tabIndex={0}>
        {trigger}
      </div>

      {/* Dropdown panel */}
      {isOpen && (
        <div
          className={cn(
            "absolute left-0 top-full z-50 mt-2 w-screen max-w-5xl",
            "rounded-xl border border-zinc-200 bg-white p-6 shadow-xl",
            "dark:border-[#3D4A5C] dark:bg-[#2A3441]",
            "animate-in fade-in slide-in-from-top-2 duration-200"
          )}
          role="menu"
        >
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((group) => (
              <div key={group.heading}>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-[#9FAEC1]">
                  {group.heading}
                </h3>
                <ul className="flex flex-col gap-1">
                  {group.items.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className={cn(
                          "flex items-start gap-3 rounded-lg px-3 py-2 transition-colors",
                          "text-zinc-700 hover:bg-zinc-50",
                          "dark:text-[#E8EDF2] dark:hover:bg-[#242B33]"
                        )}
                        role="menuitem"
                      >
                        {item.icon && (
                          <svg
                            className="mt-0.5 h-5 w-5 shrink-0 text-zinc-400 dark:text-[#4CCBBF]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.75}
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d={item.icon}
                            />
                          </svg>
                        )}
                        <div>
                          <span className="text-sm font-medium">{item.label}</span>
                          {item.description && (
                            <p className="mt-0.5 text-xs text-zinc-500 dark:text-[#9FAEC1]">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export type { MegaMenuProps, MegaMenuGroup, MegaMenuItem };
