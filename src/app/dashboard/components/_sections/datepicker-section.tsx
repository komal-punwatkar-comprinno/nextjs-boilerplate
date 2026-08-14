"use client";

import { useState } from "react";
import { ComponentPreview } from "../_components/component-preview";
import { SectionWrapper } from "./section-wrapper";
import { DatePicker } from "@/components";

export function DatepickerSection() {
  const [basicDate, setBasicDate] = useState<Date | null>(null);
  const [prefilledDate, setPrefilledDate] = useState<Date | null>(new Date());
  const [constrainedDate, setConstrainedDate] = useState<Date | null>(null);

  const today = new Date();
  const minDate = new Date(today.getFullYear(), today.getMonth(), 1);
  const maxDate = new Date(today.getFullYear(), today.getMonth() + 2, 0);

  return (
    <SectionWrapper
      id="datepicker"
      title="Datepicker"
      description="Calendar-based date selection with min/max constraints and custom formatting."
    >
      <div className="space-y-8">
        <ComponentPreview
          title="Basic Datepicker"
          code={`const [date, setDate] = useState<Date | null>(null);

<DatePicker
  value={date}
  onChange={setDate}
  placeholder="Select a date"
/>`}
        >
          <div className="max-w-xs">
            <DatePicker
              value={basicDate}
              onChange={setBasicDate}
              placeholder="Select a date"
            />
          </div>
        </ComponentPreview>

        <ComponentPreview
          title="Pre-filled Value"
          code={`const [date, setDate] = useState<Date | null>(new Date());

<DatePicker
  value={date}
  onChange={setDate}
  placeholder="Pick date"
/>`}
        >
          <div className="max-w-xs">
            <DatePicker
              value={prefilledDate}
              onChange={setPrefilledDate}
              placeholder="Pick date"
            />
          </div>
        </ComponentPreview>

        <ComponentPreview
          title="Date Constraints (Min / Max)"
          code={`const today = new Date();
const minDate = new Date(today.getFullYear(), today.getMonth(), 1);
const maxDate = new Date(today.getFullYear(), today.getMonth() + 2, 0);

<DatePicker
  value={date}
  onChange={setDate}
  minDate={minDate}
  maxDate={maxDate}
  placeholder="Current & next month only"
/>`}
        >
          <div className="max-w-xs">
            <DatePicker
              value={constrainedDate}
              onChange={setConstrainedDate}
              minDate={minDate}
              maxDate={maxDate}
              placeholder="Current & next month only"
            />
          </div>
        </ComponentPreview>

        <ComponentPreview
          title="Disabled & Error States"
          code={`<DatePicker placeholder="Disabled" disabled />
<DatePicker placeholder="Error state" error />`}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-lg">
            <DatePicker placeholder="Disabled datepicker" disabled />
            <DatePicker placeholder="Error state" error />
          </div>
        </ComponentPreview>
      </div>
    </SectionWrapper>
  );
}
