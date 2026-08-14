import type { Metadata } from "next";
import { ComponentsShowcase } from "../_components/components-showcase";
export const metadata: Metadata = { title: "Icons" };
export default function IconsPage() { return <ComponentsShowcase scrollTo="icons" />; }

