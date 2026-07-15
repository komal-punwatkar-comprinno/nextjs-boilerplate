import type { Metadata } from "next";
import { SpinnerSection } from "../_sections/spinner-section";

export const metadata: Metadata = { title: "Spinners" };

export default function SpinnersPage() {
  return <div className="pb-12"><SpinnerSection /></div>;
}
