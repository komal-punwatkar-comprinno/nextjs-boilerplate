"use client";

import { useState } from "react";
import { ComponentPreview } from "../_components/component-preview";
import { SectionWrapper } from "./section-wrapper";
import { Checkbox, Switch, RadioGroup, RadioItem } from "@/components";

export function ChecksSection() {
  const [radioValue, setRadioValue] = useState("email");
  const [horizontalRadio, setHorizontalRadio] = useState("sm");

  return (
    <SectionWrapper
      id="checks"
      title="Checks & Switches"
      description="Checkboxes, switches, and radio groups for selection controls."
    >
      <div className="space-y-8">
        <ComponentPreview
          title="Checkboxes"
          code={`<Checkbox label="Accept terms and conditions" />
<Checkbox label="Checked by default" defaultChecked />
<Checkbox label="Indeterminate state" indeterminate />
<Checkbox label="Disabled checkbox" disabled />
<Checkbox label="Disabled checked" disabled defaultChecked />
<Checkbox label="With error" error="This field is required" />`}
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Checkbox label="Accept terms and conditions" />
            <Checkbox label="Checked by default" defaultChecked />
            <Checkbox label="Indeterminate state" indeterminate />
            <Checkbox label="Disabled checkbox" disabled />
            <Checkbox label="Disabled checked" disabled defaultChecked />
            <Checkbox label="With error" error="This field is required" />
          </div>
        </ComponentPreview>

        <ComponentPreview
          title="Switches"
          code={`<Switch label="Notifications" defaultChecked />
<Switch label="Small" size="sm" />
<Switch label="Medium (default)" size="md" defaultChecked />
<Switch label="Large" size="lg" />
<Switch label="Disabled off" disabled />
<Switch label="Disabled on" disabled defaultChecked />`}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Switch label="Notifications" defaultChecked />
            <Switch label="Small" size="sm" />
            <Switch label="Medium (default)" size="md" defaultChecked />
            <Switch label="Large" size="lg" />
            <Switch label="Disabled off" disabled />
            <Switch label="Disabled on" disabled defaultChecked />
          </div>
        </ComponentPreview>

        <ComponentPreview
          title="Radio Group — Vertical"
          code={`const [value, setValue] = useState("email");

<RadioGroup name="contact" value={value} onChange={setValue} orientation="vertical">
  <RadioItem value="email" label="Email notifications" />
  <RadioItem value="sms" label="SMS notifications" />
  <RadioItem value="push" label="Push notifications" />
  <RadioItem value="none" label="No notifications" disabled />
</RadioGroup>`}
        >
          <RadioGroup name="contact" value={radioValue} onChange={setRadioValue} orientation="vertical">
            <RadioItem value="email" label="Email notifications" />
            <RadioItem value="sms" label="SMS notifications" />
            <RadioItem value="push" label="Push notifications" />
            <RadioItem value="none" label="No notifications" disabled />
          </RadioGroup>
        </ComponentPreview>

        <ComponentPreview
          title="Radio Group — Horizontal"
          code={`const [size, setSize] = useState("sm");

<RadioGroup name="size" value={size} onChange={setSize} orientation="horizontal">
  <RadioItem value="sm" label="Small" />
  <RadioItem value="md" label="Medium" />
  <RadioItem value="lg" label="Large" />
  <RadioItem value="xl" label="Extra Large" />
</RadioGroup>`}
        >
          <RadioGroup name="size" value={horizontalRadio} onChange={setHorizontalRadio} orientation="horizontal">
            <RadioItem value="sm" label="Small" />
            <RadioItem value="md" label="Medium" />
            <RadioItem value="lg" label="Large" />
            <RadioItem value="xl" label="Extra Large" />
          </RadioGroup>
        </ComponentPreview>
      </div>
    </SectionWrapper>
  );
}
