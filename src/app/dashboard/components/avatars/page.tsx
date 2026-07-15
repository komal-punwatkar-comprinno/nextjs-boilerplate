import type { Metadata } from "next";
import { AvatarSection } from "../_sections/avatar-section";

export const metadata: Metadata = { title: "Avatars" };

export default function AvatarsPage() {
  return <div className="pb-12"><AvatarSection /></div>;
}
