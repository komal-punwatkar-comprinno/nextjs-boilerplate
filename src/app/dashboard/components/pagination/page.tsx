import type { Metadata } from "next";
import { ComponentsShowcase } from "../_components/components-showcase";
export const metadata: Metadata = { title: "Pagination" };
export default function PaginationPage() { return <ComponentsShowcase scrollTo="pagination" />; }

