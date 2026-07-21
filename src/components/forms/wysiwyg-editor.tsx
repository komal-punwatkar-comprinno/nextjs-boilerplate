"use client";

import { forwardRef, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

export interface WysiwygEditorProps {
  /** Current HTML content. */
  value?: string;
  /** Change handler — receives HTML string. */
  onChange?: (html: string) => void;
  /** Placeholder text. */
  placeholder?: string;
  /** Disabled state. */
  disabled?: boolean;
  /** Minimum height in px. */
  minHeight?: number;
  /** Error styling. */
  error?: boolean;
  /** Additional className. */
  className?: string;
}

interface ToolbarButton {
  command: string;
  arg?: string;
  label: string;
  icon: React.ReactNode;
}

export const WysiwygEditor = forwardRef<HTMLDivElement, WysiwygEditorProps>(
  function WysiwygEditor(
    {
      value,
      onChange,
      placeholder = "Start typing...",
      disabled = false,
      minHeight = 200,
      error = false,
      className,
    },
    ref
  ) {
    const editorRef = useRef<HTMLDivElement>(null);

    const execCommand = useCallback(
      (command: string, arg?: string) => {
        if (disabled) return;
        editorRef.current?.focus();
        document.execCommand(command, false, arg);
        // Notify parent of change
        if (editorRef.current) {
          onChange?.(editorRef.current.innerHTML);
        }
      },
      [disabled, onChange]
    );

    const handleInput = () => {
      if (editorRef.current) {
        onChange?.(editorRef.current.innerHTML);
      }
    };

    const handleLink = () => {
      const url = prompt("Enter URL:");
      if (url) execCommand("createLink", url);
    };

    const toolbarButtons: ToolbarButton[] = [
      {
        command: "bold",
        label: "Bold",
        icon: <span className="text-xs font-bold">B</span>,
      },
      {
        command: "italic",
        label: "Italic",
        icon: <span className="text-xs italic">I</span>,
      },
      {
        command: "underline",
        label: "Underline",
        icon: <span className="text-xs underline">U</span>,
      },
      {
        command: "formatBlock",
        arg: "h1",
        label: "Heading 1",
        icon: <span className="text-xs font-bold">H1</span>,
      },
      {
        command: "formatBlock",
        arg: "h2",
        label: "Heading 2",
        icon: <span className="text-xs font-bold">H2</span>,
      },
      {
        command: "formatBlock",
        arg: "h3",
        label: "Heading 3",
        icon: <span className="text-xs font-bold">H3</span>,
      },
      {
        command: "insertUnorderedList",
        label: "Bullet List",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
            <path fillRule="evenodd" d="M6 4.75A.75.75 0 016.75 4h10.5a.75.75 0 010 1.5H6.75A.75.75 0 016 4.75zM6 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H6.75A.75.75 0 016 10zm0 5.25a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H6.75a.75.75 0 01-.75-.75zM1.99 4.75a1 1 0 011-1h.01a1 1 0 110 2h-.01a1 1 0 01-1-1zm0 5.25a1 1 0 011-1h.01a1 1 0 110 2h-.01a1 1 0 01-1-1zm1 4.25a1 1 0 100 2h.01a1 1 0 100-2h-.01z" clipRule="evenodd" />
          </svg>
        ),
      },
      {
        command: "insertOrderedList",
        label: "Numbered List",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
            <path fillRule="evenodd" d="M6 4.75A.75.75 0 016.75 4h10.5a.75.75 0 010 1.5H6.75A.75.75 0 016 4.75zM6 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H6.75A.75.75 0 016 10zm0 5.25a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H6.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
          </svg>
        ),
      },
    ];

    return (
      <div
        ref={ref}
        className={cn(
          "overflow-hidden rounded-md border transition-colors",
          error ? "border-red-500" : "border-zinc-300 dark:border-[#2D3640]",
          "focus-within:ring-2 focus-within:ring-offset-1 focus-within:ring-zinc-900 dark:focus-within:ring-[#4CCBBF] dark:focus-within:ring-offset-[#242B33]",
          disabled && "opacity-50",
          className
        )}
      >
        {/* Toolbar */}
        <div className={cn(
          "flex flex-wrap items-center gap-0.5 border-b px-2 py-1.5",
          "border-zinc-200 bg-zinc-50 dark:border-[#3D4A5C] dark:bg-[#242B33]"
        )}>
          {toolbarButtons.map((btn) => (
            <button
              key={btn.label}
              type="button"
              title={btn.label}
              disabled={disabled}
              onClick={() => {
                if (btn.command === "formatBlock" && btn.arg) {
                  execCommand(btn.command, `<${btn.arg}>`);
                } else {
                  execCommand(btn.command, btn.arg);
                }
              }}
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded transition-colors",
                "text-zinc-600 hover:bg-zinc-200 dark:text-[#9FAEC1] dark:hover:bg-[#3D4A5C]",
                disabled && "cursor-not-allowed"
              )}
            >
              {btn.icon}
            </button>
          ))}

          {/* Link button */}
          <button
            type="button"
            title="Insert Link"
            disabled={disabled}
            onClick={handleLink}
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded transition-colors",
              "text-zinc-600 hover:bg-zinc-200 dark:text-[#9FAEC1] dark:hover:bg-[#3D4A5C]",
              disabled && "cursor-not-allowed"
            )}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
              <path d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.667l3-3z" />
              <path d="M11.603 7.963a.75.75 0 00-.977 1.138 2.5 2.5 0 01.142 3.667l-3 3a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 105.656 5.656l3-3a4 4 0 00-.225-5.865z" />
            </svg>
          </button>
        </div>

        {/* Editable area */}
        <div
          ref={editorRef}
          contentEditable={!disabled}
          suppressContentEditableWarning
          onInput={handleInput}
          dangerouslySetInnerHTML={value !== undefined ? { __html: value } : undefined}
          data-placeholder={placeholder}
          style={{ minHeight }}
          className={cn(
            "prose prose-sm max-w-none p-3 text-sm outline-none",
            "bg-white text-zinc-900 dark:bg-[#2D3640] dark:text-[#E8EDF2]",
            "empty:before:pointer-events-none empty:before:text-zinc-400 empty:before:content-[attr(data-placeholder)] dark:empty:before:text-[#64748B]",
            "[&_a]:text-[#4CCBBF] [&_a]:underline",
            "[&_h1]:text-xl [&_h1]:font-bold [&_h2]:text-lg [&_h2]:font-semibold [&_h3]:text-base [&_h3]:font-semibold",
            "[&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
          )}
        />
      </div>
    );
  }
);
