import type { Metadata } from "next";
import { ButtonSection } from "../_sections/button-section";

export const metadata: Metadata = { title: "Buttons" };

export default function ButtonsPage() {
  return <div className="pb-12"><ButtonSection /></div>;
}
