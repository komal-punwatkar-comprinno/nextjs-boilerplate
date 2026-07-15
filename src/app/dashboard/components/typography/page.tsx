import type { Metadata } from "next";
import { TypographySection } from "../_sections/typography-section";

export const metadata: Metadata = { title: "Typography" };

export default function TypographyPage() {
  return <div className="pb-12"><TypographySection /></div>;
}
