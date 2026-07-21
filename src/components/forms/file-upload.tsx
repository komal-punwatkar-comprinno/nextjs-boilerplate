"use client";

import { forwardRef, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface FileUploadProps {
  /** Accepted file types (e.g., "image/*,.pdf"). */
  accept?: string;
  /** Maximum file size in bytes. */
  maxSize?: number;
  /** Callback when a file is selected/removed. */
  onFile?: (file: File | null) => void;
  /** Show upload progress (0-100). Pass externally for async uploads. */
  progress?: number;
  /** Disabled state. */
  disabled?: boolean;
  /** Error message. */
  error?: string;
  /** Additional className. */
  className?: string;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(
  function FileUpload(
    {
      accept,
      maxSize,
      onFile,
      progress,
      disabled = false,
      error,
      className,
    },
    ref
  ) {
    const [file, setFile] = useState<File | null>(null);
    const [sizeError, setSizeError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFile = (selectedFile: File | null) => {
      setSizeError(null);
      if (selectedFile && maxSize && selectedFile.size > maxSize) {
        setSizeError(`File exceeds maximum size of ${formatFileSize(maxSize)}`);
        return;
      }
      setFile(selectedFile);
      onFile?.(selectedFile);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0] ?? null;
      handleFile(selectedFile);
    };

    const removeFile = () => {
      setFile(null);
      setSizeError(null);
      onFile?.(null);
      if (inputRef.current) inputRef.current.value = "";
    };

    const displayError = error || sizeError;

    return (
      <div ref={ref} className={cn("w-full", className)}>
        {!file ? (
          <div
            role="button"
            tabIndex={disabled ? -1 : 0}
            onClick={() => !disabled && inputRef.current?.click()}
            onKeyDown={(e) => {
              if ((e.key === "Enter" || e.key === " ") && !disabled) {
                e.preventDefault();
                inputRef.current?.click();
              }
            }}
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed p-6 transition-colors",
              "border-zinc-300 bg-zinc-50 hover:border-zinc-400 hover:bg-zinc-100",
              "dark:border-[#3D4A5C] dark:bg-[#2A3441] dark:hover:border-[#4CCBBF] dark:hover:bg-[#2D3640]",
              disabled && "cursor-not-allowed opacity-50"
            )}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-2 h-8 w-8 text-zinc-400 dark:text-[#9FAEC1]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            <span className="text-sm text-zinc-600 dark:text-[#9FAEC1]">
              Click to upload a file
            </span>
            {accept && (
              <span className="mt-1 text-xs text-zinc-400 dark:text-[#64748B]">
                Accepted: {accept}
              </span>
            )}
            {maxSize && (
              <span className="text-xs text-zinc-400 dark:text-[#64748B]">
                Max size: {formatFileSize(maxSize)}
              </span>
            )}
          </div>
        ) : (
          <div className={cn(
            "flex items-center gap-3 rounded-md border p-3",
            "border-zinc-200 bg-white dark:border-[#3D4A5C] dark:bg-[#2A3441]"
          )}>
            {/* File icon */}
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded bg-zinc-100 dark:bg-[#3D4A5C]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 text-zinc-500 dark:text-[#9FAEC1]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>

            {/* File info */}
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-sm font-medium text-zinc-900 dark:text-[#E8EDF2]">
                {file.name}
              </span>
              <span className="text-xs text-zinc-500 dark:text-[#9FAEC1]">
                {formatFileSize(file.size)}
              </span>
              {/* Progress bar */}
              {progress !== undefined && (
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-[#3D4A5C]">
                  <div
                    className="h-full rounded-full bg-[#4CCBBF] transition-all"
                    style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                  />
                </div>
              )}
            </div>

            {/* Remove button */}
            <button
              type="button"
              onClick={removeFile}
              disabled={disabled}
              className="flex-shrink-0 rounded p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:text-[#9FAEC1] dark:hover:bg-[#3D4A5C] dark:hover:text-[#E8EDF2]"
              aria-label="Remove file"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
          disabled={disabled}
          aria-hidden="true"
        />

        {displayError && (
          <p role="alert" className="mt-1 text-xs text-red-600 dark:text-red-400">
            {displayError}
          </p>
        )}
      </div>
    );
  }
);
