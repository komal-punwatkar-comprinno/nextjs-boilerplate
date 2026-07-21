import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

/**
 * Renders a horizontal breadcrumb trail.
 * The last item is always non-clickable (current page).
 *
 * @example
 * <Breadcrumb items={[
 *   { label: "Home", href: "/" },
 *   { label: "Users", href: "/dashboard/users" },
 *   { label: "Profile" },
 * ]} />
 */
export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && (
                <span className="text-zinc-400 dark:text-[#64748B]" aria-hidden="true">
                  /
                </span>
              )}
              {isLast || !item.href ? (
                <span
                  className={isLast ? "font-medium text-zinc-900 dark:text-[#E2E8F0]" : "text-zinc-500 dark:text-[#94A3B8]"}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-zinc-500 transition-colors hover:text-zinc-900 dark:text-[#94A3B8] dark:hover:text-[#E2E8F0]"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
