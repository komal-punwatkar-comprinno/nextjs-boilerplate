import type { Metadata } from "next";
import { ComponentsShowcase } from "../_components/components-showcase";
export const metadata: Metadata = { title: "Tables" };
export default function TablesPage() { return <ComponentsShowcase scrollTo="tables" />; }

