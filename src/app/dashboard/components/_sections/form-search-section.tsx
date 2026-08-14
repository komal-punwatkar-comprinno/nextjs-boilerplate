"use client";

import { useState } from "react";
import { ComponentPreview } from "../_components/component-preview";
import { SectionWrapper } from "./section-wrapper";
import { FormSearch } from "@/components";

export function FormSearchSection() {
  const [query1, setQuery1] = useState("");
  const [query2, setQuery2] = useState("");
  const [submitted, setSubmitted] = useState("");

  return (
    <SectionWrapper
      id="form-search"
      title="Form Search"
      description="Search input with debounced onChange, optional submit button, and accessible markup."
    >
      <div className="space-y-8">
        <ComponentPreview
          title="Basic Search Input"
          code={`import { useState } from "react";
import { FormSearch } from "@/components";

const [query, setQuery] = useState("");

<FormSearch
  placeholder="Search users..."
  onChange={(value) => setQuery(value)}
/>`}
        >
          <div className="max-w-md">
            <FormSearch
              placeholder="Search users..."
              onChange={(value) => setQuery1(value)}
            />
            {query1 && (
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Debounced value: <span className="font-medium text-slate-700 dark:text-slate-200">&quot;{query1}&quot;</span>
              </p>
            )}
          </div>
        </ComponentPreview>

        <ComponentPreview
          title="With Submit Button"
          code={`<FormSearch
  placeholder="Search products..."
  showSubmitButton
  submitLabel="Find"
  debounceMs={500}
  onChange={(value) => setQuery(value)}
  onSubmit={(value) => console.log("Submitted:", value)}
/>`}
        >
          <div className="max-w-md">
            <FormSearch
              placeholder="Search products..."
              showSubmitButton
              submitLabel="Find"
              debounceMs={500}
              onChange={(value) => setQuery2(value)}
              onSubmit={(value) => setSubmitted(value)}
            />
            {query2 && (
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Typing: <span className="font-medium text-slate-700 dark:text-slate-200">&quot;{query2}&quot;</span>
              </p>
            )}
            {submitted && (
              <p className="mt-1 text-sm text-green-600 dark:text-green-400">
                ✓ Searched for: &quot;{submitted}&quot;
              </p>
            )}
          </div>
        </ComponentPreview>

        <ComponentPreview
          title="States: Error & Custom Debounce"
          code={`{/* With error */}
<FormSearch
  placeholder="Search..."
  error="Search is currently unavailable"
/>

{/* Fast debounce (100ms) */}
<FormSearch
  placeholder="Instant search..."
  debounceMs={100}
  onChange={(value) => console.log(value)}
/>`}
        >
          <div className="grid max-w-2xl gap-6 md:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-medium text-slate-500 dark:text-slate-400">With Error</p>
              <FormSearch
                placeholder="Search..."
                error="Search is currently unavailable"
              />
            </div>
            <div>
              <p className="mb-2 text-xs font-medium text-slate-500 dark:text-slate-400">Fast Debounce (100ms)</p>
              <FormSearch
                placeholder="Instant search..."
                debounceMs={100}
                onChange={(value) => console.log("Fast search:", value)}
              />
            </div>
          </div>
        </ComponentPreview>
      </div>
    </SectionWrapper>
  );
}
