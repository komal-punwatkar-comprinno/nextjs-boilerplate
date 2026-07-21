"use client";

import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface DatePickerProps {
  /** Current date value. */
  value?: Date | null;
  /** Change handler. */
  onChange?: (date: Date | null) => void;
  /** Minimum selectable date. */
  minDate?: Date;
  /** Maximum selectable date. */
  maxDate?: Date;
  /** Date display format function. Defaults to YYYY-MM-DD. */
  formatDate?: (date: Date) => string;
  /** Placeholder text. */
  placeholder?: string;
  /** Disabled state. */
  disabled?: boolean;
  /** Error styling. */
  error?: boolean;
  /** Additional className. */
  className?: string;
  /** Field name for form integration. */
  name?: string;
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function defaultFormat(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  function DatePicker(
    {
      value,
      onChange,
      minDate,
      maxDate,
      formatDate = defaultFormat,
      placeholder = "Select date",
      disabled = false,
      error = false,
      className,
      name,
    },
    ref
  ) {
    const [isOpen, setIsOpen] = useState(false);
    const [viewYear, setViewYear] = useState(() => (value ?? new Date()).getFullYear());
    const [viewMonth, setViewMonth] = useState(() => (value ?? new Date()).getMonth());
    const containerRef = useRef<HTMLDivElement>(null);

    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

    const isDateDisabled = useCallback(
      (date: Date) => {
        if (minDate && date < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) return true;
        if (maxDate && date > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())) return true;
        return false;
      },
      [minDate, maxDate]
    );

    const handleSelect = (day: number) => {
      const selected = new Date(viewYear, viewMonth, day);
      if (isDateDisabled(selected)) return;
      onChange?.(selected);
      setIsOpen(false);
    };

    const prevMonth = () => {
      if (viewMonth === 0) {
        setViewMonth(11);
        setViewYear((y) => y - 1);
      } else {
        setViewMonth((m) => m - 1);
      }
    };

    const nextMonth = () => {
      if (viewMonth === 11) {
        setViewMonth(0);
        setViewYear((y) => y + 1);
      } else {
        setViewMonth((m) => m + 1);
      }
    };

    // Close on outside click
    useEffect(() => {
      const handleClick = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    // Build calendar grid cells
    const cells: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    return (
      <div
        ref={(node) => {
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn("relative w-full", className)}
      >
        {name && <input type="hidden" name={name} value={value ? formatDate(value) : ""} />}

        {/* Trigger */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setIsOpen((o) => !o)}
          className={cn(
            "flex h-9 w-full items-center justify-between rounded-md border px-3 text-sm transition-colors",
            "bg-white text-zinc-900 dark:bg-[#2D3640] dark:text-[#E8EDF2]",
            "focus:outline-none focus:ring-2 focus:ring-offset-1",
            "focus:ring-zinc-900 dark:focus:ring-[#4CCBBF] dark:focus:ring-offset-[#242B33]",
            error ? "border-red-500" : "border-zinc-300 dark:border-[#2D3640]",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          <span className={cn(!value && "text-zinc-400 dark:text-[#64748B]")}>
            {value ? formatDate(value) : placeholder}
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-zinc-400 dark:text-[#9FAEC1]">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </button>

        {/* Calendar popup */}
        {isOpen && (
          <div className={cn(
            "absolute z-50 mt-1 w-72 rounded-md border p-3 shadow-lg",
            "bg-white border-zinc-200 dark:bg-[#2A3441] dark:border-[#3D4A5C]"
          )}>
            {/* Header */}
            <div className="mb-2 flex items-center justify-between">
              <button
                type="button"
                onClick={prevMonth}
                className="rounded p-1 text-zinc-600 hover:bg-zinc-100 dark:text-[#9FAEC1] dark:hover:bg-[#3D4A5C]"
                aria-label="Previous month"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                </svg>
              </button>
              <span className="text-sm font-medium text-zinc-900 dark:text-[#E8EDF2]">
                {MONTHS[viewMonth]} {viewYear}
              </span>
              <button
                type="button"
                onClick={nextMonth}
                className="rounded p-1 text-zinc-600 hover:bg-zinc-100 dark:text-[#9FAEC1] dark:hover:bg-[#3D4A5C]"
                aria-label="Next month"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* Day headers */}
            <div className="mb-1 grid grid-cols-7 gap-0.5 text-center">
              {DAYS.map((d) => (
                <div key={d} className="text-xs font-medium text-zinc-500 dark:text-[#9FAEC1]">
                  {d}
                </div>
              ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7 gap-0.5">
              {cells.map((day, i) => {
                if (day === null) {
                  return <div key={`empty-${i}`} />;
                }
                const date = new Date(viewYear, viewMonth, day);
                const isSelected = value ? isSameDay(value, date) : false;
                const isToday = isSameDay(new Date(), date);
                const isDisabled = isDateDisabled(date);

                return (
                  <button
                    key={day}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => handleSelect(day)}
                    className={cn(
                      "flex h-8 w-full items-center justify-center rounded text-sm transition-colors",
                      isSelected
                        ? "bg-[#4CCBBF] text-white dark:bg-[#4CCBBF] dark:text-[#1F2937] font-medium"
                        : isToday
                          ? "bg-zinc-100 text-zinc-900 dark:bg-[#3D4A5C] dark:text-[#E8EDF2]"
                          : "text-zinc-700 hover:bg-zinc-100 dark:text-[#E8EDF2] dark:hover:bg-[#3D4A5C]",
                      isDisabled && "cursor-not-allowed opacity-30"
                    )}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* Today button */}
            <div className="mt-2 border-t border-zinc-200 pt-2 dark:border-[#3D4A5C]">
              <button
                type="button"
                onClick={() => {
                  const today = new Date();
                  if (!isDateDisabled(today)) {
                    onChange?.(today);
                    setIsOpen(false);
                  }
                }}
                className="w-full rounded px-2 py-1 text-center text-xs font-medium text-[#4CCBBF] hover:bg-zinc-100 dark:hover:bg-[#3D4A5C]"
              >
                Today
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
);
