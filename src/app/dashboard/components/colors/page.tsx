import type { Metadata } from "next";
import { ColorSection } from "../_sections/color-section";

export const metadata: Metadata = { title: "Colors" };

export default function ColorsPage() {
  return <div className="pb-12"><ColorSection /></div>;
}
