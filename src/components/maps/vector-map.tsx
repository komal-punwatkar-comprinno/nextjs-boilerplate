"use client";

import { useState } from "react";

export interface VectorMapRegion {
  id: string;
  value?: number;
  color?: string;
}

export interface VectorMapProps {
  regions?: VectorMapRegion[];
  onRegionClick?: (region: VectorMapRegion) => void;
  showTooltip?: boolean;
  className?: string;
}

// Simplified world map regions as SVG paths (continents)
const WORLD_REGIONS: Record<string, { path: string; label: string; cx: number; cy: number }> = {
  "north-america": {
    path: "M60,50 L120,30 L160,50 L150,80 L130,110 L100,120 L70,100 L50,70 Z",
    label: "North America",
    cx: 105,
    cy: 70,
  },
  "south-america": {
    path: "M110,130 L130,125 L145,150 L140,190 L125,220 L110,210 L100,180 L105,150 Z",
    label: "South America",
    cx: 120,
    cy: 170,
  },
  europe: {
    path: "M230,40 L260,35 L280,45 L275,60 L260,70 L240,65 L225,55 Z",
    label: "Europe",
    cx: 255,
    cy: 52,
  },
  africa: {
    path: "M230,80 L270,75 L285,100 L280,140 L260,170 L240,165 L225,135 L220,100 Z",
    label: "Africa",
    cx: 252,
    cy: 120,
  },
  asia: {
    path: "M280,30 L350,25 L380,50 L370,80 L340,95 L310,90 L285,70 L275,45 Z",
    label: "Asia",
    cx: 330,
    cy: 58,
  },
  oceania: {
    path: "M340,150 L380,145 L395,160 L385,180 L360,185 L345,170 Z",
    label: "Oceania",
    cx: 368,
    cy: 165,
  },
};

/**
 * SVG-based world map with highlightable regions and optional tooltips.
 */
export function VectorMap({
  regions = [],
  onRegionClick,
  showTooltip = true,
  className = "",
}: VectorMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const regionMap = new Map(regions.map((r) => [r.id, r]));

  function getRegionColor(id: string): string {
    const region = regionMap.get(id);
    if (region?.color) return region.color;
    if (region) return "#4CCBBF";
    return "";
  }

  function handleMouseMove(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }

  return (
    <div
      className={[
        "relative w-full overflow-hidden rounded-xl border border-zinc-200 bg-white p-4",
        "dark:border-[#2D3640] dark:bg-[#242B33]",
        className,
      ].join(" ")}
      onMouseMove={handleMouseMove}
    >
      <svg
        viewBox="0 0 450 240"
        className="w-full"
        role="img"
        aria-label="World map"
      >
        {/* Background ocean */}
        <rect width="450" height="240" className="fill-zinc-50 dark:fill-[#2A3441]" rx="8" />

        {/* Regions */}
        {Object.entries(WORLD_REGIONS).map(([id, region]) => {
          const color = getRegionColor(id);
          const isHovered = hoveredRegion === id;
          const regionData = regionMap.get(id);

          return (
            <g key={id}>
              <path
                d={region.path}
                fill={color || (isHovered ? "#4CCBBF" : "")}
                className={[
                  !color && !isHovered ? "fill-zinc-300 dark:fill-[#3D4A5C]" : "",
                  "cursor-pointer transition-all duration-200",
                  isHovered ? "opacity-80" : "",
                ].join(" ")}
                stroke="white"
                strokeWidth={1}
                onMouseEnter={() => setHoveredRegion(id)}
                onMouseLeave={() => setHoveredRegion(null)}
                onClick={() => regionData && onRegionClick?.(regionData)}
              />
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {showTooltip && hoveredRegion && (
        <div
          className="pointer-events-none absolute z-10 rounded-md border border-zinc-200 bg-white px-2 py-1 text-xs shadow-md dark:border-[#3D4A5C] dark:bg-[#2A3441]"
          style={{
            left: tooltipPos.x + 12,
            top: tooltipPos.y - 30,
          }}
        >
          <span className="font-medium text-zinc-800 dark:text-[#E8EDF2]">
            {WORLD_REGIONS[hoveredRegion]?.label}
          </span>
          {regionMap.get(hoveredRegion)?.value !== undefined && (
            <span className="ml-1 text-zinc-500 dark:text-[#9FAEC1]">
              ({regionMap.get(hoveredRegion)!.value})
            </span>
          )}
        </div>
      )}
    </div>
  );
}
