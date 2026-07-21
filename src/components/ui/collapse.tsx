"use client";
  
  import { useState, useRef, useEffect } from "react";
  
  export interface CollapseProps {
    /** The clickable trigger label. */
    label: string;
    /** Content revealed when open. */
    children: React.ReactNode;
    /** Start open. Defaults to false. */
    defaultOpen?: boolean;
    className?: string;
  }
  
  /**
   * Single collapsible panel with smooth height animation.
   *
   * @example
   * <Collapse label="Show details">
   *   <p>Hidden content here.</p>
   * </Collapse>
   */
  export function Collapse({ label, children, defaultOpen = false, className = "" }: CollapseProps) {
    const [open, setOpen] = useState(defaultOpen);
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<number | undefined>(defaultOpen ? undefined : 0);
  
    useEffect(() => {
      if (!contentRef.current) return;
      if (open) {
        setHeight(contentRef.current.scrollHeight);
        const t = setTimeout(() => setHeight(undefined), 300);
        return () => clearTimeout(t);
      } else {
        setHeight(contentRef.current.scrollHeight);
        requestAnimationFrame(() => requestAnimationFrame(() => setHeight(0)));
      }
    }, [open]);
  
    return (
      <div className={`rounded-lg border border-zinc-200 dark:border-[#2D3640] ${className}`}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-50 dark:text-[#E2E8F0] dark:hover:bg-[#252D3A]"
        >
          <span>{label}</span>
          <svg
            className={`h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-200 dark:text-[#64748B] ${open ? "rotate-180" : ""}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div
          ref={contentRef}
          style={{ height: height === undefined ? "auto" : `${height}px` }}
          className="overflow-hidden transition-[height] duration-300 ease-in-out"
        >
          <div className="border-t border-zinc-200 px-4 py-3 text-sm text-zinc-600 dark:border-[#2D3640] dark:text-[#9FAEC1]">
            {children}
          </div>
        </div>
      </div>
    );
  }
