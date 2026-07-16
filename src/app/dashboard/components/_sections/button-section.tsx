import { Button } from "@/components/button";
import { SectionWrapper } from "./section-wrapper";

const PlusIcon = (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

const ArrowIcon = (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const DownloadIcon = (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

export function ButtonSection() {
  return (
    <SectionWrapper id="buttons" title="3. Buttons">
      <div className="space-y-8">
        {/* Variants × Sizes grid */}
        {(["primary", "secondary", "ghost", "danger"] as const).map((variant) => (
          <div key={variant}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-400 capitalize">
              {variant}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant={variant} size="sm">Small</Button>
              <Button variant={variant} size="md">Medium</Button>
              <Button variant={variant} size="lg">Large</Button>
            </div>
          </div>
        ))}

        {/* Special states */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-400">Special States</p>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary" isLoading>Loading</Button>
            <Button variant="primary" leftIcon={PlusIcon}>Add Item</Button>
            <Button variant="secondary" rightIcon={ArrowIcon}>Continue</Button>
            <Button variant="secondary" leftIcon={DownloadIcon} rightIcon={ArrowIcon}>Download</Button>
            <Button variant="primary" disabled>Disabled</Button>
            <Button variant="ghost" disabled>Ghost Disabled</Button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

