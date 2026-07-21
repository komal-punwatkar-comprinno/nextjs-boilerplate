import { Tabs } from "@/components";
import { SectionWrapper } from "./section-wrapper";

export function TabSection() {
  return (
    <SectionWrapper id="tab" title="Tab">
      <div className="space-y-10">

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Basic tabs</p>
          <Tabs
            items={[
              {
                id: "overview",
                label: "Overview",
                content: (
                  <div className="space-y-2 text-sm text-zinc-600 dark:text-[#9FAEC1]">
                    <p className="font-medium text-zinc-800 dark:text-[#E2E8F0]">Dashboard Overview</p>
                    <p>This panel gives you a high-level summary of your account activity, recent events, and key metrics at a glance.</p>
                  </div>
                ),
              },
              {
                id: "activity",
                label: "Activity",
                content: (
                  <div className="space-y-2 text-sm text-zinc-600 dark:text-[#9FAEC1]">
                    <p className="font-medium text-zinc-800 dark:text-[#E2E8F0]">Recent Activity</p>
                    <ul className="space-y-1 list-disc pl-4">
                      <li>User <strong>Alice</strong> created a new project</li>
                      <li>User <strong>Bob</strong> updated profile settings</li>
                      <li>Deployment to production succeeded</li>
                    </ul>
                  </div>
                ),
              },
              {
                id: "members",
                label: "Members",
                content: (
                  <div className="space-y-2 text-sm text-zinc-600 dark:text-[#9FAEC1]">
                    <p className="font-medium text-zinc-800 dark:text-[#E2E8F0]">Team Members</p>
                    <p>3 active members. Invite your team using the button in the top right corner of the dashboard.</p>
                  </div>
                ),
              },
              {
                id: "settings",
                label: "Settings",
                content: (
                  <div className="space-y-2 text-sm text-zinc-600 dark:text-[#9FAEC1]">
                    <p className="font-medium text-zinc-800 dark:text-[#E2E8F0]">Project Settings</p>
                    <p>Configure notifications, integrations, permissions, and billing from this panel.</p>
                  </div>
                ),
              },
            ]}
          />
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">With default tab</p>
          <Tabs
            defaultTab="billing"
            items={[
              { id: "profile",  label: "Profile",  content: <p className="text-sm text-zinc-600 dark:text-[#9FAEC1]">Profile settings panel.</p> },
              { id: "security", label: "Security", content: <p className="text-sm text-zinc-600 dark:text-[#9FAEC1]">Security settings panel.</p> },
              { id: "billing",  label: "Billing",  content: <p className="text-sm text-zinc-600 dark:text-[#9FAEC1]">Billing panel — opened by default.</p> },
            ]}
          />
        </div>

      </div>
    </SectionWrapper>
  );
}
