"use client";

import { forwardRef, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ label, error, indeterminate, disabled, className, id, ...props }, ref) {
    const internalRef = useRef<HTMLInputElement | null>(null);
    const checkboxId = id ?? `checkbox-${label?.toLowerCase().replace(/\s+/g, "-") ?? "default"}`;

    useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = indeterminate ?? false;
      }
    }, [indeterminate]);

    return (
      <div className="flex flex-col gap-1">
        <label
          htmlFor={checkboxId}
          className={cn(
            "inline-flex items-center gap-2 text-sm select-none",
            disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          )}
        >
          <span className="relative inline-flex items-center justify-center">
            <input
              ref={(node) => {
                internalRef.current = node;
                if (typeof ref === "function") ref(node);
                else if (ref) ref.current = node;
              }}
              type="checkbox"
              id={checkboxId}
              disabled={disabled}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? `${checkboxId}-error` : undefined}
              className="peer sr-only"
              {...props}
            />
            <span
              className={cn(
                "flex h-4 w-4 items-center justify-center rounded border transition-all duration-150",
                "bg-white dark:bg-[#2D3640]",
                error
                  ? "border-red-500 dark:border-red-400"
                  : "border-zinc-300 dark:border-[#3D4A5C]",
                "peer-focus-visible:ring-2 peer-focus-visible:ring-offset-1 peer-focus-visible:ring-zinc-900 dark:peer-focus-visible:ring-[#4CCBBF] dark:peer-focus-visible:ring-offset-[#242B33]",
                "peer-checked:bg-zinc-900 peer-checked:border-zinc-900 dark:peer-checked:bg-[#4CCBBF] dark:peer-checked:border-[#4CCBBF]",
                "peer-indeterminate:bg-zinc-900 peer-indeterminate:border-zinc-900 dark:peer-indeterminate:bg-[#4CCBBF] dark:peer-indeterminate:border-[#4CCBBF]"
              )}
              aria-hidden="true"
            >
              {/* Checkmark */}
              <svg
                className="h-3 w-3 text-white dark:text-[#1F2937] opacity-0 transition-opacity duration-150 peer-checked:opacity-100 [input:checked~span>&]:opacity-100 [input:indeterminate~span>&]:opacity-0"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2.5 6.5L5 9l4.5-6" />
              </svg>
              {/* Indeterminate dash */}
              <svg
                className="absolute h-3 w-3 text-white dark:text-[#1F2937] opacity-0 transition-opacity duration-150 [input:indeterminate~span>&]:opacity-100"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M3 6h6" />
              </svg>
            </span>
          </span>
          {label && (
            <span className="text-zinc-700 dark:text-[#E8EDF2]">{label}</span>
          )}
        </label>
        {error && (
          <p id={`${checkboxId}-error`} role="alert" className="text-xs text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  }
);
