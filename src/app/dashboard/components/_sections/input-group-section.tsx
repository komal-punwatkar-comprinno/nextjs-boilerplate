"use client";

import { ComponentPreview } from "../_components/component-preview";
import { SectionWrapper } from "./section-wrapper";
import { InputGroup, Input, Icon } from "@/components";

export function InputGroupSection() {
  return (
    <SectionWrapper
      id="input-group"
      title="Input Group"
      description="Combine inputs with prepended or appended addons for contextual formatting."
    >
      <div className="space-y-8">
        <ComponentPreview
          title="Text Addons"
          code={`<InputGroup prepend="@">
  <Input placeholder="Username" />
</InputGroup>

<InputGroup append=".com">
  <Input placeholder="Domain name" />
</InputGroup>

<InputGroup prepend="https://" append=".io">
  <Input placeholder="your-project" />
</InputGroup>`}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <InputGroup prepend="@">
              <Input placeholder="Username" />
            </InputGroup>
            <InputGroup append=".com">
              <Input placeholder="Domain name" />
            </InputGroup>
            <InputGroup prepend="https://" append=".io">
              <Input placeholder="your-project" />
            </InputGroup>
          </div>
        </ComponentPreview>

        <ComponentPreview
          title="Currency & Units"
          code={`<InputGroup prepend="$">
  <Input placeholder="0.00" type="number" />
</InputGroup>

<InputGroup prepend="€" append="EUR">
  <Input placeholder="Amount" type="number" />
</InputGroup>

<InputGroup append="kg">
  <Input placeholder="Weight" type="number" />
</InputGroup>

<InputGroup append="%">
  <Input placeholder="0" type="number" />
</InputGroup>`}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <InputGroup prepend="$">
              <Input placeholder="0.00" type="number" />
            </InputGroup>
            <InputGroup prepend="€" append="EUR">
              <Input placeholder="Amount" type="number" />
            </InputGroup>
            <InputGroup append="kg">
              <Input placeholder="Weight" type="number" />
            </InputGroup>
            <InputGroup append="%">
              <Input placeholder="0" type="number" />
            </InputGroup>
          </div>
        </ComponentPreview>

        <ComponentPreview
          title="With Icons"
          code={`<InputGroup prepend={<Icon name="search" size="sm" />}>
  <Input placeholder="Search..." />
</InputGroup>

<InputGroup prepend={<Icon name="mail" size="sm" />}>
  <Input placeholder="Email address" type="email" />
</InputGroup>

<InputGroup prepend={<Icon name="lock" size="sm" />} append={<Icon name="eye" size="sm" />}>
  <Input placeholder="Password" type="password" />
</InputGroup>`}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <InputGroup prepend={<Icon name="search" size="sm" />}>
              <Input placeholder="Search..." />
            </InputGroup>
            <InputGroup prepend={<Icon name="mail" size="sm" />}>
              <Input placeholder="Email address" type="email" />
            </InputGroup>
            <InputGroup prepend={<Icon name="lock" size="sm" />} append={<Icon name="eye" size="sm" />}>
              <Input placeholder="Password" type="password" />
            </InputGroup>
          </div>
        </ComponentPreview>
      </div>
    </SectionWrapper>
  );
}
