"use client";

import { useCallback } from "react";
import { ComponentPreview } from "../_components/component-preview";
import { SectionWrapper } from "./section-wrapper";

export function GoToSection() {
  const scrollToTop = useCallback(() => {
    // The dashboard uses <main> with overflow-y-auto, not window scroll
    const main = document.querySelector("main");
    if (main) {
      main.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  return (
    <SectionWrapper id="go-to" title="Scroll to Top" description="Floating button that smoothly scrolls to the top of the page.">
      <div className="space-y-8">
        <ComponentPreview
          title="Click to Scroll Up"
          code={`import { GoToTop } from "@/components";

// Add to your layout — appears automatically after scrolling 300px
<GoToTop threshold={300} />

// Or build a custom scroll-to-top:
function scrollToTop() {
  const main = document.querySelector("main");
  if (main) {
    main.scrollTo({ top: 0, behavior: "smooth" });
  }
}`}
        >
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={scrollToTop}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4CCBBF] text-white shadow-lg transition-all hover:bg-[#3db3a8] hover:scale-110 active:scale-95"
              aria-label="Scroll to top"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            </button>
            <p className="text-sm text-zinc-600 dark:text-[#9FAEC1]">
              Click the button to scroll back to the top of the component showcase.
            </p>
          </div>
        </ComponentPreview>
      </div>
    </SectionWrapper>
  );
}
