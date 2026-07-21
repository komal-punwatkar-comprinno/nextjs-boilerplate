"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

export type PopoverPlacement = "top" | "bottom" | "left" | "right" | "bottom-end";

export interface PopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  placement?: PopoverPlacement;
  className?: string;
}

/**
 * Click-triggered popover with arbitrary content.
 * Renders via portal so it always appears above sidebar/navbar.
 */
export function Popover({ trigger, content, placement = "bottom", className = "" }: PopoverProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const gap = 8;

    let top = 0;
    let left = 0;

    switch (placement) {
      case "top":
        top = rect.top - gap;
        left = rect.left + rect.width / 2;
        break;
      case "bottom":
        top = rect.bottom + gap;
        left = rect.left + rect.width / 2;
        break;
      case "bottom-end":
        top = rect.bottom + gap;
        left = rect.right;
        break;
      case "left":
        top = rect.top + rect.height / 2;
        left = rect.left - gap;
        break;
      case "right":
        top = rect.top + rect.height / 2;
        left = rect.right + gap;
        break;
    }

    setCoords({ top, left });
  }, [placement]);

  useEffect(() => {
    if (open) {
      calculatePosition();
      // Recalculate on scroll/resize
      window.addEventListener("scroll", calculatePosition, true);
      window.addEventListener("resize", calculatePosition);
      return () => {
        window.removeEventListener("scroll", calculatePosition, true);
        window.removeEventListener("resize", calculatePosition);
      };
    }
  }, [open, calculatePosition]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (
        triggerRef.current && !triggerRef.current.contains(e.target as Node) &&
        popoverRef.current && !popoverRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  const transformOrigin: Record<PopoverPlacement, string> = {
    top: "translate(-50%, -100%)",
    bottom: "translate(-50%, 0)",
    "bottom-end": "translate(0, 0)",
    left: "translate(-100%, -50%)",
    right: "translate(0, -50%)",
  };

  // Adjust left for bottom-end (align right edge)
  const getTransform = () => {
    if (placement === "bottom-end") return "translateX(-100%)";
    if (placement === "top") return "translate(-50%, -100%)";
    if (placement === "bottom") return "translate(-50%, 0)";
    if (placement === "left") return "translate(-100%, -50%)";
    if (placement === "right") return "translate(0, -50%)";
    return "";
  };

  return (
    <div ref={triggerRef} className={`relative inline-flex ${className}`}>
      <div onClick={() => setOpen((v) => !v)} className="cursor-pointer">
        {trigger}
      </div>
      {open && mounted && createPortal(
        <div
          ref={popoverRef}
          className="fixed z-[9999] w-64 rounded-lg border border-zinc-200 bg-white p-3 shadow-xl animate-in fade-in zoom-in-95 duration-150 dark:border-[#2D3640] dark:bg-[#242B33]"
          style={{
            top: `${coords.top}px`,
            left: `${coords.left}px`,
            transform: getTransform(),
          }}
        >
          {content}
        </div>,
        document.body
      )}
    </div>
  );
}
