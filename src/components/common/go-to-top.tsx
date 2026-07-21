"use client";

import { useCallback, useEffect, useState } from "react";

export interface GoToTopProps {
  threshold?: number;
  className?: string;
}

/**
 * Floating scroll-to-top button that appears after scrolling down.
 */
export function GoToTop({ threshold = 300, className = "" }: GoToTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > threshold);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={[
        "fixed bottom-6 right-6 z-40 flex h-10 w-10 items-center justify-center rounded-full shadow-lg transition-all duration-300",
        "bg-[#4CCBBF] text-white hover:bg-[#3db3a8]",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
        className,
      ].join(" ")}
    >
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
