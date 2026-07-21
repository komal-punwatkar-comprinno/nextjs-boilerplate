"use client";

import { forwardRef, useCallback, useState } from "react";
import { cn } from "@/lib/utils";

export interface InputMaskProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  /**
   * Mask pattern string. Use '#' for digits, 'A' for letters, '*' for any character.
   * All other characters are treated as literal separators.
   * @example "(###) ###-####" for phone
   * @example "####-####-####-####" for credit card
   * @example "##/##/####" for date
   */
  mask: string;
  /** Label text. */
  label?: string;
  /** Error message. */
  error?: string;
  /** Hint text. */
  hint?: string;
  /** Change handler with raw unmasked value. */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Called with the unmasked value (digits/letters only). */
  onValueChange?: (rawValue: string) => void;
}

function applyMask(raw: string, mask: string): string {
  let result = "";
  let rawIndex = 0;

  for (let i = 0; i < mask.length && rawIndex < raw.length; i++) {
    const maskChar = mask[i];
    if (maskChar === "#") {
      // Expect digit
      if (/\d/.test(raw[rawIndex])) {
        result += raw[rawIndex];
        rawIndex++;
      } else {
        rawIndex++;
        i--; // retry this mask position
      }
    } else if (maskChar === "A") {
      // Expect letter
      if (/[a-zA-Z]/.test(raw[rawIndex])) {
        result += raw[rawIndex];
        rawIndex++;
      } else {
        rawIndex++;
        i--;
      }
    } else if (maskChar === "*") {
      // Any character
      result += raw[rawIndex];
      rawIndex++;
    } else {
      // Literal separator
      result += maskChar;
    }
  }

  return result;
}

function stripMask(value: string, mask: string): string {
  let result = "";
  for (let i = 0; i < value.length; i++) {
    const maskChar = mask[i];
    if (maskChar === "#" || maskChar === "A" || maskChar === "*") {
      result += value[i];
    }
  }
  return result;
}

export const InputMask = forwardRef<HTMLInputElement, InputMaskProps>(
  function InputMask(
    {
      mask,
      label,
      error,
      hint,
      onChange,
      onValueChange,
      id,
      className,
      value: controlledValue,
      defaultValue,
      ...props
    },
    ref
  ) {
    const [internalValue, setInternalValue] = useState(() => {
      const initial = (controlledValue ?? defaultValue ?? "") as string;
      return initial ? applyMask(initial.replace(/[^a-zA-Z0-9]/g, ""), mask) : "";
    });

    const displayValue = controlledValue !== undefined
      ? applyMask(String(controlledValue).replace(/[^a-zA-Z0-9]/g, ""), mask)
      : internalValue;

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawInput = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
        const masked = applyMask(rawInput, mask);
        setInternalValue(masked);

        // Update the native event target value
        const nativeEvent = e.nativeEvent as InputEvent;
        Object.defineProperty(e.target, "value", {
          writable: true,
          value: masked,
        });

        onChange?.(e);
        onValueChange?.(stripMask(masked, mask));
      },
      [mask, onChange, onValueChange]
    );

    const inputId = id ?? (label ? `input-mask-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined);

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-zinc-700 dark:text-[#E8EDF2]">
            {label}
            {props.required && <span className="ml-1 text-red-500" aria-hidden="true">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          type="text"
          value={displayValue}
          onChange={handleChange}
          placeholder={props.placeholder ?? mask.replace(/#/g, "_").replace(/A/g, "_").replace(/\*/g, "_")}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          className={cn(
            "w-full rounded-md border text-sm transition-colors h-9 px-3 py-2",
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
        {error && <p id={`${inputId}-error`} role="alert" className="text-xs text-red-600 dark:text-red-400">{error}</p>}
        {!error && hint && <p id={`${inputId}-hint`} className="text-xs text-zinc-500 dark:text-[#9FAEC1]">{hint}</p>}
      </div>
    );
  }
);
