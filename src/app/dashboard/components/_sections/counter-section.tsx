"use client";

import { Counter } from "@/components";
import { SectionWrapper } from "./section-wrapper";

export function CounterSection() {
  return (
    <SectionWrapper id="counter" title="Counter">
      <div className="space-y-8">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Basic Counters</p>
          <div className="flex flex-wrap gap-8">
            <div className="text-center">
              <Counter from={0} to={1250} className="text-3xl font-bold text-slate-900 dark:text-white" />
              <p className="mt-1 text-sm text-slate-500">Total Users</p>
            </div>
            <div className="text-center">
              <Counter from={0} to={48} className="text-3xl font-bold text-slate-900 dark:text-white" />
              <p className="mt-1 text-sm text-slate-500">Active Projects</p>
            </div>
            <div className="text-center">
              <Counter from={0} to={9800} className="text-3xl font-bold text-slate-900 dark:text-white" />
              <p className="mt-1 text-sm text-slate-500">Downloads</p>
            </div>
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">With Prefix & Suffix</p>
          <div className="flex flex-wrap gap-8">
            <div className="text-center">
              <Counter from={0} to={25000} prefix="$" className="text-3xl font-bold text-green-600" />
              <p className="mt-1 text-sm text-slate-500">Revenue</p>
            </div>
            <div className="text-center">
              <Counter from={0} to={99} suffix="%" className="text-3xl font-bold text-blue-600" />
              <p className="mt-1 text-sm text-slate-500">Uptime</p>
            </div>
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">With Decimals</p>
          <div className="flex flex-wrap gap-8">
            <div className="text-center">
              <Counter from={0} to={4.95} decimals={2} prefix="$" className="text-3xl font-bold text-slate-900 dark:text-white" />
              <p className="mt-1 text-sm text-slate-500">Price</p>
            </div>
            <div className="text-center">
              <Counter from={0} to={98.7} decimals={1} suffix="%" className="text-3xl font-bold text-slate-900 dark:text-white" />
              <p className="mt-1 text-sm text-slate-500">Accuracy</p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
