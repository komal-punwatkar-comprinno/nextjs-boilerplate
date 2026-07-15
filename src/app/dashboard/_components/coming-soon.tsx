import type { ReactNode } from "react";

interface ComingSoonProps {
  /** Page/section title shown in the heading */
  title: string;
  /** Short description of what this page will do */
  description: string;
  /** Emoji or icon character shown at the top */
  icon?: string;
  /** Bullet-point list of planned features */
  features?: string[];
  /** Where developers should implement the logic, e.g. a file path */
  implementationHint?: string;
}

/**
 * Boilerplate placeholder for pages that are not yet implemented.
 *
 * Drop this inside any stub page so developers see a helpful guide
 * instead of a blank screen while building out features.
 *
 * @example
 * export default function AnalyticsPage() {
 *   return (
 *     <ComingSoon
 *       icon="📊"
 *       title="Analytics"
 *       description="Track metrics and KPIs across your workspace."
 *       features={["Revenue charts", "User retention", "Export to CSV"]}
 *       implementationHint="Create your analytics service at src/services/analytics-service.ts"
 *     />
 *   );
 * }
 */
export function ComingSoon({
  title,
  description,
  icon = "🚧",
  features = [],
  implementationHint,
}: ComingSoonProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-16 text-center">
      {/* Icon */}
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-50 text-4xl ring-1 ring-indigo-100">
        {icon}
      </div>

      {/* Heading */}
      <h1 className="mt-6 text-2xl font-bold text-slate-800">{title}</h1>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-500">{description}</p>

      {/* Developer notice */}
      <div className="mt-8 w-full max-w-lg rounded-xl border border-dashed border-amber-300 bg-amber-50 px-6 py-5 text-left">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 text-lg">👨‍💻</span>
          <div>
            <p className="text-sm font-semibold text-amber-800">Boilerplate stub — implement your logic here</p>
            <p className="mt-1 text-sm text-amber-700">
              This page is a placeholder. Build your feature inside this route and your
              content will appear here automatically.
            </p>
            {implementationHint && (
              <p className="mt-2 text-xs text-amber-600">
                <span className="font-medium">Hint: </span>
                {implementationHint}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Planned features */}
      {features.length > 0 && (
        <div className="mt-6 w-full max-w-lg rounded-xl border border-slate-200 bg-white px-6 py-5 text-left">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Planned features
          </p>
          <ul className="space-y-2">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
