"use client";

import { forwardRef, useCallback } from "react";
import { cn } from "@/lib/utils";

export interface ToggleSwitchProps {
  /** Whether the toggle is on. */
  checked?: boolean;
  /** Change handler. */
  onChange?: (checked: boolean) => void;
  /** Label text. */
  label?: string;
  /** Description text shown below the label. */
  description?: string;
  /** Error message. */
  error?: string;
  /** Disabled state. */
  disabled?: boolean;
  /** Field name for form integration. */
  name?: string;
  /** Additional className for the container. */
  className?: string;
}

export const ToggleSwitch = forwardRef<HTMLButtonElement, ToggleSwitchProps>(
  function ToggleSwitch(
    {
      checked = false,
      onChange,
      label,
      description,
      error,
      disabled = false,
      name,
      className,
    },
    ref
  ) {
    const handleToggle = useCallback(() => {
      if (!disabled) onChange?.(!checked);
    }, [checked, disabled, onChange]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleToggle();
      }
    };

    return (
      <div className={cn("flex flex-col gap-1", className)}>
        <div className="flex items-start gap-3">
          {/* Hidden input for form submission */}
          {name && <input type="hidden" name={name} value={checked ? "true" : "false"} />}

          {/* Toggle track */}
          <button
            ref={ref}
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={label}
            disabled={disabled}
            onClick={handleToggle}
            onKeyDown={handleKeyDown}
            className={cn(
              "relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer items-center rounded-full transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-offset-2",
              "focus:ring-zinc-900 dark:focus:ring-[#4CCBBF] dark:focus:ring-offset-[#242B33]",
              checked
                ? "bg-[#4CCBBF] dark:bg-[#4CCBBF]"
                : "bg-zinc-300 dark:bg-[#3D4A5C]",
              disabled && "cursor-not-allowed opacity-50"
            )}
          >
            {/* Toggle thumb */}
            <span
              className={cn(
                "inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform",
                "dark:bg-[#E8EDF2]",
                checked ? "translate-x-[18px]" : "translate-x-[2px]"
              )}
            />
          </button>

          {/* Label & description */}
          {(label || description) && (
            <div className="flex flex-col">
              {label && (
                <span
                  className={cn(
                    "text-sm font-medium",
                    disabled
                      ? "text-zinc-400 dark:text-[#64748B]"
                      : "text-zinc-700 dark:text-[#E8EDF2]"
                  )}
                >
                  {label}
                </span>
              )}
              {description && (
                <span className="text-xs text-zinc-500 dark:text-[#9FAEC1]">
                  {description}
                </span>
              )}
            </div>
          )}
        </div>

        {error && (
          <p role="alert" className="text-xs text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  }
);
