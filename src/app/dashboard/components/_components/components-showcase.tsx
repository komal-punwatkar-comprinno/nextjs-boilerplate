"use client";

import { useEffect, useRef } from "react";
import { ColorSection } from "../_sections/color-section";
import { TypographySection } from "../_sections/typography-section";
import { ButtonSection } from "../_sections/button-section";
import { BadgeSection } from "../_sections/badge-section";
import { FormSection } from "../_sections/form-section";
import { CardSection } from "../_sections/card-section";
import { AvatarSection } from "../_sections/avatar-section";
import { IconSection } from "../_sections/icon-section";
import { SpinnerSection } from "../_sections/spinner-section";
import { PaginationSection } from "../_sections/pagination-section";
import { ModalSection } from "../_sections/modal-section";
import { TableSection } from "../_sections/table-section";

interface ComponentsShowcaseProps {
  scrollTo?: string;
}

export function ComponentsShowcase({ scrollTo }: ComponentsShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Set bottom padding exactly so the last section ("tables") can scroll
  // up to just past the trigger line (80px from top) — no blank space beyond that.
  useEffect(() => {
    function calcPadding() {
      const lastSection = document.getElementById("tables");
      const container = containerRef.current;
      if (!lastSection || !container) return;

      // Scrollable parent
      let scrollEl: Element | null = container.parentElement;
      while (scrollEl) {
        const { overflowY } = window.getComputedStyle(scrollEl);
        if (overflowY === "auto" || overflowY === "scroll") break;
        scrollEl = scrollEl.parentElement;
      }
      if (!scrollEl) return;

      const viewportHeight = scrollEl.clientHeight;
      const lastSectionHeight = lastSection.getBoundingClientRect().height;

      // We need the last section top to reach offset (80px).
      // padding = viewportHeight - lastSectionHeight - offset
      const padding = Math.max(0, viewportHeight - lastSectionHeight - 80);
      container.style.paddingBottom = `${padding}px`;
    }

    calcPadding();
    window.addEventListener("resize", calcPadding);
    return () => window.removeEventListener("resize", calcPadding);
  }, []);

  // Scroll to section on mount (when navigating from another page)
  useEffect(() => {
    if (!scrollTo) return;
    const timer = setTimeout(() => {
      document.getElementById(scrollTo)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => clearTimeout(timer);
  }, [scrollTo]);

  return (
    <div ref={containerRef} className="space-y-16">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Component Showcase</h1>
        <p className="mt-1 text-sm text-slate-500">
          All UI primitives — scroll to explore or click a section in the sidebar.
        </p>
      </div>

      <ColorSection />
      <TypographySection />
      <ButtonSection />
      <BadgeSection />
      <FormSection />
      <CardSection />
      <AvatarSection />
      <IconSection />
      <SpinnerSection />
      <PaginationSection />
      <ModalSection />
      <TableSection />
    </div>
  );
}
