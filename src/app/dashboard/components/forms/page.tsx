import type { Metadata } from "next";
import { ComponentsShowcase } from "../_components/components-showcase";
export const metadata: Metadata = { title: "Forms" };
export default function FormsPage() { return <ComponentsShowcase scrollTo="forms" />; }
