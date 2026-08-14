"use client";

import { ComponentPreview } from "../_components/component-preview";
import { SectionWrapper } from "./section-wrapper";
import { CopyToClipboard } from "@/components";

export function CopyClipboardSection() {
  return (
    <SectionWrapper id="copy-to-clipboard" title="Copy to Clipboard" description="One-click copy component for code snippets and text.">
      <div className="space-y-8">
        <ComponentPreview
          title="NPM Command"
          code={`<CopyToClipboard text="npm install next" />`}
        >
          <CopyToClipboard text="npm install next" />
        </ComponentPreview>

        <ComponentPreview
          title="API Key"
          code={`<CopyToClipboard text="sk_live_abc123xyz456def789" />`}
        >
          <CopyToClipboard text="sk_live_abc123xyz456def789" />
        </ComponentPreview>

        <ComponentPreview
          title="Code Snippet"
          code={`<CopyToClipboard text="const app = createApp({ port: 3000 });" />`}
        >
          <CopyToClipboard text="const app = createApp({ port: 3000 });" />
        </ComponentPreview>
      </div>
    </SectionWrapper>
  );
}
