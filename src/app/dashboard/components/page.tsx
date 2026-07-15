import type { Metadata } from "next";
import { ColorSection } from "./_sections/color-section";
import { TypographySection } from "./_sections/typography-section";
import { ButtonSection } from "./_sections/button-section";
import { BadgeSection } from "./_sections/badge-section";
import { FormSection } from "./_sections/form-section";
import { CardSection } from "./_sections/card-section";
import { AvatarSection } from "./_sections/avatar-section";
import { IconSection } from "./_sections/icon-section";
import { SpinnerSection } from "./_sections/spinner-section";
import { PaginationSection } from "./_sections/pagination-section";
import { ModalSection } from "./_sections/modal-section";
import { TableSection } from "./_sections/table-section";

export const metadata: Metadata = {
  title: "Components",
  description: "Full design system component showcase.",
};

export default function ComponentsPage() {
  return (
    <div className="space-y-16 pb-16">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Component Showcase</h1>
        <p className="mt-1 text-sm text-slate-500">
          All UI primitives — scroll to explore or click a section in the sidebar.
        </p>
      </div>

      {/* Each section id must match COMPONENT_SECTION_IDS in sidebar.tsx */}
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
