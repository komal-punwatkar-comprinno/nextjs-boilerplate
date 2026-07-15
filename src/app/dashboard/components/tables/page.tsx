import type { Metadata } from "next";
import { TableSection } from "../_sections/table-section";

export const metadata: Metadata = { title: "Tables" };

export default function TablesPage() {
  return <div className="pb-12"><TableSection /></div>;
}
