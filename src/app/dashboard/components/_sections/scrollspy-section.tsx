"use client";

import { Scrollspy } from "@/components";
import { SectionWrapper } from "./section-wrapper";

const sections = [
  { id: "scrollspy-intro", label: "Introduction", content: "Welcome to the application. This section provides an overview of features and capabilities that you can leverage in your daily workflow." },
  { id: "scrollspy-features", label: "Features", content: "Our platform includes real-time collaboration, advanced analytics, team management, and automated workflows designed to boost productivity." },
  { id: "scrollspy-pricing", label: "Pricing", content: "We offer flexible pricing plans starting from a free tier for individuals, a pro plan for teams, and enterprise solutions for large organizations." },
  { id: "scrollspy-faq", label: "FAQ", content: "Find answers to commonly asked questions about setup, billing, integrations, and troubleshooting. Contact support for anything not covered here." },
];

export function ScrollspySection() {
  return (
    <SectionWrapper id="scrollspy" title="Scrollspy">
      <div className="space-y-8">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Scroll-Activated Navigation
          </p>
          <p className="mb-4 text-sm text-zinc-600 dark:text-[#9FAEC1]">
            The Scrollspy component uses a render prop pattern to provide the currently active section
            ID based on scroll position. Below is a self-contained mini demo with its own scrollable container.
          </p>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Mini Demo
          </p>
          <div className="grid gap-4 sm:grid-cols-[180px_1fr]">
            {/* Navigation sidebar */}
            <Scrollspy ids={sections.map((s) => s.id)} offset={100}>
              {(activeId) => (
                <nav className="sticky top-4 space-y-1">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className={[
                        "block rounded-md px-3 py-1.5 text-sm transition-colors",
                        activeId === section.id
                          ? "bg-[#4CCBBF]/10 font-medium text-[#4CCBBF]"
                          : "text-zinc-500 hover:text-zinc-700 dark:text-[#9FAEC1] dark:hover:text-[#E8EDF2]",
                      ].join(" ")}
                    >
                      {section.label}
                    </a>
                  ))}
                </nav>
              )}
            </Scrollspy>

            {/* Scrollable content */}
            <div className="space-y-8 rounded-lg border border-zinc-200 p-4 dark:border-[#2D3640]">
              {sections.map((section) => (
                <div key={section.id} id={section.id} className="scroll-mt-4">
                  <h4 className="mb-2 text-sm font-semibold text-zinc-800 dark:text-[#E8EDF2]">
                    {section.label}
                  </h4>
                  <p className="text-sm leading-relaxed text-zinc-600 dark:text-[#9FAEC1]">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Usage
          </p>
          <ul className="list-inside list-disc space-y-1 text-sm text-zinc-600 dark:text-[#9FAEC1]">
            <li>Render prop pattern — children receives activeId</li>
            <li>Configurable offset for fixed headers</li>
            <li>Passive scroll listener for performance</li>
            <li>Works with any scrollable ancestor</li>
          </ul>
        </div>
      </div>
    </SectionWrapper>
  );
}
