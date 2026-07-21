export interface ListGroupItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export interface ListGroupProps {
  items: ListGroupItem[];
  className?: string;
}

/**
 * Vertical list of styled items. Items with onClick become interactive buttons.
 *
 * @example
 * <ListGroup
 *   items={[
 *     { id: "1", label: "Dashboard", icon: <Icon name="home" />, active: true },
 *     { id: "2", label: "Settings",  icon: <Icon name="settings" /> },
 *   ]}
 * />
 */
export function ListGroup({ items, className = "" }: ListGroupProps) {
  return (
    <ul
      className={[
        "overflow-hidden rounded-lg border border-zinc-200 dark:border-[#2D3640]",
        className,
      ].join(" ")}
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        const base = [
          "flex w-full items-center gap-3 px-4 py-3 text-sm transition-colors",
          !isLast ? "border-b border-zinc-100 dark:border-[#2D3640]" : "",
          item.active
            ? "bg-[#4CCBBF]/10 text-[#4CCBBF] font-medium"
            : "text-zinc-700 dark:text-[#CBD5E1]",
          item.onClick && !item.disabled
            ? "cursor-pointer hover:bg-zinc-50 dark:hover:bg-[#2D3640]"
            : "",
          item.disabled ? "pointer-events-none opacity-40" : "",
        ].join(" ");

        const content = (
          <>
            {item.icon && (
              <span className={`shrink-0 ${item.active ? "text-[#4CCBBF]" : "text-zinc-400 dark:text-[#64748B]"}`}>
                {item.icon}
              </span>
            )}
            <div className="flex-1 min-w-0">
              <p className="truncate">{item.label}</p>
              {item.description && (
                <p className="truncate text-xs text-zinc-400 dark:text-[#64748B]">{item.description}</p>
              )}
            </div>
            {item.badge && <span className="shrink-0">{item.badge}</span>}
          </>
        );

        return (
          <li key={item.id}>
            {item.onClick ? (
              <button type="button" onClick={item.onClick} disabled={item.disabled} className={`${base} text-left`}>
                {content}
              </button>
            ) : (
              <div className={base}>{content}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
