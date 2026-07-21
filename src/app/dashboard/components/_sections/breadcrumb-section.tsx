import { Breadcrumb } from "@/components";
  import { SectionWrapper } from "./section-wrapper";
  
  export function BreadcrumbSection() {
    return (
      <SectionWrapper id="breadcrumb" title="Breadcrumb">
        <div className="space-y-8">
  
          {/* Default */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Default
            </p>
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Dashboard", href: "/dashboard" },
                { label: "Components" },
              ]}
            />
          </div>
  
          {/* Deeper nesting */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Deep nesting
            </p>
            <Breadcrumb
              items={[
                { label: "Home",       href: "/" },
                { label: "Dashboard",  href: "/dashboard" },
                { label: "Components", href: "/dashboard/components" },
                { label: "Breadcrumb" },
              ]}
            />
          </div>
  
          {/* Single item */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Single item (current page only)
            </p>
            <Breadcrumb items={[{ label: "Dashboard" }]} />
          </div>
  
        </div>
      </SectionWrapper>
    );
  }