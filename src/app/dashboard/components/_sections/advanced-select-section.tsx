"use client";

import { useState } from "react";
import { ComponentPreview } from "../_components/component-preview";
import { SectionWrapper } from "./section-wrapper";
import { AdvancedSelect } from "@/components";

const frameworkOptions = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "SolidJS" },
  { value: "next", label: "Next.js" },
  { value: "nuxt", label: "Nuxt" },
  { value: "remix", label: "Remix" },
];

const countryOptions = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
  { value: "au", label: "Australia" },
  { value: "br", label: "Brazil" },
];

const roleOptions = [
  { value: "admin", label: "Administrator" },
  { value: "editor", label: "Editor" },
  { value: "viewer", label: "Viewer" },
  { value: "moderator", label: "Moderator" },
  { value: "guest", label: "Guest", disabled: true },
];

export function AdvancedSelectSection() {
  const [singleValue, setSingleValue] = useState<string | string[]>("");
  const [multiValue, setMultiValue] = useState<string | string[]>([]);
  const [creatableValue, setCreatableValue] = useState<string | string[]>([]);

  return (
    <SectionWrapper
      id="advanced-select"
      title="Advanced Select"
      description="Searchable, multi-select dropdown with create-new-option support."
    >
      <div className="space-y-8">
        <ComponentPreview
          title="Single Select — Searchable"
          code={`const [value, setValue] = useState("");

<AdvancedSelect
  options={[
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
    { value: "de", label: "Germany" },
  ]}
  value={value}
  onChange={setValue}
  searchable
  placeholder="Search countries..."
/>`}
        >
          <div className="max-w-sm">
            <AdvancedSelect
              options={countryOptions}
              value={singleValue}
              onChange={setSingleValue}
              searchable
              placeholder="Search countries..."
            />
          </div>
        </ComponentPreview>

        <ComponentPreview
          title="Multi Select"
          code={`const [selected, setSelected] = useState<string[]>([]);

<AdvancedSelect
  options={[
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte" },
  ]}
  value={selected}
  onChange={setSelected}
  multiple
  searchable
  placeholder="Select frameworks..."
/>`}
        >
          <div className="max-w-md">
            <AdvancedSelect
              options={frameworkOptions}
              value={multiValue}
              onChange={setMultiValue}
              multiple
              searchable
              placeholder="Select frameworks..."
            />
          </div>
        </ComponentPreview>

        <ComponentPreview
          title="Creatable Multi Select"
          code={`const [tags, setTags] = useState<string[]>([]);

<AdvancedSelect
  options={[
    { value: "admin", label: "Administrator" },
    { value: "editor", label: "Editor" },
    { value: "viewer", label: "Viewer" },
  ]}
  value={tags}
  onChange={setTags}
  multiple
  searchable
  creatable
  placeholder="Select or create roles..."
/>`}
        >
          <div className="max-w-md">
            <AdvancedSelect
              options={roleOptions}
              value={creatableValue}
              onChange={setCreatableValue}
              multiple
              searchable
              creatable
              placeholder="Select or create roles..."
            />
          </div>
        </ComponentPreview>

        <ComponentPreview
          title="Disabled & Error States"
          code={`<AdvancedSelect options={options} placeholder="Disabled" disabled />
<AdvancedSelect options={options} placeholder="Error state" error />`}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-lg">
            <AdvancedSelect
              options={frameworkOptions}
              placeholder="Disabled select"
              disabled
            />
            <AdvancedSelect
              options={frameworkOptions}
              placeholder="Error state"
              error
            />
          </div>
        </ComponentPreview>
      </div>
    </SectionWrapper>
  );
}
