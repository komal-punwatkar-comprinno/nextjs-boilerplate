"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Tracks which section is currently active by watching scroll position.
 *
 * - Sidebar highlight updates immediately on scroll (no jank).
 * - `onActiveChange` (router.replace) is debounced — fires only after the
 *   user pauses scrolling for `urlDebounceMs` ms, so the URL update never
 *   blocks the scroll thread.
 *
 * @param ids            - ordered list of section IDs to watch
 * @param onActiveChange - called after scroll settles (safe for router.replace)
 * @param offset         - px from viewport top used as the trigger line
 * @param urlDebounceMs  - ms to wait after last scroll before updating URL
 */
export function useScrollSpy(
  ids: string[],
  onActiveChange?: (id: string) => void,
  offset = 80,
  urlDebounceMs = 150
): { activeId: string | null; forceActive: (id: string) => void } {
  const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null);

  const onChangeRef   = useRef(onActiveChange);
  const lastActiveRef = useRef<string | null>(ids[0] ?? null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { onChangeRef.current = onActiveChange; });

  const idsKey = ids.join(",");

  useEffect(() => {
    if (ids.length === 0) {
      setActiveId(null);
      lastActiveRef.current = null;
      return;
    }

    function getScrollContainer(): Element | null {
      const firstEl = document.getElementById(ids[0]!);
      if (!firstEl) return null;
      let el: Element | null = firstEl.parentElement;
      while (el) {
        const { overflowY } = window.getComputedStyle(el);
        if (overflowY === "auto" || overflowY === "scroll") return el;
        el = el.parentElement;
      }
      return null;
    }

    function getActive(): string | null {
      let result: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= offset) result = id;
      }
      return result ?? ids[0] ?? null;
    }

    function onScroll() {
      const next = getActive();
      if (!next || next === lastActiveRef.current) return;

      lastActiveRef.current = next;

      // ── Immediate: update sidebar highlight (no jank) ──────────────────
      setActiveId(next);

      // ── Debounced: update URL only after scroll settles ─────────────────
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        onChangeRef.current?.(next);
      }, urlDebounceMs);
    }

    const initTimer = setTimeout(() => {
      const container = getScrollContainer();
      const target = container ?? window;
      targetRef = target;
      target.addEventListener("scroll", onScroll, { passive: true });
      onScroll(); // set initial state
    }, 100);

    let targetRef: Element | Window | null = null;

    return () => {
      clearTimeout(initTimer);
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      if (targetRef) {
        targetRef.removeEventListener("scroll", onScroll);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey, offset, urlDebounceMs]);

  /** Force active immediately on sidebar click — bypasses debounce. */
  function forceActive(id: string) {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    lastActiveRef.current = id;
    setActiveId(id);
    onChangeRef.current?.(id); // URL updates instantly on click, not scroll
  }

  return { activeId, forceActive };
}
