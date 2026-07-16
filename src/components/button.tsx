"use client";

import { forwardRef } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Shows a spinner and disables the button when true. */
  isLoading?: boolean;
  /** Icon placed before the label. */
  leftIcon?: React.ReactNode;
  /** Icon placed after the label. */
  rightIcon?: React.ReactNode;
}

/**
 * Light theme: uses zinc/white palette — clean, minimal, professional.
 * Dark theme: each variant gets its own distinct identity:
 *   primary   → vivid indigo fill — clear call-to-action on dark surfaces
 *   secondary → outlined indigo — elegant, high-contrast border style
 *   ghost     → no bg, slate-300 text + indigo hover tint — lightweight but readable
 *   danger    → bright red fill — stays punchy and unmissable
 */
const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    // Light — dark zinc
    "bg-zinc-900 text-white hover:bg-zinc-700 focus-visible:ring-zinc-900",
    // Dark — Tevico teal fill
    "dark:bg-[#4CCBBF] dark:text-[#1F2937] dark:hover:bg-[#3AAFA4] dark:focus-visible:ring-[#4CCBBF]",
  ].join(" "),

  secondary: [
    // Light — white bordered
    "bg-white text-zinc-900 border border-zinc-300 hover:bg-zinc-50 focus-visible:ring-zinc-300",
    // Dark — transparent teal outline
    "dark:bg-transparent dark:text-[#4CCBBF] dark:border-[#4CCBBF] dark:hover:bg-[rgba(76,203,191,0.12)] dark:hover:text-[#4CCBBF] dark:focus-visible:ring-[#4CCBBF]",
  ].join(" "),

  ghost: [
    // Light — invisible until hovered
    "bg-transparent text-zinc-700 hover:bg-zinc-100 focus-visible:ring-zinc-300",
    // Dark — #9FAEC1 text, teal tint on hover
    "dark:bg-transparent dark:text-[#9FAEC1] dark:hover:bg-[rgba(76,203,191,0.10)] dark:hover:text-[#4CCBBF] dark:focus-visible:ring-[#4CCBBF]",
  ].join(" "),

  danger: [
    // Light — solid red
    "bg-red-600 text-white hover:bg-red-500 focus-visible:ring-red-600",
    // Dark — Tevico danger #ED495D, brighter on hover
    "dark:bg-[#ED495D] dark:text-white dark:hover:bg-[#f05d6f] dark:focus-visible:ring-[#ED495D]",
  ].join(" "),
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-9 px-4 text-sm gap-2",
  lg: "h-11 px-6 text-base gap-2.5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      className = "",
      ...props
    },
    ref
  ) {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        className={[
          "inline-flex cursor-pointer items-center justify-center rounded-md font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          "dark:focus-visible:ring-offset-slate-800",
          variantClasses[variant],
          sizeClasses[size],
          className,
        ].join(" ")}
        {...props}
      >
        {isLoading ? (
          <svg
            className="h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

