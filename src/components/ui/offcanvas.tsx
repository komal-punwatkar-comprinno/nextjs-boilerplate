"use client";

import { useEffect } from "react";

export type OffcanvasPlacement = "left" | "right";

export interface OffcanvasProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  placement?: OffcanvasPlacement;
  className?: string;
}

/**
 * Slide-in drawer overlay.
 *
 * @example
 * <Offcanvas isOpen={open} onClose={() => setOpen(false)} title="Menu" placement="left">
 *   <nav>...</nav>
 * </Offcanvas>
 */
export function Offcanvas({
  isOpen,
  onClose,
  title,
  children,
  placement = "right",
  className = "",
}: OffcanvasProps) {
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const translateClass = placement === "right"
    ? isOpen ? "translate-x-0" : "translate-x-full"
    : isOpen ? "translate-x-0" : "-translate-x-full";

  const positionClass = placement === "right" ? "right-0" : "left-0";

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={[
          "fixed inset-0 z-40 bg-black/50 transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
      />

      {/* Panel */}
      <div
        className={[
          "fixed inset-y-0 z-50 flex w-72 flex-col bg-white shadow-xl transition-transform duration-300 ease-in-out",
          "dark:bg-[#242B33]",
          positionClass,
          translateClass,
          className,
        ].join(" ")}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4 dark:border-[#2D3640]">
          {title && (
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-[#E2E8F0]">{title}</h2>
          )}
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="ml-auto rounded-md p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-[#2D3640] dark:hover:text-[#E2E8F0]"
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
      </div>
    </>
  );
}
