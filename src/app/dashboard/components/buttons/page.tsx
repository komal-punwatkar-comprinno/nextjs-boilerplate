import type { Metadata } from "next";
import { ComponentsShowcase } from "../_components/components-showcase";
export const metadata: Metadata = { title: "Buttons" };
export default function ButtonsPage() { return <ComponentsShowcase scrollTo="buttons" />; }

