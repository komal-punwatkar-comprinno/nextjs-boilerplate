import type { Metadata } from "next";
import { ComponentsShowcase } from "./_components/components-showcase";

export const metadata: Metadata = {
  title: "Components",
  description: "Full design system component showcase.",
};

export default function ComponentsPage() {
  return <ComponentsShowcase />;
}

