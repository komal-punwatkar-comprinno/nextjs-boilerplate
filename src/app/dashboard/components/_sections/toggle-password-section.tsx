"use client";

import { TogglePassword } from "@/components";
import { SectionWrapper } from "./section-wrapper";

export function TogglePasswordSection() {
  return (
    <SectionWrapper id="toggle-password" title="Toggle Password">
      <div className="space-y-8">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Basic</p>
          <div className="max-w-xs">
            <TogglePassword
              label="Password"
              placeholder="Enter your password"
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
