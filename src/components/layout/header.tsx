"use client";

import { Breadcrumb, type BreadcrumbItem } from "../ui/breadcrumb";

interface HeaderProps {
  /** Page title shown as the main heading. */
  title: string;
  /** Optional subtitle / description below the title. */
  description?: string;
  /** Breadcrumb trail shown above the title. */
  breadcrumbs?: BreadcrumbItem[];
  /** Slot for action buttons (e.g. "Create new") placed on the right. */
  actions?: React.ReactNode;
}

/**
 * Page-level header used at the top of every dashboard page.
 *
 * @example
 * <Header
 *   title="Users"
 *   description="Manage your team members."
 *   breadcrumbs={[{ label: "Home", href: "/" }, { label: "Users" }]}
 *   actions={<Button>Add user</Button>}
 * />
 */
export function Header({
  title,
  description,
  breadcrumbs,
  actions,
}: HeaderProps) {
  return (
    <div className="mb-6">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="mb-3">
          <Breadcrumb items={breadcrumbs} />
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
            {title}
          </h1>
          {description && (
            <p className="mt-1 text-sm leading-6 text-zinc-600">
              {description}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex shrink-0 items-center gap-3">{actions}</div>
        )}
      </div>
    </div>
  );
}
