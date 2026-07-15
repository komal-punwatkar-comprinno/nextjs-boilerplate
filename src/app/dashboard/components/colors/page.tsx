import type { Metadata } from "next";
import { ComponentsShowcase } from "../_components/components-showcase";
export const metadata: Metadata = { title: "Colors" };
export default function ColorsPage() { return <ComponentsShowcase scrollTo="colors" />; }
