import type { Metadata } from "next";
import { BadgeSection } from "../_sections/badge-section";

export const metadata: Metadata = { title: "Badges" };

export default function BadgesPage() {
  return <div className="pb-12"><BadgeSection /></div>;
}
