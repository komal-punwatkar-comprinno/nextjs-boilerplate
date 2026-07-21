import { Tooltip, Button } from "@/components";
import { SectionWrapper } from "./section-wrapper";

export function TooltipsSection() {
  return (
    <SectionWrapper id="tooltips" title="Tooltips">
      <div className="space-y-8">

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Placements</p>
          <div className="flex flex-wrap items-center gap-4">
            <Tooltip content="Tooltip on top" placement="top">
              <Button variant="secondary" size="sm">Top</Button>
            </Tooltip>
            <Tooltip content="Tooltip on bottom" placement="bottom">
              <Button variant="secondary" size="sm">Bottom</Button>
            </Tooltip>
            <Tooltip content="Tooltip on left" placement="left">
              <Button variant="secondary" size="sm">Left</Button>
            </Tooltip>
            <Tooltip content="Tooltip on right" placement="right">
              <Button variant="secondary" size="sm">Right</Button>
            </Tooltip>
          </div>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">On different elements</p>
          <div className="flex flex-wrap items-center gap-4">
            <Tooltip content="Primary action" placement="top">
              <Button variant="primary" size="sm">Primary</Button>
            </Tooltip>
            <Tooltip content="Danger! This is permanent" placement="top">
              <Button variant="danger" size="sm">Delete</Button>
            </Tooltip>
            <Tooltip content="Hover over this text to see the tooltip" placement="bottom">
              <span className="cursor-default border-b border-dashed border-zinc-400 text-sm text-zinc-600 dark:text-[#9FAEC1]">
                Hover me
              </span>
            </Tooltip>
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
}
