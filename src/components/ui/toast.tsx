"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

/* ─── Types ─── */
export type ToastVariant = "success" | "error" | "warning" | "info";
export type ToastPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "top-center"
  | "bottom-center";

export interface ToastOptions {
  title?: string;
  message: string;
  variant?: ToastVariant;
  duration?: number;
}

interface ToastItem extends ToastOptions {
  id: string;
  exiting?: boolean;
}

interface ToastContextValue {
  toast: (options: ToastOptions) => void;
}

/* ─── Context ─── */
const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}

/* ─── Provider ─── */
export interface ToastProviderProps {
  children: React.ReactNode;
  position?: ToastPosition;
  duration?: number;
}

export function ToastProvider({
  children,
  position = "top-right",
  duration = 4000,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const counterRef = useRef(0);

  const toast = useCallback(
    (options: ToastOptions) => {
      const id = `toast-${++counterRef.current}`;
      setToasts((prev) => [...prev, { ...options, id }]);
      const ttl = options.duration ?? duration;
      setTimeout(() => dismiss(id), ttl);
    },
    [duration]
  );

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, exiting: true } : t)));
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 300);
  }, []);

  const positionClasses: Record<ToastPosition, string> = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-center": "top-4 left-1/2 -translate-x-1/2",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        className={cn("fixed z-50 flex flex-col gap-2 pointer-events-none", positionClasses[position])}
        aria-live="polite"
        aria-atomic="true"
      >
        {toasts.map((t) => (
          <ToastCard key={t.id} item={t} onDismiss={() => dismiss(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

/* ─── Toast Card ─── */
const variantStyles: Record<ToastVariant, string> = {
  success: "border-l-emerald-500 dark:border-l-emerald-400",
  error: "border-l-[#ED495D] dark:border-l-[#ED495D]",
  warning: "border-l-amber-500 dark:border-l-amber-400",
  info: "border-l-blue-500 dark:border-l-blue-400",
};

const variantIcons: Record<ToastVariant, string> = {
  success: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  error: "M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z",
  warning: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z",
  info: "M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z",
};

const variantIconColors: Record<ToastVariant, string> = {
  success: "text-emerald-500 dark:text-emerald-400",
  error: "text-[#ED495D]",
  warning: "text-amber-500 dark:text-amber-400",
  info: "text-blue-500 dark:text-blue-400",
};

interface ToastCardProps {
  item: ToastItem;
  onDismiss: () => void;
}

function ToastCard({ item, onDismiss }: ToastCardProps) {
  const variant = item.variant ?? "info";

  return (
    <div
      role="alert"
      className={cn(
        "pointer-events-auto w-80 rounded-md border-l-4 p-4 shadow-lg transition-all duration-300",
        "bg-white border border-zinc-200",
        "dark:bg-[#242B33] dark:border-[#2D3640]",
        variantStyles[variant],
        item.exiting
          ? "opacity-0 translate-x-4"
          : "opacity-100 translate-x-0 animate-in slide-in-from-right"
      )}
    >
      <div className="flex items-start gap-3">
        <svg
          className={cn("h-5 w-5 shrink-0 mt-0.5", variantIconColors[variant])}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={variantIcons[variant]} />
        </svg>
        <div className="flex-1 min-w-0">
          {item.title && (
            <p className="text-sm font-medium text-zinc-900 dark:text-[#E8EDF2]">{item.title}</p>
          )}
          <p className={cn("text-sm", item.title ? "mt-1" : "", "text-zinc-600 dark:text-[#9FAEC1]")}>
            {item.message}
          </p>
        </div>
        <button
          onClick={onDismiss}
          className="shrink-0 text-zinc-400 hover:text-zinc-600 dark:text-[#9FAEC1] dark:hover:text-[#E8EDF2] transition-colors"
          aria-label="Dismiss"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
