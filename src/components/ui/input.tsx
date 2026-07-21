"use client";

import { forwardRef } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ label, error, hint, leftAddon, rightAddon, id, className = "", ...props }, ref) {
    const inputId = id ?? `input-${label?.toLowerCase().replace(/\s+/g, "-")}`;

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-zinc-700 dark:text-[#E8EDF2]">
            {label}
            {props.required && <span className="ml-1 text-red-500" aria-hidden="true">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {leftAddon && (
            <div className="pointer-events-none absolute left-3 text-zinc-400 dark:text-[#9FAEC1]">
              {leftAddon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            className={[
              "w-full rounded-md border text-sm transition-colors h-9 px-3 py-2",
              "bg-white text-zinc-900 placeholder:text-zinc-400",
              "dark:bg-[#2D3640] dark:text-[#E2E8F0] dark:placeholder:text-[#64748B]",
              "focus:outline-none focus:ring-2 focus:ring-offset-1",
              "focus:ring-zinc-900 dark:focus:ring-[#4CCBBF] dark:focus:ring-offset-[#242B33]",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error ? "border-red-500 focus:ring-red-500" : "border-zinc-300 dark:border-[#2D3640]",
              leftAddon ? "pl-9" : "",
              rightAddon ? "pr-9" : "",
              className,
            ].join(" ")}
            {...props}
          />
          {rightAddon && (
            <div className="absolute right-3 flex items-center text-zinc-400 dark:text-[#9FAEC1]">
              {rightAddon}
            </div>
          )}
        </div>
        {error && <p id={`${inputId}-error`} role="alert" className="text-xs text-red-600 dark:text-red-400">{error}</p>}
        {!error && hint && <p id={`${inputId}-hint`} className="text-xs text-zinc-500 dark:text-[#9FAEC1]">{hint}</p>}
      </div>
    );
  }
);
