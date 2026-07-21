"use client";

import { createContext, forwardRef, useContext } from "react";
import { cn } from "@/lib/utils";

/* ─── Context ─── */
interface RadioGroupContextValue {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue>({ name: "" });

/* ─── RadioGroup ─── */
export interface RadioGroupProps {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  label?: string;
  orientation?: "horizontal" | "vertical";
  children: React.ReactNode;
  className?: string;
}

export function RadioGroup({
  name,
  value,
  onChange,
  disabled,
  label,
  orientation = "vertical",
  children,
  className,
}: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ name, value, onChange, disabled }}>
      <fieldset
        className={cn("flex", orientation === "vertical" ? "flex-col gap-2" : "flex-row gap-4 flex-wrap", className)}
        aria-label={label}
        role="radiogroup"
      >
        {label && (
          <legend className="mb-2 text-sm font-medium text-zinc-700 dark:text-[#E8EDF2]">
            {label}
          </legend>
        )}
        {children}
      </fieldset>
    </RadioGroupContext.Provider>
  );
}

/* ─── RadioItem ─── */
export interface RadioItemProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "name" | "onChange"> {
  value: string;
  label: string;
}

export const RadioItem = forwardRef<HTMLInputElement, RadioItemProps>(
  function RadioItem({ value, label, disabled: itemDisabled, className, id, ...props }, ref) {
    const group = useContext(RadioGroupContext);
    const isDisabled = itemDisabled || group.disabled;
    const radioId = id ?? `radio-${group.name}-${value}`;

    return (
      <label
        htmlFor={radioId}
        className={cn(
          "inline-flex items-center gap-2 text-sm select-none",
          isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
          className
        )}
      >
        <span className="relative inline-flex items-center justify-center">
          <input
            ref={ref}
            type="radio"
            id={radioId}
            name={group.name}
            value={value}
            checked={group.value === value}
            disabled={isDisabled}
            onChange={() => group.onChange?.(value)}
            className="peer sr-only"
            {...props}
          />
          <span
            className={cn(
              "flex h-4 w-4 items-center justify-center rounded-full border transition-all duration-150",
              "bg-white dark:bg-[#2D3640]",
              "border-zinc-300 dark:border-[#3D4A5C]",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-offset-1 peer-focus-visible:ring-zinc-900 dark:peer-focus-visible:ring-[#4CCBBF] dark:peer-focus-visible:ring-offset-[#242B33]",
              "peer-checked:border-zinc-900 dark:peer-checked:border-[#4CCBBF]"
            )}
            aria-hidden="true"
          >
            <span
              className={cn(
                "h-2 w-2 rounded-full transition-transform duration-150",
                "scale-0 peer-checked:scale-100",
                "bg-zinc-900 dark:bg-[#4CCBBF]",
                "[input:checked~span>&]:scale-100"
              )}
            />
          </span>
        </span>
        <span className="text-zinc-700 dark:text-[#E8EDF2]">{label}</span>
      </label>
    );
  }
);
