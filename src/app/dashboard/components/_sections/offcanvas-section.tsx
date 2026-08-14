"use client";

import { useState } from "react";
import { Offcanvas, Button } from "@/components";
import { SectionWrapper } from "./section-wrapper";

export function OffcanvasSection() {
  const [rightOpen, setRightOpen] = useState(false);
  const [leftOpen,  setLeftOpen]  = useState(false);

  return (
    <SectionWrapper id="offcanvas" title="Offcanvas">
      <div className="space-y-8">

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Placements</p>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" onClick={() => setRightOpen(true)}>
              Open Right
            </Button>
            <Button variant="secondary" onClick={() => setLeftOpen(true)}>
              Open Left
            </Button>
          </div>
        </div>

      </div>

      {/* Right drawer */}
      <Offcanvas
        isOpen={rightOpen}
        onClose={() => setRightOpen(false)}
        placement="right"
        title="Right Drawer"
      >
        <div className="space-y-4 text-sm text-zinc-600 dark:text-[#9FAEC1]">
          <p>This drawer slides in from the right edge of the viewport.</p>
          <p>It supports scrollable content, closes on backdrop click, close button, or pressing Escape.</p>
          <div className="space-y-2">
            {["Dashboard", "Analytics", "Projects", "Users", "Settings"].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-zinc-100 px-3 py-2 text-zinc-700 dark:border-[#2D3640] dark:text-[#CBD5E1]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </Offcanvas>

      {/* Left drawer */}
      <Offcanvas
        isOpen={leftOpen}
        onClose={() => setLeftOpen(false)}
        placement="left"
        title="Left Drawer"
      >
        <div className="space-y-4 text-sm text-zinc-600 dark:text-[#9FAEC1]">
          <p>This drawer slides in from the left edge — typically used for navigation menus.</p>
          <div className="space-y-2">
            {["Home", "Products", "Pricing", "Blog", "Contact"].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-zinc-100 px-3 py-2 text-zinc-700 dark:border-[#2D3640] dark:text-[#CBD5E1]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </Offcanvas>
    </SectionWrapper>
  );
}
