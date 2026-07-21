export interface ColumnDividerProps {
    className?: string;
  }
  
  /**
   * Thin vertical rule for separating inline items.
   *
   * @example
   * <div className="flex items-center gap-3">
   *   <span>Revenue</span>
   *   <ColumnDivider className="h-4" />
   *   <span>Users</span>
   * </div>
   */
  export function ColumnDivider({ className = "" }: ColumnDividerProps) {
    return (
      <div
        aria-hidden="true"
        className={`w-px shrink-0 bg-zinc-200 dark:bg-[#2D3640] ${className}`}
      />
    );
  }
