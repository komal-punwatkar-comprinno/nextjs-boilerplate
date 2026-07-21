"use client";

import { forwardRef } from "react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ label, error, hint, id, className = "", ...props }, ref) {
    const textareaId = id ?? `textarea-${label?.toLowerCase().replace(/\s+/g, "-")}`;

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={textareaId} className="text-sm font-medium text-zinc-700 dark:text-[#E8EDF2]">
            {label}
            {props.required && <span className="ml-1 text-red-500" aria-hidden="true">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined}
          className={[
            "w-full rounded-md border px-3 py-2 text-sm transition-colors min-h-[80px] resize-y",
            "bg-white text-zinc-900 placeholder:text-zinc-400",
            "dark:bg-[#353B46] dark:text-[#E8EDF2] dark:placeholder:text-[#8C8C8C]",
            "focus:outline-none focus:ring-2 focus:ring-offset-1",
            "focus:ring-zinc-900 dark:focus:ring-[#4CCBBF] dark:focus:ring-offset-[#2A3441]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error ? "border-red-500 focus:ring-red-500" : "border-zinc-300 dark:border-slate-500",
            className,
          ].join(" ")}
          {...props}
        />
        {error && <p id={`${textareaId}-error`} role="alert" className="text-xs text-red-600 dark:text-red-400">{error}</p>}
        {!error && hint && <p id={`${textareaId}-hint`} className="text-xs text-zinc-500 dark:text-[#9FAEC1]">{hint}</p>}
      </div>
    );
  }
);
