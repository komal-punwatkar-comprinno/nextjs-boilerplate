"use client";

import { forwardRef, useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface DropzoneFile {
  file: File;
  id: string;
}

export interface DropzoneProps {
  /** Accepted file types (e.g., "image/*,.pdf"). */
  accept?: string;
  /** Maximum file size in bytes per file. */
  maxSize?: number;
  /** Maximum number of files. */
  maxFiles?: number;
  /** Callback with current file list. */
  onFiles?: (files: File[]) => void;
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

let fileIdCounter = 0;
function generateFileId(): string {
  return `file-${++fileIdCounter}-${Date.now()}`;
}

export const Dropzone = forwardRef<HTMLDivElement, DropzoneProps>(
  function Dropzone(
    {
      accept,
      maxSize,
      maxFiles,
      onFiles,
      disabled = false,
      error,
      className,
    },
    ref
  ) {
    const [files, setFiles] = useState<DropzoneFile[]>([]);
    const [isDragOver, setIsDragOver] = useState(false);
    const [localError, setLocalError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const acceptedTypes = accept?.split(",").map((t) => t.trim()) ?? [];

    const isAccepted = useCallback(
      (file: File) => {
        if (acceptedTypes.length === 0) return true;
        return acceptedTypes.some((type) => {
          if (type.startsWith(".")) {
            return file.name.toLowerCase().endsWith(type.toLowerCase());
          }
          if (type.endsWith("/*")) {
            return file.type.startsWith(type.replace("/*", "/"));
          }
          return file.type === type;
        });
      },
      [acceptedTypes]
    );

    const addFiles = useCallback(
      (newFiles: FileList | File[]) => {
        setLocalError(null);
        const incoming = Array.from(newFiles);
        const valid: DropzoneFile[] = [];

        for (const file of incoming) {
          if (!isAccepted(file)) {
            setLocalError(`File type not accepted: ${file.name}`);
            continue;
          }
          if (maxSize && file.size > maxSize) {
            setLocalError(`File too large: ${file.name} (max ${formatFileSize(maxSize)})`);
            continue;
          }
          valid.push({ file, id: generateFileId() });
        }

        setFiles((prev) => {
          let next = [...prev, ...valid];
          if (maxFiles && next.length > maxFiles) {
            setLocalError(`Maximum ${maxFiles} files allowed`);
            next = next.slice(0, maxFiles);
          }
          onFiles?.(next.map((f) => f.file));
          return next;
        });
      },
      [isAccepted, maxSize, maxFiles, onFiles]
    );

    const removeFile = (id: string) => {
      setFiles((prev) => {
        const next = prev.filter((f) => f.id !== id);
        onFiles?.(next.map((f) => f.file));
        return next;
      });
      setLocalError(null);
    };

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
      if (!disabled && e.dataTransfer.files.length > 0) {
        addFiles(e.dataTransfer.files);
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        addFiles(e.target.files);
      }
      if (inputRef.current) inputRef.current.value = "";
    };

    const displayError = error || localError;

    return (
      <div ref={ref} className={cn("w-full", className)}>
        {/* Drop zone */}
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
          onDragOver={handleDragOver}
          onDragEnter={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed p-6 transition-colors",
            isDragOver
              ? "border-[#4CCBBF] bg-[#4CCBBF]/10 dark:border-[#4CCBBF] dark:bg-[#4CCBBF]/10"
              : "border-zinc-300 bg-zinc-50 hover:border-zinc-400 dark:border-[#3D4A5C] dark:bg-[#2A3441] dark:hover:border-[#4CCBBF]",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-2 h-8 w-8 text-zinc-400 dark:text-[#9FAEC1]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
          </svg>
          <span className="text-sm font-medium text-zinc-600 dark:text-[#E8EDF2]">
            {isDragOver ? "Drop files here" : "Drag & drop files here"}
          </span>
          <span className="mt-1 text-xs text-zinc-400 dark:text-[#9FAEC1]">
            or click to browse
          </span>
          {(accept || maxSize || maxFiles) && (
            <div className="mt-2 flex gap-3 text-xs text-zinc-400 dark:text-[#64748B]">
              {accept && <span>{accept}</span>}
              {maxSize && <span>Max: {formatFileSize(maxSize)}</span>}
              {maxFiles && <span>Up to {maxFiles} files</span>}
            </div>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple
          onChange={handleChange}
          className="hidden"
          disabled={disabled}
          aria-hidden="true"
        />

        {/* File list */}
        {files.length > 0 && (
          <ul className="mt-3 space-y-2">
            {files.map((f) => (
              <li
                key={f.id}
                className={cn(
                  "flex items-center gap-3 rounded-md border px-3 py-2",
                  "border-zinc-200 bg-white dark:border-[#3D4A5C] dark:bg-[#2A3441]"
                )}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 flex-shrink-0 text-zinc-400 dark:text-[#9FAEC1]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-sm text-zinc-900 dark:text-[#E8EDF2]">{f.file.name}</span>
                  <span className="text-xs text-zinc-500 dark:text-[#9FAEC1]">{formatFileSize(f.file.size)}</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(f.id)}
                  className="flex-shrink-0 rounded p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:text-[#9FAEC1] dark:hover:bg-[#3D4A5C] dark:hover:text-[#E8EDF2]"
                  aria-label={`Remove ${f.file.name}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}

        {displayError && (
          <p role="alert" className="mt-1 text-xs text-red-600 dark:text-red-400">
            {displayError}
          </p>
        )}
      </div>
    );
  }
);
