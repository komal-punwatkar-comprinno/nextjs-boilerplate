"use client";

import { LeafletMap } from "@/components";
import { SectionWrapper } from "./section-wrapper";

const sampleMarkers = [
  { id: "1", lat: 51.505, lng: -0.09, label: "London Bridge" },
  { id: "2", lat: 51.515, lng: -0.1, label: "King's Cross" },
  { id: "3", lat: 51.498, lng: -0.075, label: "Tower of London" },
];

export function LeafletSection() {
  return (
    <SectionWrapper id="leaflet" title="Leaflet Map">
      <div className="space-y-8">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Interactive Map
          </p>
          <p className="mb-4 text-sm text-zinc-600 dark:text-[#9FAEC1]">
            The Leaflet map component renders an interactive map when the{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs dark:bg-[#2A3441]">leaflet</code> and{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs dark:bg-[#2A3441]">react-leaflet</code>{" "}
            packages are installed. Otherwise it shows a placeholder with install instructions.
          </p>
          <LeafletMap
            center={[51.505, -0.09]}
            zoom={13}
            markers={sampleMarkers}
            height="350px"
          />
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Installation
          </p>
          <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-[#2D3640] dark:bg-[#2A3441]">
            <p className="mb-2 text-sm text-zinc-700 dark:text-[#E8EDF2]">
              To enable full map rendering, install the Leaflet dependencies:
            </p>
            <code className="block rounded-md bg-white px-3 py-2 text-xs text-zinc-700 dark:bg-[#242B33] dark:text-[#E8EDF2]">
              npm install leaflet react-leaflet @types/leaflet
            </code>
            <p className="mt-3 text-xs text-zinc-500 dark:text-[#9FAEC1]">
              The component will automatically detect the library and render the full interactive map.
              No code changes required.
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
