"use client";

import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface AdvancedSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface AdvancedSelectProps {
  /** Available options. */
  options: AdvancedSelectOption[];
  /** Current value(s). */
  value?: string | string[];
  /** Change handler. */
  onChange?: (value: string | string[]) => void;
  /** Enable multi-select mode. */
  multiple?: boolean;
  /** Enable search/filter. */
  searchable?: boolean;
  /** Allow creating new options. */
  creatable?: boolean;
  /** Called when a new option is created. */
  onCreate?: (value: string) => void;
  /** Placeholder text. */
  placeholder?: string;
  /** Disabled state. */
  disabled?: boolean;
  /** Error state styling. */
  error?: boolean;
  /** Additional className for the container. */
  className?: string;
  /** Field name for form integration. */
  name?: string;
}

export const AdvancedSelect = forwardRef<HTMLDivElement, AdvancedSelectProps>(
  function AdvancedSelect(
    {
      options,
      value,
      onChange,
      multiple = false,
      searchable = true,
      creatable = false,
      onCreate,
      placeholder = "Select...",
      disabled = false,
      error = false,
      className,
      name,
    },
    ref
  ) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [focusIndex, setFocusIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    const selectedValues: string[] = Array.isArray(value)
      ? value
      : value !== undefined && value !== ""
        ? [value]
        : [];

    const filteredOptions = options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(search.toLowerCase()) &&
        (!multiple || !selectedValues.includes(opt.value))
    );

    const showCreateOption =
      creatable &&
      search.trim() !== "" &&
      !options.some((o) => o.label.toLowerCase() === search.toLowerCase());

    const selectOption = useCallback(
      (val: string) => {
        if (multiple) {
          const next = [...selectedValues, val];
          onChange?.(next);
        } else {
          onChange?.(val);
          setIsOpen(false);
        }
        setSearch("");
        setFocusIndex(-1);
      },
      [multiple, selectedValues, onChange]
    );

    const removeOption = useCallback(
      (val: string) => {
        if (multiple) {
          onChange?.(selectedValues.filter((v) => v !== val));
        } else {
          onChange?.("");
        }
      },
      [multiple, selectedValues, onChange]
    );

    const clearAll = useCallback(() => {
      onChange?.(multiple ? [] : "");
      setSearch("");
    }, [multiple, onChange]);

    const handleCreate = useCallback(() => {
      if (!search.trim()) return;
      onCreate?.(search.trim());
      selectOption(search.trim());
    }, [search, onCreate, selectOption]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            const max = filteredOptions.length + (showCreateOption ? 1 : 0) - 1;
            setFocusIndex((i) => Math.min(i + 1, max));
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusIndex((i) => Math.max(i - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else if (focusIndex >= 0) {
            if (focusIndex < filteredOptions.length) {
              const opt = filteredOptions[focusIndex];
              if (!opt.disabled) selectOption(opt.value);
            } else if (showCreateOption) {
              handleCreate();
            }
          }
          break;
        case "Escape":
          setIsOpen(false);
          setFocusIndex(-1);
          break;
        case "Backspace":
          if (search === "" && multiple && selectedValues.length > 0) {
            removeOption(selectedValues[selectedValues.length - 1]);
          }
          break;
      }
    };

    // Close on outside click
    useEffect(() => {
      const handleClick = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false);
          setFocusIndex(-1);
        }
      };
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    // Scroll focused item into view
    useEffect(() => {
      if (focusIndex >= 0 && listRef.current) {
        const items = listRef.current.querySelectorAll("[data-option]");
        items[focusIndex]?.scrollIntoView({ block: "nearest" });
      }
    }, [focusIndex]);

    const getLabel = (val: string) => {
      return options.find((o) => o.value === val)?.label ?? val;
    };

    return (
      <div
        ref={(node) => {
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn("relative w-full", className)}
        onKeyDown={handleKeyDown}
      >
        {/* Hidden input for form submission */}
        {name && <input type="hidden" name={name} value={multiple ? selectedValues.join(",") : selectedValues[0] ?? ""} />}

        {/* Trigger / Input area */}
        <div
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          onClick={() => {
            if (!disabled) {
              setIsOpen(true);
              inputRef.current?.focus();
            }
          }}
          className={cn(
            "flex min-h-[36px] w-full flex-wrap items-center gap-1 rounded-md border px-2 py-1 text-sm transition-colors cursor-pointer",
            "bg-white text-zinc-900 dark:bg-[#2D3640] dark:text-[#E8EDF2]",
            "focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-1",
            "focus-within:ring-zinc-900 dark:focus-within:ring-[#4CCBBF] dark:focus-within:ring-offset-[#242B33]",
            error
              ? "border-red-500 dark:border-red-500"
              : "border-zinc-300 dark:border-[#2D3640]",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          {/* Tags for multi-select */}
          {multiple &&
            selectedValues.map((val) => (
              <span
                key={val}
                className="inline-flex items-center gap-1 rounded bg-zinc-100 px-1.5 py-0.5 text-xs text-zinc-700 dark:bg-[#3D4A5C] dark:text-[#E8EDF2]"
              >
                {getLabel(val)}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeOption(val);
                  }}
                  className="text-zinc-500 hover:text-zinc-700 dark:text-[#9FAEC1] dark:hover:text-[#E8EDF2]"
                  aria-label={`Remove ${getLabel(val)}`}
                >
                  ×
                </button>
              </span>
            ))}

          {/* Search input */}
          {searchable ? (
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                if (!isOpen) setIsOpen(true);
                setFocusIndex(-1);
              }}
              placeholder={selectedValues.length === 0 ? placeholder : ""}
              disabled={disabled}
              className="min-w-[60px] flex-1 border-none bg-transparent p-0 text-sm outline-none placeholder:text-zinc-400 dark:placeholder:text-[#64748B]"
              aria-autocomplete="list"
            />
          ) : (
            <span className={cn("flex-1 text-sm", selectedValues.length === 0 && "text-zinc-400 dark:text-[#64748B]")}>
              {!multiple && selectedValues.length > 0
                ? getLabel(selectedValues[0])
                : selectedValues.length === 0
                  ? placeholder
                  : ""}
            </span>
          )}

          {/* Clear button */}
          {selectedValues.length > 0 && !disabled && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                clearAll();
              }}
              className="ml-auto flex-shrink-0 p-0.5 text-zinc-400 hover:text-zinc-600 dark:text-[#9FAEC1] dark:hover:text-[#E8EDF2]"
              aria-label="Clear selection"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          )}

          {/* Chevron */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={cn("h-4 w-4 flex-shrink-0 text-zinc-400 transition-transform dark:text-[#9FAEC1]", isOpen && "rotate-180")}
          >
            <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z" clipRule="evenodd" />
          </svg>
        </div>

        {/* Dropdown */}
        {isOpen && (
          <ul
            ref={listRef}
            role="listbox"
            aria-multiselectable={multiple}
            className={cn(
              "absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border py-1 shadow-lg",
              "bg-white border-zinc-200 dark:bg-[#2A3441] dark:border-[#3D4A5C]"
            )}
          >
            {filteredOptions.length === 0 && !showCreateOption && (
              <li className="px-3 py-2 text-sm text-zinc-500 dark:text-[#9FAEC1]">
                No options found
              </li>
            )}
            {filteredOptions.map((opt, i) => {
              const isSelected = selectedValues.includes(opt.value);
              const isFocused = focusIndex === i;
              return (
                <li
                  key={opt.value}
                  data-option
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={opt.disabled}
                  onClick={() => {
                    if (!opt.disabled) selectOption(opt.value);
                  }}
                  className={cn(
                    "cursor-pointer px-3 py-2 text-sm transition-colors",
                    "text-zinc-900 dark:text-[#E8EDF2]",
                    isFocused && "bg-zinc-100 dark:bg-[#3D4A5C]",
                    isSelected && !multiple && "bg-zinc-50 font-medium dark:bg-[#3D4A5C]",
                    opt.disabled && "cursor-not-allowed opacity-50"
                  )}
                >
                  {opt.label}
                </li>
              );
            })}
            {showCreateOption && (
              <li
                data-option
                role="option"
                aria-selected={false}
                onClick={handleCreate}
                className={cn(
                  "cursor-pointer px-3 py-2 text-sm transition-colors",
                  "text-[#4CCBBF] dark:text-[#4CCBBF]",
                  focusIndex === filteredOptions.length && "bg-zinc-100 dark:bg-[#3D4A5C]"
                )}
              >
                Create &quot;{search}&quot;
              </li>
            )}
          </ul>
        )}
      </div>
    );
  }
);
