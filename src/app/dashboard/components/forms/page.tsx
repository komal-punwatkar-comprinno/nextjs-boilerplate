import type { Metadata } from "next";
import { FormSection } from "../_sections/form-section";

export const metadata: Metadata = { title: "Forms" };

export default function FormsPage() {
  return <div className="pb-12"><FormSection /></div>;
}
