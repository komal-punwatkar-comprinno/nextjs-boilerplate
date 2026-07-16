"use client";

import { useState } from "react";
import { Icon, iconPaths } from "@/components";
import type { IconName, IconSize } from "@/components";
import { Button } from "@/components/button";
import { SectionWrapper } from "./section-wrapper";

const sizes: { label: string; size: IconSize }[] = [
  { label: "xs", size: "xs" },
  { label: "sm", size: "sm" },
  { label: "md", size: "md" },
  { label: "lg", size: "lg" },
  { label: "xl", size: "xl" },
];

const colourExamples: { label: string; className: string }[] = [
  { label: "Default",  className: "text-slate-700 dark:text-slate-300" },
  { label: "Primary",  className: "text-indigo-600 dark:text-indigo-400" },
  { label: "Success",  className: "text-emerald-600 dark:text-emerald-400" },
  { label: "Warning",  className: "text-amber-500 dark:text-amber-400" },
  { label: "Danger",   className: "text-red-600 dark:text-red-400" },
  { label: "Muted",    className: "text-slate-400 dark:text-slate-500" },
];

export function IconSection() {
  const [copied, setCopied] = useState<string | null>(null);

  const allIcons = Object.keys(iconPaths) as IconName[];

  function copyJsx(name: IconName) {
    const snippet = `<Icon name="${name}" size="md" />`;
    navigator.clipboard.writeText(snippet).then(() => {
      setCopied(name);
      setTimeout(() => setCopied(null), 1500);
    });
  }

  return (
    <SectionWrapper id="icons" title="7. Icons">
      <div className="space-y-10">

        {/* Usage note */}
        <div className="rounded-lg border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-800 dark:border-indigo-800/50 dark:bg-indigo-900/30 dark:text-indigo-300">
          <strong className="font-semibold">Usage:</strong>{" "}
          <code className="rounded bg-indigo-100 dark:bg-indigo-800/50 px-1.5 py-0.5 font-mono text-xs">
            {`import { Icon } from "@/components";`}
          </code>{" "}
          then{" "}
          <code className="rounded bg-indigo-100 dark:bg-indigo-800/50 px-1.5 py-0.5 font-mono text-xs">
            {`<Icon name="trash" size="md" className="text-red-600" />`}
          </code>
        </div>

        {/* Sizes */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Sizes</p>
          <div className="flex items-end gap-8">
            {sizes.map(({ label, size }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <Icon name="bell" size={size} className="text-slate-700 dark:text-slate-300" />
                <span className="text-[10px] text-slate-400 dark:text-slate-500">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Colours */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Colours</p>
          <div className="flex flex-wrap gap-6">
            {colourExamples.map(({ label, className }) => (
              <div key={label} className="flex flex-col items-center gap-1.5">
                <Icon name="chartBar" size="lg" className={className} />
                <span className="text-[10px] text-slate-400 dark:text-slate-500">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* In buttons */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">In Buttons</p>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" size="md">
              <Icon name="plus" size="sm" />
              Add Item
            </Button>
            <Button variant="secondary" size="md">
              <Icon name="download" size="sm" />
              Download
            </Button>
            <Button variant="danger" size="md">
              <Icon name="trash" size="sm" />
              Delete
            </Button>
            {/* Icon-only button */}
            <button
              aria-label="Edit"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-500 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-500"
            >
              <Icon name="edit" size="sm" aria-label="Edit" />
            </button>
          </div>
        </div>

        {/* Full library — click to copy */}
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Library ({allIcons.length} icons)
          </p>
          <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
            Click any icon to copy its{" "}
            <code className="rounded bg-slate-100 dark:bg-slate-700 px-1 font-mono text-[11px] dark:text-slate-200">
              {`<Icon />`}
            </code>{" "}
            JSX snippet.
          </p>
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8">
            {allIcons.map((name) => (
              <button
                key={name}
                onClick={() => copyJsx(name)}
                title={`Copy <Icon name="${name}" />`}
                className="group flex flex-col items-center gap-2 rounded-lg border border-slate-200 p-3 transition-all hover:border-indigo-300 hover:bg-indigo-50 dark:border-slate-700 dark:hover:border-indigo-500 dark:hover:bg-indigo-900/30"
              >
                <Icon
                  name={name}
                  size="md"
                  className="text-slate-600 group-hover:text-indigo-600 dark:text-slate-300 dark:group-hover:text-indigo-400"
                />
                <span className="text-center text-[10px] leading-tight text-slate-500 group-hover:text-indigo-600 dark:text-slate-400 dark:group-hover:text-indigo-400">
                  {copied === name ? "Copied!" : name}
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
}

