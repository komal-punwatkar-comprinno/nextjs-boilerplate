import type { Metadata } from "next";
import { IconSection } from "../_sections/icon-section";

export const metadata: Metadata = { title: "Icons" };

export default function IconsPage() {
  return <div className="pb-12"><IconSection /></div>;
}
