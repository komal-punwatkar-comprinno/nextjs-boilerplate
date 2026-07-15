"use client";

import { forwardRef } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  /** Error message displayed below the input. */
  error?: string;
  /** Helper text displayed below the input when there is no error. */
  hint?: string;
  /** Icon/element placed at the left inside the input. */
  leftAddon?: React.ReactNode;
  /** Icon/element placed at the right inside the input. */
  rightAddon?: React.ReactNode;
}

/**
 * Accessible text input with label, error, hint, and addon slots.
 * Forwards the ref to the underlying <input> for use with React Hook Form.
 *
 * @example
 * <Input label="Email" type="email" error={errors.email?.message} />
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      label,
      error,
      hint,
      leftAddon,
      rightAddon,
      id,
      className = "",
      ...props
    },
    ref
  ) {
    // Generate a stable id when one isn't provided so the label links correctly.
    const inputId = id ?? `input-${label?.toLowerCase().replace(/\s+/g, "-")}`;

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-zinc-700"
          >
            {label}
            {props.required && (
              <span className="ml-1 text-red-500" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <div className="relative flex items-center">
          {leftAddon && (
            <div className="pointer-events-none absolute left-3 text-zinc-400">
              {leftAddon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            aria-invalid={Boolean(error)}
            aria-describedby={
              error
                ? `${inputId}-error`
                : hint
                  ? `${inputId}-hint`
                  : undefined
            }
            className={[
              "w-full rounded-md border bg-white text-sm text-zinc-900 placeholder:text-zinc-400",
              "h-9 px-3 py-2 transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-1",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error
                ? "border-red-500 focus:ring-red-500"
                : "border-zinc-300",
              leftAddon ? "pl-9" : "",
              rightAddon ? "pr-9" : "",
              className,
            ].join(" ")}
            {...props}
          />
          {rightAddon && (
            <div className="absolute right-3 flex items-center text-zinc-400">
              {rightAddon}
            </div>
          )}
        </div>

        {error && (
          <p id={`${inputId}-error`} role="alert" className="text-xs text-red-600">
            {error}
          </p>
        )}
        {!error && hint && (
          <p id={`${inputId}-hint`} className="text-xs text-zinc-500">
            {hint}
          </p>
        )}
      </div>
    );
  }
);
