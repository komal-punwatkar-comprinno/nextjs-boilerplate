"use client";

import { useState } from "react";
import { ComponentPreview } from "../_components/component-preview";
import { SectionWrapper } from "./section-wrapper";
import { DateRangePicker } from "@/components";
import type { DateRange } from "@/components";

export function DateRangeSection() {
  const [basicRange, setBasicRange] = useState<DateRange>({ start: null, end: null });
  const [presetRange, setPresetRange] = useState<DateRange>({ start: null, end: null });
  const [constrainedRange, setConstrainedRange] = useState<DateRange>({ start: null, end: null });

  const today = new Date();
  const minDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const maxDate = new Date(today.getFullYear(), today.getMonth() + 3, 0);

  const presets = [
    {
      label: "Last 7 days",
      range: () => {
        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - 7);
        return { start, end };
      },
    },
    {
      label: "Last 30 days",
      range: () => {
        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - 30);
        return { start, end };
      },
    },
    {
      label: "This month",
      range: () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth(), 1);
        return { start, end: now };
      },
    },
  ];

  return (
    <SectionWrapper
      id="date-range"
      title="Date Range Picker"
      description="Select a start and end date with optional presets and constraints."
    >
      <div className="space-y-8">
        <ComponentPreview
          title="Basic Date Range"
          code={`const [range, setRange] = useState<DateRange>({ start: null, end: null });

<DateRangePicker
  value={range}
  onChange={setRange}
  placeholder="Select date range"
/>`}
        >
          <div className="max-w-sm">
            <DateRangePicker
              value={basicRange}
              onChange={setBasicRange}
              placeholder="Select date range"
            />
          </div>
        </ComponentPreview>

        <ComponentPreview
          title="With Preset Ranges"
          code={`const presets = [
  { label: "Last 7 days", range: () => ({ start: ..., end: ... }) },
  { label: "Last 30 days", range: () => ({ start: ..., end: ... }) },
  { label: "This month", range: () => ({ start: ..., end: ... }) },
];

<DateRangePicker
  value={range}
  onChange={setRange}
  presets={presets}
  placeholder="Pick a range or preset"
/>`}
        >
          <div className="max-w-sm">
            <DateRangePicker
              value={presetRange}
              onChange={setPresetRange}
              presets={presets}
              placeholder="Pick a range or preset"
            />
          </div>
        </ComponentPreview>

        <ComponentPreview
          title="With Min / Max Constraints"
          code={`const minDate = new Date(2024, 0, 1);
const maxDate = new Date(2024, 11, 31);

<DateRangePicker
  value={range}
  onChange={setRange}
  minDate={minDate}
  maxDate={maxDate}
  placeholder="Constrained range"
/>`}
        >
          <div className="max-w-sm">
            <DateRangePicker
              value={constrainedRange}
              onChange={setConstrainedRange}
              minDate={minDate}
              maxDate={maxDate}
              placeholder="Constrained range"
            />
          </div>
        </ComponentPreview>

        <ComponentPreview
          title="Disabled & Error States"
          code={`<DateRangePicker placeholder="Disabled" disabled />
<DateRangePicker placeholder="Error state" error />`}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-lg">
            <DateRangePicker placeholder="Disabled" disabled />
            <DateRangePicker placeholder="Error state" error />
          </div>
        </ComponentPreview>
      </div>
    </SectionWrapper>
  );
}
