"use client";

import { VectorMap } from "@/components";
import { SectionWrapper } from "./section-wrapper";

const sampleRegions = [
  { id: "north-america", value: 3200, color: "#4CCBBF" },
  { id: "europe", value: 2800, color: "#6366f1" },
  { id: "asia", value: 4100, color: "#f59e0b" },
  { id: "africa", value: 1500, color: "#10b981" },
  { id: "south-america", value: 900 },
  { id: "oceania", value: 600 },
];

export function VectorMapSection() {
  return (
    <SectionWrapper id="vector-map" title="Vector Map">
      <div className="space-y-8">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            World Map with Highlighted Regions
          </p>
          <p className="mb-4 text-sm text-zinc-600 dark:text-[#9FAEC1]">
            SVG-based world map with interactive regions. Hover over continents to see tooltips.
            Regions can be highlighted with custom colors and values.
          </p>
          <div className="max-w-lg">
            <VectorMap
              regions={sampleRegions}
              showTooltip
              onRegionClick={(region) => {
                // eslint-disable-next-line no-console
                console.log("Region clicked:", region);
              }}
            />
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Region Data
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {sampleRegions.map((region) => (
              <div
                key={region.id}
                className="flex items-center gap-2 rounded-lg border border-zinc-200 px-3 py-2 dark:border-[#2D3640]"
              >
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: region.color || "#4CCBBF" }}
                />
                <span className="text-xs font-medium capitalize text-zinc-700 dark:text-[#E8EDF2]">
                  {region.id.replace("-", " ")}
                </span>
                <span className="ml-auto text-xs text-zinc-500 dark:text-[#9FAEC1]">
                  {region.value?.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
