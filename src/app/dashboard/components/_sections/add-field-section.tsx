"use client";

import { useState } from "react";
import { ComponentPreview } from "../_components/component-preview";
import { SectionWrapper } from "./section-wrapper";
import { AddField } from "@/components";

export function AddFieldSection() {
  const [skills, setSkills] = useState<string[]>([""]);
  const [emails, setEmails] = useState<string[]>([""]);
  const [tags, setTags] = useState<string[]>(["React", "TypeScript"]);

  return (
    <SectionWrapper
      id="add-field"
      title="Add Field"
      description="Dynamic form fields that allow users to add or remove entries on the fly."
    >
      <div className="space-y-8">
        <ComponentPreview
          title="Basic Dynamic Fields"
          code={`import { useState } from "react";
import { AddField } from "@/components";

const [skills, setSkills] = useState<string[]>([""]);

<AddField
  label="Skills"
  placeholder="Enter a skill"
  values={skills}
  onChange={setSkills}
  maxFields={5}
/>`}
        >
          <div className="max-w-md">
            <AddField
              label="Skills"
              placeholder="Enter a skill (e.g., React, Node.js)"
              values={skills}
              onChange={setSkills}
              maxFields={5}
            />
            {skills.filter(Boolean).length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {skills.filter(Boolean).map((skill, i) => (
                  <span
                    key={i}
                    className="inline-flex rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        </ComponentPreview>

        <ComponentPreview
          title="With Pre-filled Values & Custom Labels"
          code={`const [tags, setTags] = useState<string[]>(["React", "TypeScript"]);

<AddField
  label="Tech Stack"
  placeholder="Add a technology"
  addLabel="+ Add Technology"
  values={tags}
  onChange={setTags}
  maxFields={8}
/>`}
        >
          <div className="max-w-md">
            <AddField
              label="Tech Stack"
              placeholder="Add a technology"
              addLabel="+ Add Technology"
              values={tags}
              onChange={setTags}
              maxFields={8}
            />
            <p className="mt-2 text-xs text-slate-400">
              {tags.filter(Boolean).length} of 8 max fields used
            </p>
          </div>
        </ComponentPreview>

        <ComponentPreview
          title="States: Error & Disabled"
          code={`{/* With error */}
<AddField
  label="Email Addresses"
  placeholder="Enter email"
  values={emails}
  onChange={setEmails}
  maxFields={3}
  error="At least one email is required"
  fieldErrors={[undefined, "Invalid email format"]}
/>

{/* Disabled */}
<AddField
  label="Locked Fields"
  values={["Value 1", "Value 2"]}
  onChange={() => {}}
  disabled
/>`}
        >
          <div className="grid max-w-2xl gap-6 md:grid-cols-2">
            <div>
              <AddField
                label="Email Addresses"
                placeholder="Enter email"
                values={emails}
                onChange={setEmails}
                maxFields={3}
                error="At least one email is required"
                fieldErrors={[undefined, "Invalid email format"]}
              />
            </div>
            <div>
              <AddField
                label="Locked Fields"
                placeholder="Cannot edit"
                values={["Value 1", "Value 2"]}
                onChange={() => {}}
                disabled
              />
            </div>
          </div>
        </ComponentPreview>
      </div>
    </SectionWrapper>
  );
}
