import { ColumnDivider, Badge } from "@/components";
  import { SectionWrapper } from "./section-wrapper";
  
  export function ColumnDividerSection() {
    return (
      <SectionWrapper id="column-divider" title="Column Divider">
        <div className="space-y-8">
  
          {/* Basic */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Separating text
            </p>
            <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-[#CBD5E1]">
              <span>Revenue</span>
              <ColumnDivider className="h-4" />
              <span>Users</span>
              <ColumnDivider className="h-4" />
              <span>Conversion</span>
              <ColumnDivider className="h-4" />
              <span>Uptime</span>
            </div>
          </div>
  
          {/* With badges */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Separating badges
            </p>
            <div className="flex items-center gap-3">
              <Badge variant="success">Active</Badge>
              <ColumnDivider className="h-5" />
              <Badge variant="warning">Pending</Badge>
              <ColumnDivider className="h-5" />
              <Badge variant="danger">Suspended</Badge>
              <ColumnDivider className="h-5" />
              <Badge variant="info">In Review</Badge>
            </div>
          </div>
  
          {/* Stat row */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Stat row
            </p>
            <div className="flex items-center gap-6 rounded-lg border border-zinc-200 bg-zinc-50 px-6 py-4 dark:border-[#2D3640] dark:bg-[#242B33]">
              {[
                { label: "Revenue",    value: "$48,295" },
                { label: "Orders",     value: "1,420"   },
                { label: "Customers",  value: "3,842"   },
                { label: "Conversion", value: "4.8%"    },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-6">
                  {i > 0 && <ColumnDivider className="h-8" />}
                  <div>
                    <p className="text-xs text-zinc-500 dark:text-[#9FAEC1]">{stat.label}</p>
                    <p className="text-lg font-semibold text-zinc-900 dark:text-[#E2E8F0]">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
  
        </div>
      </SectionWrapper>
    );
  }