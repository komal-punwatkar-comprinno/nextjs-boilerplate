"use client";

import { ComponentPreview } from "../_components/component-preview";
import { SectionWrapper } from "./section-wrapper";
import { ChartPie } from "@/components";

const browserData = [
  { label: "Chrome", value: 65, color: "#4CCBBF" },
  { label: "Firefox", value: 20, color: "#3B82F6" },
  { label: "Safari", value: 15, color: "#F59E0B" },
];

const trafficData = [
  { label: "Organic", value: 45, color: "#10B981" },
  { label: "Direct", value: 25, color: "#6366F1" },
  { label: "Referral", value: 18, color: "#F59E0B" },
  { label: "Social", value: 12, color: "#EC4899" },
];

export function PieChartSection() {
  return (
    <SectionWrapper id="pie-chart" title="Pie Chart" description="Circular chart for proportional data display.">
      <div className="space-y-8">
        <ComponentPreview
          title="Browser Market Share"
          code={`<ChartPie
  data={[
    { label: "Chrome", value: 65, color: "#4CCBBF" },
    { label: "Firefox", value: 20, color: "#3B82F6" },
    { label: "Safari", value: 15, color: "#F59E0B" },
  ]}
  size={180}
/>`}
        >
          <div className="flex justify-center">
            <ChartPie data={browserData} size={180} />
          </div>
        </ComponentPreview>

        <ComponentPreview
          title="Traffic Sources"
          code={`<ChartPie
  data={[
    { label: "Organic", value: 45, color: "#10B981" },
    { label: "Direct", value: 25, color: "#6366F1" },
    { label: "Referral", value: 18, color: "#F59E0B" },
    { label: "Social", value: 12, color: "#EC4899" },
  ]}
  size={180}
/>`}
        >
          <div className="flex justify-center">
            <ChartPie data={trafficData} size={180} />
          </div>
        </ComponentPreview>
      </div>
    </SectionWrapper>
  );
}
