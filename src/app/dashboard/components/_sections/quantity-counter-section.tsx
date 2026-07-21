"use client";

import { useState } from "react";
import { QuantityCounter } from "@/components";
import { SectionWrapper } from "./section-wrapper";

export function QuantityCounterSection() {
  const [basic, setBasic] = useState(1);
  const [minMax, setMinMax] = useState(5);
  const [stepped, setStepped] = useState(0);

  return (
    <SectionWrapper id="quantity-counter" title="Quantity Counter">
      <div className="space-y-8">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Basic</p>
          <QuantityCounter value={basic} onChange={setBasic} />
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">With Min / Max</p>
          <QuantityCounter value={minMax} onChange={setMinMax} min={1} max={10} />
          <p className="mt-1 text-xs text-slate-400">Range: 1–10</p>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">With Step</p>
          <QuantityCounter value={stepped} onChange={setStepped} step={5} min={0} max={100} />
          <p className="mt-1 text-xs text-slate-400">Step: 5</p>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Disabled</p>
          <QuantityCounter value={3} onChange={() => {}} disabled />
        </div>
      </div>
    </SectionWrapper>
  );
}
