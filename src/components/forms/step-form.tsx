"use client";

import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";

export interface StepFormStep {
  /** Step title displayed in the progress indicator. */
  title: string;
  /** Optional description. */
  description?: string;
  /** Step content (rendered as children). */
  content: React.ReactNode;
  /** Async validation function. Return true to allow proceeding. */
  validation?: () => boolean | Promise<boolean>;
}

export interface StepFormProps {
  /** Array of step definitions. */
  steps: StepFormStep[];
  /** Called when the final step submits. */
  onSubmit?: () => void | Promise<void>;
  /** Called when current step changes. */
  onStepChange?: (step: number) => void;
  /** Text for the submit button. */
  submitLabel?: string;
  /** Show step numbers in the progress indicator. */
  showStepNumbers?: boolean;
  /** Additional className. */
  className?: string;
}

export function StepForm({
  steps,
  onSubmit,
  onStepChange,
  submitLabel = "Submit",
  showStepNumbers = true,
  className,
}: StepFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isValidating, setIsValidating] = useState(false);

  const totalSteps = steps.length;
  const isFirst = currentStep === 0;
  const isLast = currentStep === totalSteps - 1;

  const goTo = useCallback(
    (step: number) => {
      setCurrentStep(step);
      onStepChange?.(step);
    },
    [onStepChange]
  );

  const handleNext = useCallback(async () => {
    const step = steps[currentStep];
    if (step.validation) {
      setIsValidating(true);
      try {
        const valid = await step.validation();
        if (!valid) {
          setIsValidating(false);
          return;
        }
      } catch {
        setIsValidating(false);
        return;
      }
      setIsValidating(false);
    }

    if (isLast) {
      setIsValidating(true);
      try {
        await onSubmit?.();
      } finally {
        setIsValidating(false);
      }
    } else {
      goTo(currentStep + 1);
    }
  }, [currentStep, steps, isLast, onSubmit, goTo]);

  const handleBack = () => {
    if (!isFirst) goTo(currentStep - 1);
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Progress indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          {steps.map((step, i) => {
            const isCompleted = i < currentStep;
            const isCurrent = i === currentStep;

            return (
              <div key={i} className="flex flex-1 items-center">
                <div className="flex flex-col items-center">
                  {/* Step circle */}
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-colors",
                      isCompleted
                        ? "bg-[#4CCBBF] text-white dark:bg-[#4CCBBF] dark:text-[#1F2937]"
                        : isCurrent
                          ? "border-2 border-[#4CCBBF] text-[#4CCBBF] dark:border-[#4CCBBF] dark:text-[#4CCBBF]"
                          : "border-2 border-zinc-300 text-zinc-400 dark:border-[#3D4A5C] dark:text-[#9FAEC1]"
                    )}
                  >
                    {isCompleted ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                    ) : showStepNumbers ? (
                      i + 1
                    ) : null}
                  </div>
                  {/* Step title */}
                  <span
                    className={cn(
                      "mt-1 text-xs text-center max-w-[80px] truncate",
                      isCurrent
                        ? "font-medium text-zinc-900 dark:text-[#E8EDF2]"
                        : "text-zinc-500 dark:text-[#9FAEC1]"
                    )}
                  >
                    {step.title}
                  </span>
                </div>

                {/* Connector line */}
                {i < totalSteps - 1 && (
                  <div
                    className={cn(
                      "mx-2 h-0.5 flex-1",
                      i < currentStep
                        ? "bg-[#4CCBBF]"
                        : "bg-zinc-200 dark:bg-[#3D4A5C]"
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step content */}
      <div className="mb-6">
        {steps[currentStep]?.description && (
          <p className="mb-4 text-sm text-zinc-500 dark:text-[#9FAEC1]">
            {steps[currentStep].description}
          </p>
        )}
        {steps[currentStep]?.content}
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between border-t border-zinc-200 pt-4 dark:border-[#3D4A5C]">
        <button
          type="button"
          onClick={handleBack}
          disabled={isFirst || isValidating}
          className={cn(
            "inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors",
            "border border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50",
            "dark:border-[#3D4A5C] dark:bg-transparent dark:text-[#E8EDF2] dark:hover:bg-[#3D4A5C]",
            (isFirst || isValidating) && "cursor-not-allowed opacity-50"
          )}
        >
          Back
        </button>

        <span className="text-xs text-zinc-500 dark:text-[#9FAEC1]">
          Step {currentStep + 1} of {totalSteps}
        </span>

        <button
          type="button"
          onClick={handleNext}
          disabled={isValidating}
          className={cn(
            "inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors",
            "bg-[#4CCBBF] text-white hover:bg-[#3AAFA4]",
            "dark:bg-[#4CCBBF] dark:text-[#1F2937] dark:hover:bg-[#3AAFA4]",
            isValidating && "cursor-not-allowed opacity-50"
          )}
        >
          {isValidating ? (
            <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
          ) : null}
          {isLast ? submitLabel : "Next"}
        </button>
      </div>
    </div>
  );
}
