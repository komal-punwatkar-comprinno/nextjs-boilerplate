"use client";

import { useState } from "react";
import { ComponentPreview } from "../_components/component-preview";
import { SectionWrapper } from "./section-wrapper";
import { WysiwygEditor } from "@/components";

export function WysiwygSection() {
  const [content, setContent] = useState(
    "<p>Hello <strong>world</strong>! This is a rich text editor with <em>formatting</em> support.</p>"
  );
  const [emptyContent, setEmptyContent] = useState("");

  return (
    <SectionWrapper id="wysiwyg" title="WYSIWYG Editor" description="Rich text editor with toolbar formatting controls.">
      <div className="space-y-8">
        <ComponentPreview
          title="With Default Content"
          code={`const [content, setContent] = useState(
  "<p>Hello <strong>world</strong>!</p>"
);

<WysiwygEditor
  value={content}
  onChange={setContent}
  placeholder="Write something..."
/>`}
        >
          <WysiwygEditor
            value={content}
            onChange={setContent}
            placeholder="Write something..."
          />
        </ComponentPreview>

        <ComponentPreview
          title="Empty with Placeholder"
          code={`const [content, setContent] = useState("");

<WysiwygEditor
  value={content}
  onChange={setContent}
  placeholder="Start typing your content here..."
  minHeight={150}
/>`}
        >
          <WysiwygEditor
            value={emptyContent}
            onChange={setEmptyContent}
            placeholder="Start typing your content here..."
            minHeight={150}
          />
        </ComponentPreview>
      </div>
    </SectionWrapper>
  );
}
