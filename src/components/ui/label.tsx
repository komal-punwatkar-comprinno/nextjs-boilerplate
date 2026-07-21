"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  hint?: string;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  function Label({ children, required, hint, className, ...props }, ref) {
    return (
      <div className="flex flex-col gap-0.5">
        <label
          ref={ref}
          className={cn(
            "text-sm font-medium text-zinc-700 dark:text-[#E8EDF2]",
            className
          )}
          {...props}
        >
          {children}
          {required && (
            <span className="ml-1 text-red-500 dark:text-[#ED495D]" aria-hidden="true">
              *
            </span>
          )}
        </label>
        {hint && (
          <span className="text-xs text-zinc-500 dark:text-[#9FAEC1]">
            {hint}
          </span>
        )}
      </div>
    );
  }
);
