"use client";

import { useState, useCallback } from "react";

interface UseCopyToClipboardReturn {
  copied: boolean;
  copy: (text: string) => Promise<void>;
  error: Error | null;
}

/**
 * Provides clipboard copy with success/error feedback.
 */
export function useCopyToClipboard(resetDelay = 2000): UseCopyToClipboardReturn {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setError(null);
        setTimeout(() => setCopied(false), resetDelay);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Copy failed"));
        setCopied(false);
      }
    },
    [resetDelay]
  );

  return { copied, copy, error };
}
