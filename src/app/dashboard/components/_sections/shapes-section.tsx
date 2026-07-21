"use client";

import { ComponentPreview } from "../_components/component-preview";
import { SectionWrapper } from "./section-wrapper";
import { Shapes } from "@/components";

export function ShapesSection() {
  return (
    <SectionWrapper id="shapes" title="Shapes" description="Decorative SVG shape patterns for backgrounds and accents.">
      <div className="space-y-8">
        <ComponentPreview
          title="Shape Variants"
          code={`<Shapes variant="dots" className="w-32 h-32" />
<Shapes variant="blob" className="w-32 h-32" />
<Shapes variant="circle" className="w-32 h-32" />
<Shapes variant="wave" className="w-32 h-32" />`}
        >
          <div className="flex flex-wrap items-center gap-8">
            <div className="text-center">
              <Shapes variant="dots" className="w-24 h-24" />
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Dots</p>
            </div>
            <div className="text-center">
              <Shapes variant="blob" className="w-24 h-24" />
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Blob</p>
            </div>
            <div className="text-center">
              <Shapes variant="circle" className="w-24 h-24" />
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Circle</p>
            </div>
            <div className="text-center">
              <Shapes variant="wave" className="w-48 h-16" />
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Wave</p>
            </div>
          </div>
        </ComponentPreview>

        <ComponentPreview
          title="Custom Sizes"
          code={`<Shapes variant="dots" className="w-32 h-16" />
<Shapes variant="wave" className="w-48 h-12" />`}
        >
          <div className="space-y-4">
            <Shapes variant="dots" className="w-32 h-16" />
            <Shapes variant="wave" className="w-48 h-12" />
          </div>
        </ComponentPreview>
      </div>
    </SectionWrapper>
  );
}
