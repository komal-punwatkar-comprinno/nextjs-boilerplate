"use client";

import { useEffect, useRef } from "react";

// Components group
import { ColorSection } from "../_sections/color-section";
import { TypographySection } from "../_sections/typography-section";
import { AccordionSection } from "../_sections/accordion-section";
import { AlertsSection } from "../_sections/alerts-section";
import { AvatarSection } from "../_sections/avatar-section";
import { BadgeSection } from "../_sections/badge-section";
import { BreadcrumbSection } from "../_sections/breadcrumb-section";
import { ButtonSection } from "../_sections/button-section";
import { ButtonGroupSection } from "../_sections/button-group-section";
import { CardSection } from "../_sections/card-section";
import { CollapseSection } from "../_sections/collapse-section";
import { ColumnDividerSection } from "../_sections/column-divider-section";
import { DevicesSection } from "../_sections/devices-section";
import { DividerSection } from "../_sections/divider-section";
import { DropdownsSection } from "../_sections/dropdowns-section";
import { IconSection } from "../_sections/icon-section";
import { ListGroupSection } from "../_sections/list-group-section";
import { LegendIndicatorSection } from "../_sections/legend-indicator-section";
import { ModalSection } from "../_sections/modal-section";
import { OffcanvasSection } from "../_sections/offcanvas-section";
import { PageHeaderSection } from "../_sections/page-header-section";
import { PaginationSection } from "../_sections/pagination-section";
import { PopoversSection } from "../_sections/popovers-section";
import { ProgressSection } from "../_sections/progress-section";
import { ProfileSection } from "../_sections/profile-section";
import { ShapesSection } from "../_sections/shapes-section";
import { SlidingImageSection } from "../_sections/sliding-image-section";
import { SpinnerSection } from "../_sections/spinner-section";
import { StepsSection } from "../_sections/steps-section";
import { TabSection } from "../_sections/tab-section";
import { ToastsSection } from "../_sections/toasts-section";
import { TooltipsSection } from "../_sections/tooltips-section";

// Navbars group
import { NavbarSection } from "../_sections/navbar-section";
import { NavsSection } from "../_sections/navs-section";
import { MegaMenuSection } from "../_sections/mega-menu-section";
import { VerticalNavSection } from "../_sections/vertical-nav-section";
import { ScrollspySection } from "../_sections/scrollspy-section";

// Tables group
import { TableSection } from "../_sections/table-section";
import { DatatablesSection } from "../_sections/datatables-section";
import { StickyHeaderSection } from "../_sections/sticky-header-section";

// Basic Forms group
import { BasicFormsSection } from "../_sections/basic-forms-section";
import { ChecksSection } from "../_sections/checks-section";
import { InputGroupSection } from "../_sections/input-group-section";

// Advanced Forms group
import { AdvancedSelectSection } from "../_sections/advanced-select-section";
import { DatepickerSection } from "../_sections/datepicker-section";
import { DateRangeSection } from "../_sections/date-range-section";
import { FileUploadSection } from "../_sections/file-upload-section";
import { DropzoneSection } from "../_sections/dropzone-section";
import { WysiwygSection } from "../_sections/wysiwyg-section";
import { QuantityCounterSection } from "../_sections/quantity-counter-section";
import { CopyClipboardSection } from "../_sections/copy-clipboard-section";
import { InputMaskSection } from "../_sections/input-mask-section";
import { StepFormSection } from "../_sections/step-form-section";
import { AddFieldSection } from "../_sections/add-field-section";
import { TogglePasswordSection } from "../_sections/toggle-password-section";
import { CountCharactersSection } from "../_sections/count-characters-section";
import { FormSearchSection } from "../_sections/form-search-section";
import { ToggleSwitchSection } from "../_sections/toggle-switch-section";

// Charts group
import { ChartsSection } from "../_sections/charts-section";
import { CounterSection } from "../_sections/counter-section";
import { PieChartSection } from "../_sections/pie-chart-section";
import { StatCardSection } from "../_sections/stat-card-section";

// Others group
import { LightboxSection } from "../_sections/lightbox-section";
import { LeafletSection } from "../_sections/leaflet-section";
import { VectorMapSection } from "../_sections/vector-map-section";
import { SortableSection } from "../_sections/sortable-section";
import { StickyBlockSection } from "../_sections/sticky-block-section";
import { GoToSection } from "../_sections/go-to-section";

interface ComponentsShowcaseProps {
  scrollTo?: string;
}

export function ComponentsShowcase({ scrollTo }: ComponentsShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Set bottom padding exactly so the last section ("go-to") can scroll
  // up to just past the trigger line (80px from top) — no blank space beyond that.
  useEffect(() => {
    function calcPadding() {
      const lastSection = document.getElementById("go-to");
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

  // Scroll to section on mount (when navigating from another page via a sub-route
  // like /dashboard/components/buttons). We:
  //  1. Immediately set the correct URL via replaceState so scroll-spy can't
  //     clobber it during its 100ms init delay.
  //  2. Scroll after a short delay to let the layout paint first.
  useEffect(() => {
    if (!scrollTo) return;

    // Pin the URL to the intended section right away so that the scroll-spy
    // initialisation (which fires ~100ms after mount) doesn't overwrite it
    // with the first visible section (usually "colors").
    window.history.replaceState(null, "", `/dashboard/components/${scrollTo}`);

    const timer = setTimeout(() => {
      document.getElementById(scrollTo)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => clearTimeout(timer);
  }, [scrollTo]);

  return (
    <div ref={containerRef} className="space-y-12">
      {/* Enhanced header */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/60 bg-gradient-to-br from-white via-white to-slate-50 p-8 shadow-sm dark:border-[#2D3640] dark:from-[#242B33] dark:via-[#242B33] dark:to-[#1A1F26]">
        {/* Decorative background shapes */}
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-[#4CCBBF]/10 to-[#3B82F6]/10 blur-2xl" />
        <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-gradient-to-tr from-[#8B5CF6]/10 to-[#4CCBBF]/10 blur-xl" />
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#4CCBBF] to-[#31b0a5] shadow-lg shadow-[#4CCBBF]/20">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Component Showcase</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                60+ production-ready UI components with live preview &amp; source code
              </p>
            </div>
          </div>
          
          {/* Quick stats */}
          <div className="mt-5 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 rounded-lg bg-slate-100/80 px-3 py-1.5 text-xs font-medium text-slate-600 dark:bg-[#2D3640] dark:text-slate-300">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              UI Primitives
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-slate-100/80 px-3 py-1.5 text-xs font-medium text-slate-600 dark:bg-[#2D3640] dark:text-slate-300">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              Forms &amp; Inputs
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-slate-100/80 px-3 py-1.5 text-xs font-medium text-slate-600 dark:bg-[#2D3640] dark:text-slate-300">
              <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
              Data Visualization
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-slate-100/80 px-3 py-1.5 text-xs font-medium text-slate-600 dark:bg-[#2D3640] dark:text-slate-300">
              <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              Navigation
            </div>
          </div>
        </div>
      </div>

      {/* Components */}
      <ColorSection />
      <TypographySection />
      <AccordionSection />
      <AlertsSection />
      <AvatarSection />
      <BadgeSection />
      <BreadcrumbSection />
      <ButtonSection />
      <ButtonGroupSection />
      <CardSection />
      <CollapseSection />
      <ColumnDividerSection />
      <DevicesSection />
      <DividerSection />
      <DropdownsSection />
      <IconSection />
      <ListGroupSection />
      <LegendIndicatorSection />
      <ModalSection />
      <OffcanvasSection />
      <PageHeaderSection />
      <PaginationSection />
      <PopoversSection />
      <ProgressSection />
      <ProfileSection />
      <ShapesSection />
      <SlidingImageSection />
      <SpinnerSection />
      <StepsSection />
      <TabSection />
      <ToastsSection />
      <TooltipsSection />

      {/* Navbars */}
      <NavbarSection />
      <NavsSection />
      <MegaMenuSection />
      <VerticalNavSection />
      <ScrollspySection />

      {/* Tables */}
      <TableSection />
      <DatatablesSection />
      <StickyHeaderSection />

      {/* Basic Forms */}
      <BasicFormsSection />
      <ChecksSection />
      <InputGroupSection />

      {/* Advanced Forms */}
      <AdvancedSelectSection />
      <DatepickerSection />
      <DateRangeSection />
      <FileUploadSection />
      <DropzoneSection />
      <WysiwygSection />
      <QuantityCounterSection />
      <CopyClipboardSection />
      <InputMaskSection />
      <StepFormSection />
      <AddFieldSection />
      <TogglePasswordSection />
      <CountCharactersSection />
      <FormSearchSection />
      <ToggleSwitchSection />

      {/* Charts */}
      <ChartsSection />
      <CounterSection />
      <PieChartSection />
      <StatCardSection />

      {/* Others */}
      <LightboxSection />
      <LeafletSection />
      <VectorMapSection />
      <SortableSection />
      <StickyBlockSection />
      <GoToSection />
    </div>
  );
}
