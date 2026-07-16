import { Spinner } from "@/components/spinner";
import { SectionWrapper } from "./section-wrapper";

export function SpinnerSection() {
  return (
    <SectionWrapper id="spinners" title="8. Spinner / Loading">
      <div className="space-y-8">
        {/* Three sizes */}
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Sizes</p>
          <div className="flex items-end gap-8">
            {(["sm", "md", "lg"] as const).map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <Spinner size={size} />
                <span className="text-xs text-slate-500 dark:text-slate-400">{size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Skeleton mockup */}
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Skeleton Loading State
          </p>
          <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4 max-w-sm dark:border-slate-700 dark:bg-slate-700">
            {/* Header row */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-slate-200 animate-pulse dark:bg-slate-500" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-32 rounded-full bg-slate-200 animate-pulse dark:bg-slate-500" />
                <div className="h-2.5 w-20 rounded-full bg-slate-200 animate-pulse dark:bg-slate-500" />
              </div>
            </div>
            {/* Content lines */}
            <div className="space-y-2">
              <div className="h-2.5 w-full rounded-full bg-slate-200 animate-pulse dark:bg-slate-500" />
              <div className="h-2.5 w-5/6 rounded-full bg-slate-200 animate-pulse dark:bg-slate-500" />
              <div className="h-2.5 w-4/6 rounded-full bg-slate-200 animate-pulse dark:bg-slate-500" />
            </div>
            {/* Footer buttons */}
            <div className="flex gap-2 pt-1">
              <div className="h-8 w-20 rounded-md bg-slate-200 animate-pulse dark:bg-slate-500" />
              <div className="h-8 w-16 rounded-md bg-slate-200 animate-pulse dark:bg-slate-500" />
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

