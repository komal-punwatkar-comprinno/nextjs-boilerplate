
  
  "use client";
  
  import { useState } from "react";
  import { Alert } from "@/components";
  import { SectionWrapper } from "./section-wrapper";
  
  export function AlertsSection() {
    return (
      <SectionWrapper id="alerts" title="Alerts">
        <div className="space-y-8">
  
          {/* Variants */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Variants
            </p>
            <div className="space-y-3">
              <Alert variant="success" title="Success">
                Your profile changes have been successfully saved to the server.
              </Alert>
              <Alert variant="info" title="Info">
                A new version of the application is available. Update now.
              </Alert>
              <Alert variant="warning" title="Warning">
                You are approaching your subscription usage limit.
              </Alert>
              <Alert variant="danger" title="Error">
                Could not fetch server logs. Please retry later.
              </Alert>
            </div>
          </div>
  
          {/* Dismissible */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Dismissible
            </p>
            <div className="space-y-3">
              <DismissibleDemo />
            </div>
          </div>
  
          {/* No title */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Without Title
            </p>
            <div className="space-y-3">
              <Alert variant="success">Operation completed successfully.</Alert>
              <Alert variant="warning">Please review your input before submitting.</Alert>
            </div>
          </div>
  
        </div>
      </SectionWrapper>
    );
  }
  
  // Separate component so each alert has independent dismiss state
  function DismissibleDemo() {
    const [shown, setShown] = useState({
      success: true,
      info: true,
      warning: true,
      danger: true,
    });
  
    const allDismissed = Object.values(shown).every((v) => !v);
  
    return (
      <div className="space-y-3">
        {shown.success && (
          <Alert variant="success" title="Saved successfully" dismissible>
            Your changes have been applied. <button className="underline" onClick={() => setShown(s => ({ ...s, success: false }))}>Dismiss</button>
          </Alert>
        )}
        {shown.info && (
          <Alert variant="info" title="Did you know?" dismissible>
            You can customise every component via Tailwind utility classes.
          </Alert>
        )}
        {shown.warning && (
          <Alert variant="warning" title="Storage almost full" dismissible>
            You have used 90% of your storage quota.
          </Alert>
        )}
        {shown.danger && (
          <Alert variant="danger" title="Action required" dismissible>
            Your payment method has expired. Please update it.
          </Alert>
        )}
        {allDismissed && (
          <div className="flex items-center gap-3">
            <p className="text-sm text-slate-500 dark:text-[#9FAEC1]">All alerts dismissed.</p>
            <button
              className="text-sm text-[#4CCBBF] underline"
              onClick={() => setShown({ success: true, info: true, warning: true, danger: true })}
            >
              Reset
            </button>
          </div>
        )}
      </div>
    );
  }