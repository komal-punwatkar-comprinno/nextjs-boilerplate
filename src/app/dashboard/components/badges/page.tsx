import type { Metadata } from "next";
import { ComponentsShowcase } from "../_components/components-showcase";
export const metadata: Metadata = { title: "Badges" };
export default function BadgesPage() { return <ComponentsShowcase scrollTo="badges" />; }

