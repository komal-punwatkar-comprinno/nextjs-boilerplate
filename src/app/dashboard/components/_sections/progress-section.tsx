import { Progress } from "@/components";
import { SectionWrapper } from "./section-wrapper";

export function ProgressSection() {
  return (
    <SectionWrapper id="progress" title="Progress">
      <div className="space-y-8 max-w-lg">

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Values</p>
          <div className="space-y-3">
            {[0, 25, 50, 75, 100].map((v) => (
              <div key={v} className="flex items-center gap-3">
                <span className="w-8 shrink-0 text-xs text-zinc-400 dark:text-[#64748B]">{v}%</span>
                <Progress value={v} className="flex-1" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Sizes</p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 shrink-0 text-xs text-zinc-400 dark:text-[#64748B]">sm</span>
              <Progress value={65} size="sm" className="flex-1" />
            </div>
            <div className="flex items-center gap-3">
              <span className="w-8 shrink-0 text-xs text-zinc-400 dark:text-[#64748B]">md</span>
              <Progress value={65} size="md" className="flex-1" />
            </div>
            <div className="flex items-center gap-3">
              <span className="w-8 shrink-0 text-xs text-zinc-400 dark:text-[#64748B]">lg</span>
              <Progress value={65} size="lg" className="flex-1" />
            </div>
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Colors</p>
          <div className="space-y-3">
            <Progress value={70} color="bg-[#4CCBBF]" />
            <Progress value={55} color="bg-emerald-500" />
            <Progress value={40} color="bg-amber-500" />
            <Progress value={80} color="bg-[#ED495D]" />
            <Progress value={60} color="bg-blue-500" />
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Striped & Animated</p>
          <div className="space-y-3">
            <Progress value={60} striped />
            <Progress value={75} color="bg-[#ED495D]" striped animated />
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Labeled</p>
          <div className="space-y-4">
            {[
              { label: "Storage",    value: 72, color: "bg-[#4CCBBF]" },
              { label: "Bandwidth",  value: 45, color: "bg-amber-500" },
              { label: "CPU Usage",  value: 88, color: "bg-[#ED495D]" },
            ].map((item) => (
              <div key={item.label}>
                <div className="mb-1 flex justify-between text-xs text-zinc-500 dark:text-[#9FAEC1]">
                  <span>{item.label}</span>
                  <span>{item.value}%</span>
                </div>
                <Progress value={item.value} color={item.color} size="md" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
}
