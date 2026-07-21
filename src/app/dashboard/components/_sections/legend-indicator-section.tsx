"use client";

import { ComponentPreview } from "../_components/component-preview";
import { SectionWrapper } from "./section-wrapper";
import { LegendIndicator } from "@/components";

export function LegendIndicatorSection() {
  return (
    <SectionWrapper id="legend-indicator" title="Legend Indicator" description="Color-coded labels for chart legends and status indicators.">
      <div className="space-y-8">
        <ComponentPreview
          title="Basic Indicators"
          code={`<LegendIndicator color="#4CCBBF" label="Active Users" />
<LegendIndicator color="#ED495D" label="Churned" />
<LegendIndicator color="#3B82F6" label="New Signups" />
<LegendIndicator color="#F59E0B" label="Pending" />`}
        >
          <div className="flex flex-wrap gap-6">
            <LegendIndicator color="#4CCBBF" label="Active Users" />
            <LegendIndicator color="#ED495D" label="Churned" />
            <LegendIndicator color="#3B82F6" label="New Signups" />
            <LegendIndicator color="#F59E0B" label="Pending" />
          </div>
        </ComponentPreview>

        <ComponentPreview
          title="Chart Legend Example"
          code={`<div className="flex gap-6">
  <LegendIndicator color="#8B5CF6" label="Revenue" />
  <LegendIndicator color="#10B981" label="Profit" />
  <LegendIndicator color="#EC4899" label="Expenses" />
</div>`}
        >
          <div className="flex flex-wrap gap-6">
            <LegendIndicator color="#8B5CF6" label="Revenue" />
            <LegendIndicator color="#10B981" label="Profit" />
            <LegendIndicator color="#EC4899" label="Expenses" />
          </div>
        </ComponentPreview>
      </div>
    </SectionWrapper>
  );
}
