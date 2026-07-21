"use client";

import { useState } from "react";
import { ToggleSwitch } from "@/components";
import { SectionWrapper } from "./section-wrapper";

export function ToggleSwitchSection() {
  const [enabled, setEnabled] = useState(true);
  const [notifications, setNotifications] = useState(false);

  return (
    <SectionWrapper id="toggle-switch" title="Toggle Switch">
      <div className="space-y-8">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">With Label</p>
          <ToggleSwitch
            label="Enable notifications"
            checked={enabled}
            onChange={setEnabled}
          />
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">With Description</p>
          <ToggleSwitch
            label="Marketing emails"
            description="Receive emails about new products, features, and more."
            checked={notifications}
            onChange={setNotifications}
          />
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">With Error</p>
          <ToggleSwitch
            label="Accept terms"
            checked={false}
            onChange={() => {}}
            error="You must accept the terms to continue"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
