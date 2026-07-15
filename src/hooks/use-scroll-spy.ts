"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section ID is currently visible in the viewport using
 * IntersectionObserver.  Designed for long single-page docs / showcases
 * where multiple sections have `id` attributes.
 *
 * @param ids - ordered list of section IDs to watch (without #)
 * @param rootMargin - observer margin, e.g. "-20% 0px -70% 0px" keeps
 *   the active item snapping to the upper portion of the viewport
 *
 * @example
 * const active = useScrollSpy(["colors","buttons","forms"]);
 * // active === "buttons" when that section is in view
 */
export function useScrollSpy(
  ids: string[],
  rootMargin = "-10% 0px -80% 0px"
): string | null {
  const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    if (ids.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first intersecting entry (topmost visible section)
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids, rootMargin]);

  return activeId;
}
