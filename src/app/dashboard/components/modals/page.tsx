import type { Metadata } from "next";
import { ComponentsShowcase } from "../_components/components-showcase";
export const metadata: Metadata = { title: "Modals" };
export default function ModalsPage() { return <ComponentsShowcase scrollTo="modals" />; }
