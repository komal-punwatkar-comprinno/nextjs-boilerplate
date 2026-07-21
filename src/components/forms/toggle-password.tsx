"use client";

import { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface TogglePasswordProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Label text. */
  label?: string;
  /** Error message. */
  error?: string;
  /** Hint text. */
  hint?: string;
}

export const TogglePassword = forwardRef<HTMLInputElement, TogglePasswordProps>(
  function TogglePassword({ label, error, hint, id, className, ...props }, ref) {
    const [visible, setVisible] = useState(false);
    const inputId = id ?? (label ? `password-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined);

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-zinc-700 dark:text-[#E8EDF2]">
            {label}
            {props.required && <span className="ml-1 text-red-500" aria-hidden="true">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type={visible ? "text" : "password"}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            className={cn(
              "w-full rounded-md border text-sm transition-colors h-9 px-3 py-2 pr-10",
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
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            tabIndex={-1}
            aria-label={visible ? "Hide password" : "Show password"}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-zinc-400 hover:text-zinc-600 dark:text-[#9FAEC1] dark:hover:text-[#E8EDF2]"
          >
            {visible ? (
              /* Eye-off icon */
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            ) : (
              /* Eye icon */
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </button>
        </div>
        {error && <p id={`${inputId}-error`} role="alert" className="text-xs text-red-600 dark:text-red-400">{error}</p>}
        {!error && hint && <p id={`${inputId}-hint`} className="text-xs text-zinc-500 dark:text-[#9FAEC1]">{hint}</p>}
      </div>
    );
  }
);
