"use client";

import { useCallback, useState } from "react";

export interface CopyToClipboardProps {
  text: string;
  children?: React.ReactNode;
  onCopy?: () => void;
  className?: string;
}


export function CopyToClipboard({
  text,
  children,
  onCopy,
  className = "",
}: CopyToClipboardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      onCopy?.();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for insecure contexts
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      onCopy?.();
      setTimeout(() => setCopied(false), 2000);
    }
  }, [text, onCopy]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={[
        "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm transition-colors",
        "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-800",
        "dark:text-[#9FAEC1] dark:hover:bg-[#2A3441] dark:hover:text-[#E8EDF2]",
        className,
      ].join(" ")}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
    >
      {children || (
        <>
          {copied ? (
            <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
          <span className="text-xs">{copied ? "Copied!" : "Copy"}</span>
        </>
      )}
    </button>
  );
}
