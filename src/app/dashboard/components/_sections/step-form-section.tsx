"use client";

import { useState } from "react";
import { ComponentPreview } from "../_components/component-preview";
import { SectionWrapper } from "./section-wrapper";
import { StepForm } from "@/components";

export function StepFormSection() {
  const [submitted1, setSubmitted1] = useState(false);
  const [submitted2, setSubmitted2] = useState(false);

  return (
    <SectionWrapper
      id="step-form"
      title="Step Form"
      description="Multi-step wizard with progress indicator, navigation, and validation support."
    >
      <div className="space-y-8">
        <ComponentPreview
          title="Basic Multi-Step Form"
          code={`import { StepForm } from "@/components";

<StepForm
  steps={[
    {
      title: "Personal Info",
      description: "Basic details",
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input className="w-full rounded-md border px-3 py-2" placeholder="John Doe" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input className="w-full rounded-md border px-3 py-2" placeholder="john@example.com" />
          </div>
        </div>
      ),
    },
    {
      title: "Address",
      description: "Where you live",
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Street</label>
            <input className="w-full rounded-md border px-3 py-2" placeholder="123 Main St" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input className="w-full rounded-md border px-3 py-2" placeholder="New York" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">ZIP</label>
              <input className="w-full rounded-md border px-3 py-2" placeholder="10001" />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Review",
      description: "Confirm details",
      content: (
        <div className="rounded-md bg-slate-50 p-4">
          <p className="text-sm text-slate-600">Review your information and submit.</p>
        </div>
      ),
    },
  ]}
  onSubmit={() => console.log("Form submitted!")}
/>`}
        >
          <div className="max-w-2xl">
            <StepForm
              steps={[
                {
                  title: "Personal Info",
                  description: "Basic details",
                  content: (
                    <div className="space-y-4">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                        <input
                          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1A1F26] dark:text-slate-200"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                        <input
                          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1A1F26] dark:text-slate-200"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                  ),
                },
                {
                  title: "Address",
                  description: "Where you live",
                  content: (
                    <div className="space-y-4">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Street</label>
                        <input
                          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1A1F26] dark:text-slate-200"
                          placeholder="123 Main St"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">City</label>
                          <input
                            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1A1F26] dark:text-slate-200"
                            placeholder="New York"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">ZIP</label>
                          <input
                            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1A1F26] dark:text-slate-200"
                            placeholder="10001"
                          />
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  title: "Review",
                  description: "Confirm details",
                  content: (
                    <div className="rounded-md bg-slate-50 p-4 dark:bg-[#1A1F26]">
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Summary</p>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Review the information you provided and click Submit to complete.
                      </p>
                    </div>
                  ),
                },
              ]}
              onSubmit={() => setSubmitted1(true)}
            />
            {submitted1 && (
              <p className="mt-3 text-sm font-medium text-green-600 dark:text-green-400">
                ✓ Form submitted successfully!
              </p>
            )}
          </div>
        </ComponentPreview>

        <ComponentPreview
          title="With Validation & Custom Submit Label"
          code={`<StepForm
  steps={[
    {
      title: "Account",
      content: <div>...</div>,
      validation: () => true, // Return false to block navigation
    },
    {
      title: "Preferences",
      content: <div>...</div>,
    },
    {
      title: "Confirm",
      content: <div>...</div>,
    },
  ]}
  submitLabel="Create Account"
  showStepNumbers={true}
  onSubmit={() => console.log("Account created!")}
  onStepChange={(step) => console.log("Step:", step)}
/>`}
        >
          <div className="max-w-2xl">
            <StepForm
              steps={[
                {
                  title: "Account",
                  description: "Create credentials",
                  content: (
                    <div className="space-y-4">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Username</label>
                        <input
                          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1A1F26] dark:text-slate-200"
                          placeholder="johndoe"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                        <input
                          type="password"
                          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-[#2D3640] dark:bg-[#1A1F26] dark:text-slate-200"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                  ),
                  validation: () => true,
                },
                {
                  title: "Preferences",
                  description: "Customize experience",
                  content: (
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 rounded-md border border-slate-200 p-3 dark:border-[#2D3640]">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm text-slate-700 dark:text-slate-300">Email notifications</span>
                      </label>
                      <label className="flex items-center gap-3 rounded-md border border-slate-200 p-3 dark:border-[#2D3640]">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm text-slate-700 dark:text-slate-300">SMS notifications</span>
                      </label>
                      <label className="flex items-center gap-3 rounded-md border border-slate-200 p-3 dark:border-[#2D3640]">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm text-slate-700 dark:text-slate-300">Dark mode</span>
                      </label>
                    </div>
                  ),
                },
                {
                  title: "Confirm",
                  description: "Ready to go",
                  content: (
                    <div className="rounded-md border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
                      <p className="text-sm font-medium text-green-800 dark:text-green-300">
                        Everything looks good!
                      </p>
                      <p className="mt-1 text-sm text-green-600 dark:text-green-400">
                        Click &quot;Create Account&quot; to finish setup.
                      </p>
                    </div>
                  ),
                },
              ]}
              submitLabel="Create Account"
              showStepNumbers={true}
              onSubmit={() => setSubmitted2(true)}
              onStepChange={(step) => console.log("Current step:", step)}
            />
            {submitted2 && (
              <p className="mt-3 text-sm font-medium text-green-600 dark:text-green-400">
                ✓ Account created successfully!
              </p>
            )}
          </div>
        </ComponentPreview>
      </div>
    </SectionWrapper>
  );
}
