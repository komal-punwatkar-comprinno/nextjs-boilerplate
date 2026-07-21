"use client";

import { CountCharacters } from "@/components";
import { SectionWrapper } from "./section-wrapper";

export function CountCharactersSection() {
  return (
    <SectionWrapper id="count-characters" title="Count Characters">
      <div className="space-y-8">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">With Max Length</p>
          <div className="max-w-md">
            <CountCharacters
              label="Tweet"
              placeholder="What's happening?"
              maxLength={100}
            />
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Warning State</p>
          <div className="max-w-md">
            <CountCharacters
              label="Bio"
              placeholder="Tell us about yourself..."
              maxLength={100}
              warningThreshold={80}
            />
          </div>
          <p className="mt-1 text-xs text-slate-400">Shows warning color when 80% of characters used</p>
        </div>
      </div>
    </SectionWrapper>
  );
}
