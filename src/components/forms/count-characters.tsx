"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface CountCharactersProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Label text. */
  label?: string;
  /** Error message. */
  error?: string;
  /** Hint text. */
  hint?: string;
  /** Whether to show the character count. */
  showCount?: boolean;
  /** Warning threshold — shows warning color when remaining characters are below this. */
  warningThreshold?: number;
}

export const CountCharacters = forwardRef<HTMLTextAreaElement, CountCharactersProps>(
  function CountCharacters(
    {
      label,
      error,
      hint,
      maxLength = 500,
      showCount = true,
      warningThreshold = 20,
      id,
      className,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) {
    const currentLength = typeof value === "string"
      ? value.length
      : typeof defaultValue === "string"
        ? defaultValue.length
        : 0;

    const remaining = maxLength - currentLength;
    const isWarning = remaining <= warningThreshold && remaining > 0;
    const isOver = remaining < 0;
    const inputId = id ?? (label ? `textarea-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined);

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-zinc-700 dark:text-[#E8EDF2]">
            {label}
            {props.required && <span className="ml-1 text-red-500" aria-hidden="true">*</span>}
          </label>
        )}
        <div className="relative">
          <textarea
            ref={ref}
            id={inputId}
            maxLength={maxLength}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            className={cn(
              "w-full rounded-md border text-sm transition-colors px-3 py-2 min-h-[100px] resize-y",
              "bg-white text-zinc-900 placeholder:text-zinc-400",
              "dark:bg-[#2D3640] dark:text-[#E2E8F0] dark:placeholder:text-[#64748B]",
              "focus:outline-none focus:ring-2 focus:ring-offset-1",
              "focus:ring-zinc-900 dark:focus:ring-[#4CCBBF] dark:focus:ring-offset-[#242B33]",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error ? "border-red-500 focus:ring-red-500" : "border-zinc-300 dark:border-[#2D3640]",
              className
            )}
            {...props}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            {error && <p id={`${inputId}-error`} role="alert" className="text-xs text-red-600 dark:text-red-400">{error}</p>}
            {!error && hint && <p id={`${inputId}-hint`} className="text-xs text-zinc-500 dark:text-[#9FAEC1]">{hint}</p>}
          </div>
          {showCount && (
            <span
              className={cn(
                "text-xs",
                isOver
                  ? "font-medium text-red-600 dark:text-[#ED495D]"
                  : isWarning
                    ? "font-medium text-amber-600 dark:text-amber-400"
                    : "text-zinc-400 dark:text-[#9FAEC1]"
              )}
            >
              {currentLength}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  }
);
