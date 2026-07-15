import { Badge } from "@/components/badge";
import { SectionWrapper } from "./section-wrapper";

const variants = [
  { variant: "default", label: "Default" },
  { variant: "success", label: "Success" },
  { variant: "warning", label: "Warning" },
  { variant: "danger", label: "Danger" },
  { variant: "info", label: "Info" },
] as const;

export function BadgeSection() {
  return (
    <SectionWrapper id="badges" title="4. Badges">
      <div className="space-y-4">
        {/* Standard badges */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">Variants</p>
          <div className="flex flex-wrap gap-3">
            {variants.map(({ variant, label }) => (
              <div key={variant} className="flex flex-col items-center gap-1.5">
                <Badge variant={variant}>{label}</Badge>
                <span className="text-[10px] text-slate-400">{variant}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contextual usage examples */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Contextual Examples
          </p>
          <div className="flex flex-wrap gap-3">
            <Badge variant="success">Active</Badge>
            <Badge variant="danger">Suspended</Badge>
            <Badge variant="warning">Pending Review</Badge>
            <Badge variant="info">In Progress</Badge>
            <Badge variant="default">Draft</Badge>
            <Badge variant="success">Completed</Badge>
            <Badge variant="danger">Critical</Badge>
            <Badge variant="warning">High Priority</Badge>
            <Badge variant="info">Beta</Badge>
            <Badge variant="default">Archived</Badge>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
