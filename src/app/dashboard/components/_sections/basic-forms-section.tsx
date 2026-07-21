"use client";

import { ComponentPreview } from "../_components/component-preview";
import { SectionWrapper } from "./section-wrapper";
import { Input, Select, Textarea, Icon } from "@/components";

export function BasicFormsSection() {
  return (
    <SectionWrapper
      id="basic-forms"
      title="Basic Forms"
      description="Input, Select, and Textarea components with labels, validation states, hints, and addons."
    >
      <div className="space-y-8">
        <ComponentPreview
          title="Input Variants"
          code={`<Input label="Full Name" placeholder="Enter your name" required />
<Input label="Email" placeholder="you@example.com" hint="We'll never share your email." />
<Input label="Password" type="password" placeholder="••••••••" error="Password must be at least 8 characters." />
<Input label="Disabled" placeholder="Cannot edit" disabled />`}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input label="Full Name" placeholder="Enter your name" required />
            <Input label="Email" placeholder="you@example.com" hint="We'll never share your email." />
            <Input label="Password" type="password" placeholder="••••••••" error="Password must be at least 8 characters." />
            <Input label="Disabled" placeholder="Cannot edit" disabled />
          </div>
        </ComponentPreview>

        <ComponentPreview
          title="Input with Addons"
          code={`<Input label="Search" placeholder="Search..." leftAddon={<Icon name="search" size="sm" />} />
<Input label="Website" placeholder="yoursite.com" leftAddon={<span className="text-xs">https://</span>} />
<Input label="Amount" placeholder="0.00" leftAddon={<span className="text-xs font-medium">$</span>} rightAddon={<span className="text-xs">USD</span>} />`}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Input label="Search" placeholder="Search..." leftAddon={<Icon name="search" size="sm" />} />
            <Input label="Website" placeholder="yoursite.com" leftAddon={<span className="text-xs">https://</span>} />
            <Input label="Amount" placeholder="0.00" leftAddon={<span className="text-xs font-medium">$</span>} rightAddon={<span className="text-xs">USD</span>} />
          </div>
        </ComponentPreview>

        <ComponentPreview
          title="Select Dropdown"
          code={`<Select
  label="Country"
  placeholder="Choose a country"
  options={[
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
    { value: "au", label: "Australia" },
  ]}
  hint="Select your country of residence."
/>
<Select
  label="Status"
  options={[
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "pending", label: "Pending" },
  ]}
  error="Please select a valid status."
/>
<Select label="Disabled" options={[{ value: "locked", label: "Locked" }]} disabled />`}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Select
              label="Country"
              placeholder="Choose a country"
              options={[
                { value: "us", label: "United States" },
                { value: "uk", label: "United Kingdom" },
                { value: "ca", label: "Canada" },
                { value: "au", label: "Australia" },
              ]}
              hint="Select your country of residence."
            />
            <Select
              label="Status"
              options={[
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
                { value: "pending", label: "Pending" },
              ]}
              error="Please select a valid status."
            />
            <Select label="Disabled" options={[{ value: "locked", label: "Locked" }]} disabled />
          </div>
        </ComponentPreview>

        <ComponentPreview
          title="Textarea"
          code={`<Textarea label="Message" placeholder="Write your message here..." rows={4} hint="Max 500 characters." />
<Textarea label="Bio" placeholder="Tell us about yourself..." rows={3} error="Bio cannot be empty." />
<Textarea label="Notes" placeholder="Disabled textarea" rows={3} disabled />`}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Textarea label="Message" placeholder="Write your message here..." rows={4} hint="Max 500 characters." />
            <Textarea label="Bio" placeholder="Tell us about yourself..." rows={3} error="Bio cannot be empty." />
          </div>
          <div className="mt-4">
            <Textarea label="Notes" placeholder="Disabled textarea" rows={3} disabled />
          </div>
        </ComponentPreview>
      </div>
    </SectionWrapper>
  );
}
