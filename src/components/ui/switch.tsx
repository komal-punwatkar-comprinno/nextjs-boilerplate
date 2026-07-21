"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export type SwitchSize = "sm" | "md" | "lg";

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string;
  size?: SwitchSize;
}

const trackSizes: Record<SwitchSize, string> = {
  sm: "h-4 w-7",
  md: "h-5 w-9",
  lg: "h-6 w-11",
};

const thumbSizes: Record<SwitchSize, string> = {
  sm: "h-3 w-3 peer-checked:translate-x-3",
  md: "h-4 w-4 peer-checked:translate-x-4",
  lg: "h-5 w-5 peer-checked:translate-x-5",
};

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  function Switch({ label, size = "md", disabled, className, id, ...props }, ref) {
    const switchId = id ?? `switch-${label?.toLowerCase().replace(/\s+/g, "-") ?? "default"}`;

    return (
      <label
        htmlFor={switchId}
        className={cn(
          "inline-flex items-center gap-2 select-none",
          disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
          className
        )}
      >
        <span className="relative inline-flex items-center">
          <input
            ref={ref}
            type="checkbox"
            role="switch"
            id={switchId}
            disabled={disabled}
            className="peer sr-only"
            {...props}
          />
          <span
            className={cn(
              "rounded-full transition-colors duration-200",
              "bg-zinc-300 dark:bg-[#3D4A5C]",
              "peer-checked:bg-zinc-900 dark:peer-checked:bg-[#4CCBBF]",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-offset-1 peer-focus-visible:ring-zinc-900 dark:peer-focus-visible:ring-[#4CCBBF] dark:peer-focus-visible:ring-offset-[#242B33]",
              trackSizes[size]
            )}
            aria-hidden="true"
          />
          <span
            className={cn(
              "absolute left-0.5 rounded-full bg-white transition-transform duration-200",
              "shadow-sm",
              thumbSizes[size]
            )}
            aria-hidden="true"
          />
        </span>
        {label && (
          <span className="text-sm text-zinc-700 dark:text-[#E8EDF2]">{label}</span>
        )}
      </label>
    );
  }
);
