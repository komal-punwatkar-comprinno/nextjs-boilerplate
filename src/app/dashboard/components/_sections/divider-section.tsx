import { Divider } from "@/components";
import { SectionWrapper } from "./section-wrapper";

export function DividerSection() {
  return (
    <SectionWrapper id="divider" title="Divider">
      <div className="space-y-8">

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Plain</p>
          <Divider />
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">With label — center (default)</p>
          <Divider label="or continue with" />
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">With label — left</p>
          <Divider label="Section title" alignment="left" />
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">With label — right</p>
          <Divider label="End of section" alignment="right" />
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">In context</p>
          <div className="space-y-4 text-sm text-zinc-600 dark:text-[#9FAEC1]">
            <p>Content above the divider. Use dividers to separate logically distinct sections of a page or form.</p>
            <Divider label="More details" />
            <p>Content below the divider. The label helps users understand the relationship between the sections.</p>
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
}
