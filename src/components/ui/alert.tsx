"use client";
  
  import { useState } from "react";
  
  export type AlertVariant = "success" | "warning" | "danger" | "info";
  
  export interface AlertProps {
    variant?: AlertVariant;
    title?: string;
    children: React.ReactNode;
    dismissible?: boolean;
    className?: string;
  }
  
  const styles: Record<AlertVariant, { wrapper: string; icon: string; title: string }> = {
    success: {
      wrapper: "bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800/40",
      icon:    "text-emerald-500 dark:text-emerald-400",
      title:   "text-emerald-800 dark:text-emerald-300",
    },
    warning: {
      wrapper: "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800/40",
      icon:    "text-amber-500 dark:text-amber-400",
      title:   "text-amber-800 dark:text-amber-300",
    },
    danger: {
      wrapper: "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800/40",
      icon:    "text-red-500 dark:text-red-400",
      title:   "text-red-800 dark:text-red-300",
    },
    info: {
      wrapper: "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800/40",
      icon:    "text-blue-500 dark:text-blue-400",
      title:   "text-blue-800 dark:text-blue-300",
    },
  };
  
  const icons: Record<AlertVariant, React.ReactNode> = {
    success: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    warning: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
   />
      </svg>
    ),
    danger: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    info: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };
  
  /**
   * Feedback alert banner. Supports success, warning, danger, info variants
   * with optional title and dismiss button.
   *
   * @example
   * <Alert variant="success" title="Saved!" dismissible>
   *   Your changes have been saved successfully.
   * </Alert>
   */
  export function Alert({
    variant = "info",
    title,
    children,
    dismissible = false,
    className = "",
  }: AlertProps) {
    const [dismissed, setDismissed] = useState(false);
    if (dismissed) return null;
  
    const s = styles[variant];
  
    return (
      <div
        role="alert"
        className={[
          "flex gap-3 rounded-lg border px-4 py-3",
          s.wrapper,
          className,
        ].join(" ")}
      >
        {/* Icon */}
        <span className={`mt-0.5 shrink-0 ${s.icon}`}>{icons[variant]}</span>
  
        {/* Body */}
        <div className="flex-1 text-sm">
          {title && (
            <p className={`font-semibold ${s.title}`}>{title}</p>
          )}
          <div className={title ? "mt-0.5 text-zinc-600 dark:text-[#9FAEC1]" : s.title}>
            {children}
          </div>
        </div>
  
        {/* Dismiss */}
        {dismissible && (
          <button
            type="button"
            aria-label="Dismiss alert"
            onClick={() => setDismissed(true)}
            className={`ml-auto shrink-0 rounded p-0.5 transition-colors hover:bg-black/10 dark:hover:bg-white/10 ${s.icon}`}
          >
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        )}
      </div>
    );
  }
