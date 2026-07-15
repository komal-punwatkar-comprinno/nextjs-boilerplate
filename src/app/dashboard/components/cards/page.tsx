import type { Metadata } from "next";
import { CardSection } from "../_sections/card-section";

export const metadata: Metadata = { title: "Cards" };

export default function CardsPage() {
  return <div className="pb-12"><CardSection /></div>;
}
