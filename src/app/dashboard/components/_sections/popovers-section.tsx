"use client";

import { ComponentPreview } from "../_components/component-preview";
import { Popover, Button } from "@/components";
import { SectionWrapper } from "./section-wrapper";

export function PopoversSection() {
  return (
    <SectionWrapper id="popovers" title="Popovers" description="Click-triggered floating panels for contextual information and actions.">
      <div className="space-y-8">
        <ComponentPreview
          title="Placements"
          code={`<Popover
  placement="top"     // or "bottom" | "left" | "right" | "bottom-end"
  trigger={<Button variant="secondary">Top</Button>}
  content={
    <div>
      <p className="font-semibold">Popover top</p>
      <p className="text-xs text-zinc-500">Content appears above the trigger.</p>
    </div>
  }
/>`}
        >
          {/* Enough padding below for bottom popovers, modest top for "top" placement */}
          <div className="flex flex-wrap items-center gap-4">
            {(["top", "bottom", "left", "right"] as const).map((placement) => (
              <Popover
                key={placement}
                placement={placement}
                trigger={
                  <Button variant="secondary" size="sm">
                    {placement.charAt(0).toUpperCase() + placement.slice(1)}
                  </Button>
                }
                content={
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-zinc-800 dark:text-[#E2E8F0]">
                      Popover {placement}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-[#9FAEC1]">
                      This popover appears to the {placement} of its trigger element.
                    </p>
                  </div>
                }
              />
            ))}
          </div>
        </ComponentPreview>

        <ComponentPreview
          title="Rich Content"
          code={`<Popover
  placement="bottom"
  trigger={<Button>User Info</Button>}
  content={
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <img src="/avatar.png" className="h-8 w-8 rounded-full" />
        <div>
          <p className="font-semibold">Sarah Chen</p>
          <p className="text-xs text-zinc-400">Product Designer</p>
        </div>
      </div>
      <p className="text-xs text-zinc-500">Last active 2 hours ago</p>
    </div>
  }
/>

<Popover
  placement="bottom-end"
  trigger={<Button variant="secondary">Confirm Action</Button>}
  content={
    <div className="space-y-3">
      <p className="font-semibold">Are you sure?</p>
      <p className="text-xs">This action cannot be undone.</p>
      <div className="flex gap-2">
        <button className="bg-red-500 text-white ...">Confirm</button>
        <button className="border ...">Cancel</button>
      </div>
    </div>
  }
/>`}
        >
          <div className="flex flex-wrap items-center gap-4">
            <Popover
              placement="bottom"
              trigger={<Button variant="primary" size="sm">User Info</Button>}
              content={
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#4CCBBF] to-[#31b0a5] text-sm font-bold text-white">
                      SC
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-zinc-800 dark:text-[#E2E8F0]">Sarah Chen</p>
                      <p className="text-xs text-zinc-400 dark:text-[#64748B]">Product Designer</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-[#9FAEC1]">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Online now
                  </div>
                </div>
              }
            />
            <Popover
              placement="bottom"
              trigger={<Button variant="secondary" size="sm">Confirm Action</Button>}
              content={
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-zinc-800 dark:text-[#E2E8F0]">Are you sure?</p>
                  <p className="text-xs text-zinc-500 dark:text-[#9FAEC1]">This action cannot be undone. All associated data will be permanently deleted.</p>
                  <div className="flex gap-2 border-t border-zinc-100 pt-2 dark:border-[#2D3640]">
                    <button className="rounded-md bg-red-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-600 transition-colors">
                      Delete
                    </button>
                    <button className="rounded-md border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-50 dark:border-[#2D3640] dark:text-[#9FAEC1] dark:hover:bg-[#2D3640] transition-colors">
                      Cancel
                    </button>
                  </div>
                </div>
              }
            />
            <Popover
              placement="bottom"
              trigger={<Button variant="ghost" size="sm">Notification</Button>}
              content={
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-zinc-800 dark:text-[#E2E8F0]">3 New Notifications</p>
                  <div className="space-y-1.5">
                    {[
                      { text: "John commented on your PR", time: "2m ago", dot: "bg-blue-500" },
                      { text: "Build #247 completed", time: "15m ago", dot: "bg-emerald-500" },
                      { text: "Deployment to staging failed", time: "1h ago", dot: "bg-red-500" },
                    ].map((n) => (
                      <div key={n.text} className="flex items-start gap-2">
                        <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${n.dot}`} />
                        <div>
                          <p className="text-xs text-zinc-700 dark:text-[#E2E8F0]">{n.text}</p>
                          <p className="text-[10px] text-zinc-400 dark:text-[#64748B]">{n.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              }
            />
          </div>
        </ComponentPreview>
      </div>
    </SectionWrapper>
  );
}
