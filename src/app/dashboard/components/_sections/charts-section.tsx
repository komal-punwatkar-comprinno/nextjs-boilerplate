"use client";

import { ComponentPreview } from "../_components/component-preview";
import { SectionWrapper } from "./section-wrapper";
import { ChartArea, ChartBar, ChartLine } from "@/components";

const revenueData = [
  { label: "Jan", value: 40 },
  { label: "Feb", value: 65 },
  { label: "Mar", value: 55 },
  { label: "Apr", value: 80 },
  { label: "May", value: 72 },
  { label: "Jun", value: 95 },
  { label: "Jul", value: 88 },
  { label: "Aug", value: 110 },
  { label: "Sep", value: 98 },
  { label: "Oct", value: 120 },
  { label: "Nov", value: 115 },
  { label: "Dec", value: 135 },
];

const weeklyActivity = [
  { label: "Mon", value: 30 },
  { label: "Tue", value: 55 },
  { label: "Wed", value: 45 },
  { label: "Thu", value: 70 },
  { label: "Fri", value: 60 },
  { label: "Sat", value: 35 },
  { label: "Sun", value: 25 },
];

const weeklyGrowth = [
  { label: "W1", value: 20 },
  { label: "W2", value: 45 },
  { label: "W3", value: 38 },
  { label: "W4", value: 62 },
  { label: "W5", value: 55 },
  { label: "W6", value: 78 },
  { label: "W7", value: 72 },
  { label: "W8", value: 90 },
];

export function ChartsSection() {
  return (
    <SectionWrapper id="charts" title="Charts" description="Area, bar, and line charts for data visualization.">
      <div className="space-y-8">
        <ComponentPreview
          title="Area Chart"
          code={`<ChartArea
  data={[
    { label: "Jan", value: 40 },
    { label: "Feb", value: 65 },
    { label: "Mar", value: 55 },
    { label: "Apr", value: 80 },
    { label: "May", value: 72 },
    { label: "Jun", value: 95 },
    { label: "Jul", value: 88 },
    { label: "Aug", value: 110 },
    { label: "Sep", value: 98 },
    { label: "Oct", value: 120 },
    { label: "Nov", value: 115 },
    { label: "Dec", value: 135 },
  ]}
  height={140}
/>`}
        >
          <div className="max-w-md">
            <ChartArea data={revenueData} height={140} />
          </div>
        </ComponentPreview>

        <ComponentPreview
          title="Bar Chart"
          code={`<ChartBar
  data={[
    { label: "Mon", value: 30 },
    { label: "Tue", value: 55 },
    { label: "Wed", value: 45 },
    { label: "Thu", value: 70 },
    { label: "Fri", value: 60 },
    { label: "Sat", value: 35 },
    { label: "Sun", value: 25 },
  ]}
  height={140}
/>`}
        >
          <div className="max-w-md">
            <ChartBar data={weeklyActivity} height={140} />
          </div>
        </ComponentPreview>

        <ComponentPreview
          title="Line Chart"
          code={`<ChartLine
  data={[
    { label: "W1", value: 20 },
    { label: "W2", value: 45 },
    { label: "W3", value: 38 },
    { label: "W4", value: 62 },
    { label: "W5", value: 55 },
    { label: "W6", value: 78 },
    { label: "W7", value: 72 },
    { label: "W8", value: 90 },
  ]}
  height={140}
/>`}
        >
          <div className="max-w-md">
            <ChartLine data={weeklyGrowth} height={140} />
          </div>
        </ComponentPreview>
      </div>
    </SectionWrapper>
  );
}
