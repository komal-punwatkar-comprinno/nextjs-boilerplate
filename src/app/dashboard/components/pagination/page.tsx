import type { Metadata } from "next";
import { PaginationSection } from "../_sections/pagination-section";

export const metadata: Metadata = { title: "Pagination" };

export default function PaginationPage() {
  return <div className="pb-12"><PaginationSection /></div>;
}
