import type { Metadata } from "next";
import { ComponentsShowcase } from "../_components/components-showcase";
export const metadata: Metadata = { title: "Avatars" };
export default function AvatarsPage() { return <ComponentsShowcase scrollTo="avatars" />; }

