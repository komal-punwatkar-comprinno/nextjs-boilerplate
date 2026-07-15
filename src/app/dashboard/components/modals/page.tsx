import type { Metadata } from "next";
import { ModalSection } from "../_sections/modal-section";

export const metadata: Metadata = { title: "Modals" };

export default function ModalsPage() {
  return <div className="pb-12"><ModalSection /></div>;
}
