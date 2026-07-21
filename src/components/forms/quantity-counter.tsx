"use client";

import { forwardRef, useCallback } from "react";
import { cn } from "@/lib/utils";

export interface QuantityCounterProps {
  /** Current value. */
  value?: number;
  /** Change handler. */
  onChange?: (value: number) => void;
  /** Minimum value. */
  min?: number;
  /** Maximum value. */
  max?: number;
  /** Step increment/decrement. */
  step?: number;
  /** Disabled state. */
  disabled?: boolean;
  /** Error styling. */
  error?: boolean;
  /** Additional className. */
  className?: string;
  /** Field name for form integration. */
  name?: string;
}

export const QuantityCounter = forwardRef<HTMLDivElement, QuantityCounterProps>(
  function QuantityCounter(
    {
      value = 0,
      onChange,
      min = 0,
      max = Infinity,
      step = 1,
      disabled = false,
      error = false,
      className,
      name,
    },
    ref
  ) {
    const clamp = useCallback(
      (val: number) => Math.min(max, Math.max(min, val)),
      [min, max]
    );

    const decrement = () => {
      if (disabled) return;
      const next = clamp(value - step);
      onChange?.(next);
    };

    const increment = () => {
      if (disabled) return;
      const next = clamp(value + step);
      onChange?.(next);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const parsed = parseFloat(e.target.value);
      if (!isNaN(parsed)) {
        onChange?.(clamp(parsed));
      }
    };

    const canDecrement = value > min && !disabled;
    const canIncrement = value < max && !disabled;

    return (
      <div ref={ref} className={cn("inline-flex items-center", className)}>
        {name && <input type="hidden" name={name} value={value} />}

        {/* Decrement button */}
        <button
          type="button"
          onClick={decrement}
          disabled={!canDecrement}
          aria-label="Decrease"
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-l-md border transition-colors",
            "bg-white text-zinc-700 dark:bg-[#2A3441] dark:text-[#E8EDF2]",
            "hover:bg-zinc-100 dark:hover:bg-[#3D4A5C]",
            error ? "border-red-500" : "border-zinc-300 dark:border-[#2D3640]",
            !canDecrement && "cursor-not-allowed opacity-50"
          )}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path fillRule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Value display / input */}
        <input
          type="number"
          value={value}
          onChange={handleInputChange}
          min={min}
          max={max === Infinity ? undefined : max}
          step={step}
          disabled={disabled}
          className={cn(
            "h-9 w-14 border-y text-center text-sm font-medium outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
            "bg-white text-zinc-900 dark:bg-[#2D3640] dark:text-[#E8EDF2]",
            error ? "border-red-500" : "border-zinc-300 dark:border-[#2D3640]",
            disabled && "cursor-not-allowed opacity-50"
          )}
        />

        {/* Increment button */}
        <button
          type="button"
          onClick={increment}
          disabled={!canIncrement}
          aria-label="Increase"
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-r-md border transition-colors",
            "bg-white text-zinc-700 dark:bg-[#2A3441] dark:text-[#E8EDF2]",
            "hover:bg-zinc-100 dark:hover:bg-[#3D4A5C]",
            error ? "border-red-500" : "border-zinc-300 dark:border-[#2D3640]",
            !canIncrement && "cursor-not-allowed opacity-50"
          )}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
          </svg>
        </button>
      </div>
    );
  }
);
