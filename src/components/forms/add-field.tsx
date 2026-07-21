"use client";

import { useCallback } from "react";
import { cn } from "@/lib/utils";

export interface AddFieldProps {
  /** Current array of values. */
  values: string[];
  /** Change handler with updated values array. */
  onChange: (values: string[]) => void;
  /** Placeholder for each input. */
  placeholder?: string;
  /** Label for the field group. */
  label?: string;
  /** Text for the add button. */
  addLabel?: string;
  /** Maximum number of fields. */
  maxFields?: number;
  /** Disabled state. */
  disabled?: boolean;
  /** Error message (applies to the group). */
  error?: string;
  /** Per-field errors (indexed by position). */
  fieldErrors?: (string | undefined)[];
  /** Additional className. */
  className?: string;
}

export function AddField({
  values,
  onChange,
  placeholder = "Enter value...",
  label,
  addLabel = "Add field",
  maxFields,
  disabled = false,
  error,
  fieldErrors,
  className,
}: AddFieldProps) {
  const canAdd = !maxFields || values.length < maxFields;

  const addField = useCallback(() => {
    if (!canAdd || disabled) return;
    onChange([...values, ""]);
  }, [canAdd, disabled, onChange, values]);

  const removeField = useCallback(
    (index: number) => {
      if (disabled) return;
      onChange(values.filter((_, i) => i !== index));
    },
    [disabled, onChange, values]
  );

  const updateField = useCallback(
    (index: number, newValue: string) => {
      if (disabled) return;
      const next = [...values];
      next[index] = newValue;
      onChange(next);
    },
    [disabled, onChange, values]
  );

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <span className="text-sm font-medium text-zinc-700 dark:text-[#E8EDF2]">
          {label}
        </span>
      )}

      {/* Field list */}
      {values.map((val, i) => (
        <div key={i} className="flex items-start gap-2">
          <div className="flex flex-1 flex-col gap-1">
            <input
              type="text"
              value={val}
              onChange={(e) => updateField(i, e.target.value)}
              placeholder={placeholder}
              disabled={disabled}
              className={cn(
                "w-full rounded-md border text-sm transition-colors h-9 px-3 py-2",
                "bg-white text-zinc-900 placeholder:text-zinc-400",
                "dark:bg-[#2D3640] dark:text-[#E2E8F0] dark:placeholder:text-[#64748B]",
                "focus:outline-none focus:ring-2 focus:ring-offset-1",
                "focus:ring-zinc-900 dark:focus:ring-[#4CCBBF] dark:focus:ring-offset-[#242B33]",
                "disabled:cursor-not-allowed disabled:opacity-50",
                fieldErrors?.[i]
                  ? "border-red-500 focus:ring-red-500"
                  : "border-zinc-300 dark:border-[#2D3640]"
              )}
            />
            {fieldErrors?.[i] && (
              <p role="alert" className="text-xs text-red-600 dark:text-red-400">
                {fieldErrors[i]}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => removeField(i)}
            disabled={disabled}
            aria-label={`Remove field ${i + 1}`}
            className={cn(
              "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md border transition-colors",
              "border-zinc-300 bg-white text-zinc-500 hover:bg-red-50 hover:border-red-300 hover:text-red-600",
              "dark:border-[#3D4A5C] dark:bg-[#2A3441] dark:text-[#9FAEC1] dark:hover:bg-[#ED495D]/10 dark:hover:border-[#ED495D] dark:hover:text-[#ED495D]",
              disabled && "cursor-not-allowed opacity-50"
            )}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>
      ))}

      {/* Add button */}
      <button
        type="button"
        onClick={addField}
        disabled={!canAdd || disabled}
        className={cn(
          "inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-dashed px-3 text-sm font-medium transition-colors",
          "border-zinc-300 text-zinc-600 hover:border-zinc-400 hover:bg-zinc-50",
          "dark:border-[#3D4A5C] dark:text-[#9FAEC1] dark:hover:border-[#4CCBBF] dark:hover:bg-[#4CCBBF]/10 dark:hover:text-[#4CCBBF]",
          (!canAdd || disabled) && "cursor-not-allowed opacity-50"
        )}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
        </svg>
        {addLabel}
      </button>

      {error && (
        <p role="alert" className="text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
