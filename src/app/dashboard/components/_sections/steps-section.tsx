"use client";

import { useState } from "react";
import { Steps, Button } from "@/components";
import { SectionWrapper } from "./section-wrapper";

const onboardingSteps = [
  { id: "s1", title: "Account",  description: "Email & password" },
  { id: "s2", title: "Profile",  description: "Personal info" },
  { id: "s3", title: "Plan",     description: "Choose subscription" },
  { id: "s4", title: "Review",   description: "Confirm & submit" },
];

const checkoutSteps = [
  { id: "c1", title: "Cart" },
  { id: "c2", title: "Shipping" },
  { id: "c3", title: "Payment" },
  { id: "c4", title: "Confirm" },
];

export function StepsSection() {
  const [onboardStep, setOnboardStep] = useState(1);
  const [checkoutStep, setCheckoutStep] = useState(2);

  return (
    <SectionWrapper id="steps" title="Steps">
      <div className="space-y-10">

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Onboarding wizard (interactive)
          </p>
          <Steps steps={onboardingSteps} currentStep={onboardStep} />
          <div className="mt-4 flex gap-2">
            <Button
              variant="secondary" size="sm"
              disabled={onboardStep === 0}
              onClick={() => setOnboardStep((p) => Math.max(0, p - 1))}
            >
              Previous
            </Button>
            <Button
              variant="primary" size="sm"
              disabled={onboardStep === onboardingSteps.length - 1}
              onClick={() => setOnboardStep((p) => Math.min(onboardingSteps.length - 1, p + 1))}
            >
              Next
            </Button>
          </div>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Checkout flow
          </p>
          <Steps steps={checkoutSteps} currentStep={checkoutStep} />
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            All completed
          </p>
          <Steps steps={checkoutSteps} currentStep={checkoutSteps.length} />
        </div>

      </div>
    </SectionWrapper>
  );
}
