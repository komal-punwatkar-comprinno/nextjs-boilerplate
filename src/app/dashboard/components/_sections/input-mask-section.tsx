"use client";

import { InputMask } from "@/components";
import { SectionWrapper } from "./section-wrapper";

export function InputMaskSection() {
  return (
    <SectionWrapper id="input-mask" title="Input Mask">
      <div className="space-y-8">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Phone Number</p>
          <div className="max-w-xs">
            <InputMask
              label="Phone"
              mask="(###) ###-####"
              placeholder="(555) 123-4567"
            />
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Date</p>
          <div className="max-w-xs">
            <InputMask
              label="Date of Birth"
              mask="##/##/####"
              placeholder="MM/DD/YYYY"
            />
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Credit Card</p>
          <div className="max-w-xs">
            <InputMask
              label="Card Number"
              mask="#### #### #### ####"
              placeholder="1234 5678 9012 3456"
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
