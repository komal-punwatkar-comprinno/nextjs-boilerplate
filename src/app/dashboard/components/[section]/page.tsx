import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComponentsShowcase } from "../_components/components-showcase";
import { COMPONENT_SECTION_IDS } from "@/lib/component-sections";

type Props = { params: Promise<{ section: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section } = await params;
  const title = section
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return { title };
}

export default async function ComponentSectionPage({ params }: Props) {
  const { section } = await params;

  if (!COMPONENT_SECTION_IDS.includes(section as (typeof COMPONENT_SECTION_IDS)[number])) {
    notFound();
  }

  return <ComponentsShowcase scrollTo={section} />;
}
