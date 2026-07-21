"use client";

import { cn } from "@/lib/utils";

interface PageHeaderTab {
  label: string;
  value: string;
  /** Whether this tab is currently active. */
  active?: boolean;
}

interface PageHeaderProps {
  /** Page title. */
  title: string;
  /** Optional description below the title. */
  description?: string;
  /** Slot for action buttons on the right side. */
  actions?: React.ReactNode;
  /** Optional tab bar below the header. */
  tabs?: PageHeaderTab[];
  /** Callback when a tab is clicked. */
  onTabChange?: (value: string) => void;
  /** Additional class names. */
  className?: string;
}

/**
 * Page-level header with title, description, actions slot, and optional tabs.
 * Different from the existing Header component (which includes breadcrumbs).
 *
 * @example
 * <PageHeader
 *   title="Settings"
 *   description="Manage your account preferences"
 *   actions={<Button>Save</Button>}
 *   tabs={[{ label: "General", value: "general", active: true }, { label: "Security", value: "security" }]}
 *   onTabChange={(v) => setActiveTab(v)}
 * />
 */
export function PageHeader({
  title,
  description,
  actions,
  tabs,
  onTabChange,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "border-b border-zinc-200 pb-4 dark:border-[#2D3640]",
        className
      )}
    >
      {/* Title row */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-zinc-900 dark:text-[#E8EDF2]">
            {title}
          </h1>
          {description && (
            <p className="mt-1 text-sm text-zinc-500 dark:text-[#9FAEC1]">
              {description}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex shrink-0 items-center gap-3">{actions}</div>
        )}
      </div>

      {/* Tabs */}
      {tabs && tabs.length > 0 && (
        <div className="mt-4 flex gap-1 overflow-x-auto" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={tab.active}
              onClick={() => onTabChange?.(tab.value)}
              className={cn(
                "whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900",
                "dark:text-[#9FAEC1] dark:hover:bg-[#2A3441] dark:hover:text-[#E8EDF2]",
                tab.active &&
                  "bg-zinc-100 text-zinc-900 dark:bg-[#2A3441] dark:text-[#E8EDF2]"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export type { PageHeaderProps, PageHeaderTab };
