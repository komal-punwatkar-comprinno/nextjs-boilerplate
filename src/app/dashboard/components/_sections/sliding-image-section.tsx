"use client";

import { ComponentPreview } from "../_components/component-preview";
import { SectionWrapper } from "./section-wrapper";
import { SlidingImage } from "@/components";

export function SlidingImageSection() {
  return (
    <SectionWrapper id="sliding-image" title="Sliding Image" description="Before/after image comparison slider with draggable divider.">
      <div className="space-y-8">
        <ComponentPreview
          title="Before / After Comparison"
          code={`<SlidingImage
  beforeSrc="/placeholder-before.jpg"
  afterSrc="/placeholder-after.jpg"
  beforeAlt="Before edit"
  afterAlt="After edit"
/>`}
        >
          <div className="flex justify-center">
            <SlidingImage
              beforeSrc="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop&q=80"
              afterSrc="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop&sat=-100&q=80"
              beforeAlt="Color photo"
              afterAlt="Grayscale photo"
            />
          </div>
        </ComponentPreview>

        <ComponentPreview
          title="Custom Size"
          code={`<SlidingImage
  beforeSrc="/photo-color.jpg"
  afterSrc="/photo-bw.jpg"
  className="max-w-sm"
/>`}
        >
          <div className="flex justify-center">
            <SlidingImage
              beforeSrc="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=250&fit=crop&q=80"
              afterSrc="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=250&fit=crop&sat=-100&q=80"
              beforeAlt="Before"
              afterAlt="After"
              className="max-w-sm"
            />
          </div>
        </ComponentPreview>
      </div>
    </SectionWrapper>
  );
}
