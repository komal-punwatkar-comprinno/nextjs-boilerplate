"use client";

import { useState, useRef, useEffect } from "react";

export interface DropdownItem {
  id: string;
  label: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  danger?: boolean;
  disabled?: boolean;
}

export interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  placement?: "bottom-start" | "bottom-end";
  className?: string;
}

/**
 * Click-triggered dropdown menu.
 *
 * @example
 * <Dropdown
 *   trigger={<Button variant="secondary">Actions ▾</Button>}
 *   items={[
 *     { id: "edit",   label: "Edit",   onClick: () => {} },
 *     { id: "delete", label: "Delete", onClick: () => {}, danger: true },
 *   ]}
 * />
 */
export function Dropdown({ trigger, items, placement = "bottom-start", className = "" }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const menuAlign = placement === "bottom-end" ? "right-0" : "left-0";

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      <div onClick={() => setOpen((v) => !v)} className="cursor-pointer">
        {trigger}
      </div>
      {open && (
        <div
          className={[
            "absolute z-50 mt-1 min-w-[10rem] rounded-lg border border-zinc-200 bg-white py-1 shadow-lg",
            "dark:border-[#2D3640] dark:bg-[#242B33]",
            menuAlign,
          ].join(" ")}
        >
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              disabled={item.disabled}
              onClick={() => {
                item.onClick?.();
                setOpen(false);
              }}
              className={[
                "flex w-full items-center gap-2.5 px-4 py-2 text-left text-sm transition-colors",
                "disabled:pointer-events-none disabled:opacity-40",
                item.danger
                  ? "text-red-600 hover:bg-red-50 dark:text-[#ED495D] dark:hover:bg-[#ED495D]/10"
                  : "text-zinc-700 hover:bg-zinc-50 dark:text-[#9FAEC1] dark:hover:bg-[#2D3640]",
              ].join(" ")}
            >
              {item.icon && <span className="shrink-0">{item.icon}</span>}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
