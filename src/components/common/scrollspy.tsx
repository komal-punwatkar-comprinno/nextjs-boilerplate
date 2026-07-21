"use client";

import { useCallback, useEffect, useState } from "react";

export interface ScrollspyProps {
  ids: string[];
  offset?: number;
  children: (activeId: string | null) => React.ReactNode;
}

/**
 * Highlights active navigation link based on scroll position.
 * Uses a render prop pattern — passes the currently active section ID to children.
 */
export function Scrollspy({ ids, offset = 80, children }: ScrollspyProps) {
  const [activeId, setActiveId] = useState<string | null>(ids[0] || null);

  const handleScroll = useCallback(() => {
    let currentId: string | null = null;

    for (const id of ids) {
      const el = document.getElementById(id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top <= offset) {
        currentId = id;
      }
    }

    // If we're at the very top, select first section
    if (currentId === null && ids.length > 0) {
      currentId = ids[0];
    }

    setActiveId(currentId);
  }, [ids, offset]);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return <>{children(activeId)}</>;
}
