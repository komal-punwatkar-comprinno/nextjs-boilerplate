export interface StepItem {
  id: string;
  title: string;
  description?: string;
}

export interface StepsProps {
  steps: StepItem[];
  currentStep: number;
  className?: string;
}

/**
 * Horizontal step progress indicator.
 *
 * @example
 * <Steps
 *   steps={[
 *     { id: "s1", title: "Account",  description: "Email & password" },
 *     { id: "s2", title: "Profile",  description: "Personal info" },
 *     { id: "s3", title: "Review",   description: "Confirm & submit" },
 *   ]}
 *   currentStep={1}
 * />
 */
export function Steps({ steps, currentStep, className = "" }: StepsProps) {
  return (
    <ol className={`flex items-start ${className}`}>
      {steps.map((step, i) => {
        const completed = i < currentStep;
        const active    = i === currentStep;
        const last      = i === steps.length - 1;

        return (
          <li key={step.id} className={`flex items-start ${!last ? "flex-1" : ""}`}>
            {/* Circle + connector */}
            <div className="flex flex-col items-center">
              <div
                className={[
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                  completed
                    ? "bg-[#4CCBBF] text-[#0A0D14]"
                    : active
                    ? "border-2 border-[#4CCBBF] bg-transparent text-[#4CCBBF]"
                    : "border-2 border-zinc-300 bg-transparent text-zinc-400 dark:border-[#3D4A5C] dark:text-[#64748B]",
                ].join(" ")}
              >
                {completed ? (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              {/* Connector line */}
              {!last && (
                <div className={`mt-1 h-px w-full min-w-[3rem] ${completed ? "bg-[#4CCBBF]" : "bg-zinc-200 dark:bg-[#2D3640]"}`} />
              )}
            </div>

            {/* Label */}
            <div className="ml-3 pb-4">
              <p className={[
                "text-sm font-medium",
                active || completed ? "text-zinc-900 dark:text-[#E2E8F0]" : "text-zinc-400 dark:text-[#64748B]",
              ].join(" ")}>
                {step.title}
              </p>
              {step.description && (
                <p className="mt-0.5 text-xs text-zinc-400 dark:text-[#64748B]">{step.description}</p>
              )}
            </div>

            {/* Spacer connector between label and next circle */}
            {!last && <div className="flex-1" />}
          </li>
        );
      })}
    </ol>
  );
}
