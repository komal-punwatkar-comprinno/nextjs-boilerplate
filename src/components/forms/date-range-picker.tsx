"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface PresetRange {
  label: string;
  range: () => DateRange;
}

export interface DateRangePickerProps {
  /** Current range value. */
  value?: DateRange;
  /** Change handler. */
  onChange?: (range: DateRange) => void;
  /** Minimum selectable date. */
  minDate?: Date;
  /** Maximum selectable date. */
  maxDate?: Date;
  /** Custom preset ranges. */
  presets?: PresetRange[];
  /** Date display format function. */
  formatDate?: (date: Date) => string;
  /** Placeholder text. */
  placeholder?: string;
  /** Disabled state. */
  disabled?: boolean;
  /** Error styling. */
  error?: boolean;
  /** Additional className. */
  className?: string;
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

function isInRange(date: Date, start: Date | null, end: Date | null): boolean {
  if (!start || !end) return false;
  const time = date.getTime();
  return time >= start.getTime() && time <= end.getTime();
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

const DEFAULT_PRESETS: PresetRange[] = [
  {
    label: "Today",
    range: () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return { start: today, end: today };
    },
  },
  {
    label: "Last 7 days",
    range: () => {
      const end = new Date();
      end.setHours(0, 0, 0, 0);
      const start = new Date(end);
      start.setDate(start.getDate() - 6);
      return { start, end };
    },
  },
  {
    label: "Last 30 days",
    range: () => {
      const end = new Date();
      end.setHours(0, 0, 0, 0);
      const start = new Date(end);
      start.setDate(start.getDate() - 29);
      return { start, end };
    },
  },
  {
    label: "This month",
    range: () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      return { start, end };
    },
  },
];

export function DateRangePicker({
  value = { start: null, end: null },
  onChange,
  minDate,
  maxDate,
  presets = DEFAULT_PRESETS,
  formatDate = defaultFormat,
  placeholder = "Select date range",
  disabled = false,
  error = false,
  className,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selecting, setSelecting] = useState<"start" | "end">("start");
  const now = new Date();
  const [leftMonth, setLeftMonth] = useState(() => value.start ? value.start.getMonth() : now.getMonth());
  const [leftYear, setLeftYear] = useState(() => value.start ? value.start.getFullYear() : now.getFullYear());
  const containerRef = useRef<HTMLDivElement>(null);

  // Right calendar is always next month
  const rightMonth = leftMonth === 11 ? 0 : leftMonth + 1;
  const rightYear = leftMonth === 11 ? leftYear + 1 : leftYear;

  const isDateDisabled = useCallback(
    (date: Date) => {
      if (minDate && date < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) return true;
      if (maxDate && date > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())) return true;
      return false;
    },
    [minDate, maxDate]
  );

  const handleDayClick = (date: Date) => {
    if (isDateDisabled(date)) return;

    if (selecting === "start") {
      onChange?.({ start: date, end: null });
      setSelecting("end");
    } else {
      if (value.start && date < value.start) {
        onChange?.({ start: date, end: value.start });
      } else {
        onChange?.({ start: value.start, end: date });
      }
      setSelecting("start");
      setIsOpen(false);
    }
  };

  const handlePreset = (preset: PresetRange) => {
    onChange?.(preset.range());
    setIsOpen(false);
  };

  const prevMonth = () => {
    if (leftMonth === 0) {
      setLeftMonth(11);
      setLeftYear((y) => y - 1);
    } else {
      setLeftMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (leftMonth === 11) {
      setLeftMonth(0);
      setLeftYear((y) => y + 1);
    } else {
      setLeftMonth((m) => m + 1);
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

  const displayText =
    value.start && value.end
      ? `${formatDate(value.start)} — ${formatDate(value.end)}`
      : value.start
        ? `${formatDate(value.start)} — ...`
        : placeholder;

  function renderCalendar(year: number, month: number) {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const cells: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    return (
      <div>
        <div className="mb-1 text-center text-sm font-medium text-zinc-900 dark:text-[#E8EDF2]">
          {MONTHS[month]} {year}
        </div>
        <div className="mb-1 grid grid-cols-7 gap-0.5 text-center">
          {DAYS.map((d) => (
            <div key={d} className="text-xs font-medium text-zinc-500 dark:text-[#9FAEC1]">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-0.5">
          {cells.map((day, i) => {
            if (day === null) return <div key={`e-${i}`} />;
            const date = new Date(year, month, day);
            const isStart = value.start ? isSameDay(value.start, date) : false;
            const isEnd = value.end ? isSameDay(value.end, date) : false;
            const inRange = isInRange(date, value.start, value.end);
            const isDisabled = isDateDisabled(date);

            return (
              <button
                key={day}
                type="button"
                disabled={isDisabled}
                onClick={() => handleDayClick(date)}
                className={cn(
                  "flex h-7 w-full items-center justify-center rounded text-xs transition-colors",
                  isStart || isEnd
                    ? "bg-[#4CCBBF] text-white font-medium dark:bg-[#4CCBBF] dark:text-[#1F2937]"
                    : inRange
                      ? "bg-[#4CCBBF]/20 text-zinc-800 dark:bg-[#4CCBBF]/20 dark:text-[#E8EDF2]"
                      : "text-zinc-700 hover:bg-zinc-100 dark:text-[#E8EDF2] dark:hover:bg-[#3D4A5C]",
                  isDisabled && "cursor-not-allowed opacity-30"
                )}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
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
        <span className={cn(!(value.start || value.end) && "text-zinc-400 dark:text-[#64748B]")}>
          {displayText}
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-zinc-400 dark:text-[#9FAEC1]">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </button>

      {/* Popup */}
      {isOpen && (
        <div className={cn(
          "absolute z-50 mt-1 flex rounded-md border shadow-lg",
          "bg-white border-zinc-200 dark:bg-[#2A3441] dark:border-[#3D4A5C]"
        )}>
          {/* Presets */}
          <div className="flex flex-col border-r border-zinc-200 p-3 dark:border-[#3D4A5C]">
            <div className="mb-2 text-xs font-medium text-zinc-500 dark:text-[#9FAEC1]">Presets</div>
            {presets.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => handlePreset(preset)}
                className="rounded px-3 py-1.5 text-left text-xs text-zinc-700 hover:bg-zinc-100 dark:text-[#E8EDF2] dark:hover:bg-[#3D4A5C]"
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Calendars */}
          <div className="flex gap-4 p-3">
            <div className="flex items-start gap-1">
              <button type="button" onClick={prevMonth} className="rounded p-1 text-zinc-600 hover:bg-zinc-100 dark:text-[#9FAEC1] dark:hover:bg-[#3D4A5C]" aria-label="Previous month">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="w-48">{renderCalendar(leftYear, leftMonth)}</div>
            </div>
            <div className="flex items-start gap-1">
              <div className="w-48">{renderCalendar(rightYear, rightMonth)}</div>
              <button type="button" onClick={nextMonth} className="rounded p-1 text-zinc-600 hover:bg-zinc-100 dark:text-[#9FAEC1] dark:hover:bg-[#3D4A5C]" aria-label="Next month">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
