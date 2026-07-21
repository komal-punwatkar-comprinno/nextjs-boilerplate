"use client";

import { cn } from "@/lib/utils";

export interface FormFieldProps {
  /** Label text displayed above the control. */
  label?: string;
  /** Error message — displays in red below the control. */
  error?: string;
  /** Hint text — displays in muted gray below the control (hidden when error is present). */
  hint?: string;
  /** Whether the field is required — shows a red asterisk after the label. */
  required?: boolean;
  /** HTML id for the control (used for label's htmlFor). */
  htmlFor?: string;
  /** Additional className for the wrapper. */
  className?: string;
  /** The form control(s) to render inside. */
  children: React.ReactNode;
}

/**
 * FormField — A wrapper that adds label, error, hint, and required indicator
 * around any form control. Works with react-hook-form's Controller pattern.
 *
 * @example
 * <Controller
 *   name="role"
 *   control={form.control}
 *   render={({ field, fieldState }) => (
 *     <FormField label="Role" required error={fieldState.error?.message}>
 *       <Select {...field} />
 *     </FormField>
 *   )}
 * />
 */
export function FormField({
  label,
  error,
  hint,
  required = false,
  htmlFor,
  className,
  children,
}: FormFieldProps) {
  const fieldId = htmlFor ?? (label ? `field-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined);

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {label && (
        <label
          htmlFor={fieldId}
          className="text-sm font-medium text-zinc-700 dark:text-[#E8EDF2]"
        >
          {label}
          {required && (
            <span className="ml-1 text-red-500 dark:text-[#ED495D]" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      {children}
      {error && (
        <p
          id={fieldId ? `${fieldId}-error` : undefined}
          role="alert"
          className="text-xs text-red-600 dark:text-red-400"
        >
          {error}
        </p>
      )}
      {!error && hint && (
        <p
          id={fieldId ? `${fieldId}-hint` : undefined}
          className="text-xs text-zinc-500 dark:text-[#9FAEC1]"
        >
          {hint}
        </p>
      )}
    </div>
  );
}
