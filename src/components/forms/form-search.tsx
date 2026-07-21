"use client";

import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface FormSearchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "onSubmit" | "type"> {
  /** Called with debounced value. */
  onChange?: (value: string) => void;
  /** Called on form submit (if submitButton is shown). */
  onSubmit?: (value: string) => void;
  /** Debounce delay in ms. */
  debounceMs?: number;
  /** Show a submit button. */
  showSubmitButton?: boolean;
  /** Submit button label. */
  submitLabel?: string;
  /** Error message. */
  error?: string;
  /** Additional className. */
  className?: string;
}

export const FormSearch = forwardRef<HTMLInputElement, FormSearchProps>(
  function FormSearch(
    {
      onChange,
      onSubmit,
      debounceMs = 300,
      showSubmitButton = false,
      submitLabel = "Search",
      error,
      className,
      defaultValue = "",
      ...props
    },
    ref
  ) {
    const [value, setValue] = useState(String(defaultValue));
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          onChange?.(newValue);
        }, debounceMs);
      },
      [onChange, debounceMs]
    );

    const handleClear = () => {
      setValue("");
      onChange?.("");
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      onSubmit?.(value);
    };

    useEffect(() => {
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }, []);

    return (
      <form onSubmit={handleSubmit} className={cn("flex items-center gap-2", className)}>
        <div className="relative flex-1">
          {/* Search icon */}
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-[#9FAEC1]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
            </svg>
          </div>

          <input
            ref={ref}
            type="search"
            value={value}
            onChange={handleChange}
            aria-invalid={Boolean(error)}
            className={cn(
              "w-full rounded-md border text-sm transition-colors h-9 pl-9 pr-8 py-2",
              "bg-white text-zinc-900 placeholder:text-zinc-400",
              "dark:bg-[#2D3640] dark:text-[#E2E8F0] dark:placeholder:text-[#64748B]",
              "focus:outline-none focus:ring-2 focus:ring-offset-1",
              "focus:ring-zinc-900 dark:focus:ring-[#4CCBBF] dark:focus:ring-offset-[#242B33]",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error ? "border-red-500 focus:ring-red-500" : "border-zinc-300 dark:border-[#2D3640]"
            )}
            {...props}
          />

          {/* Clear button */}
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-zinc-400 hover:text-zinc-600 dark:text-[#9FAEC1] dark:hover:text-[#E8EDF2]"
              aria-label="Clear search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          )}
        </div>

        {showSubmitButton && (
          <button
            type="submit"
            className={cn(
              "inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors",
              "bg-zinc-900 text-white hover:bg-zinc-700",
              "dark:bg-[#4CCBBF] dark:text-[#1F2937] dark:hover:bg-[#3AAFA4]"
            )}
          >
            {submitLabel}
          </button>
        )}

        {error && <p role="alert" className="text-xs text-red-600 dark:text-red-400">{error}</p>}
      </form>
    );
  }
);
