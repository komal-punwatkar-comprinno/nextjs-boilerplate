import type { Metadata } from "next";
import { ComponentsShowcase } from "../_components/components-showcase";
export const metadata: Metadata = { title: "Cards" };
export default function CardsPage() { return <ComponentsShowcase scrollTo="cards" />; }

