"use client";

import { useEffect, useState } from "react";

export interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  label?: string;
  color?: string;
}

export interface LeafletMapProps {
  center?: [number, number];
  zoom?: number;
  markers?: MapMarker[];
  onMarkerClick?: (marker: MapMarker) => void;
  height?: string;
  className?: string;
}

/**
 * Smart Leaflet wrapper that renders the map when leaflet is installed,
 * otherwise shows a styled placeholder with installation instructions.
 */
export function LeafletMap({
  center = [51.505, -0.09],
  zoom = 13,
  markers = [],
  onMarkerClick,
  height = "400px",
  className = "",
}: LeafletMapProps) {
  const [leafletAvailable, setLeafletAvailable] = useState(false);
  const [mapModule, setMapModule] = useState<unknown>(null);

  useEffect(() => {
    // Attempt dynamic import to check if leaflet is installed
    const moduleName = "leaflet";
    import(/* webpackIgnore: true */ moduleName)
      .then((mod) => {
        setLeafletAvailable(true);
        setMapModule(mod);
      })
      .catch(() => {
        setLeafletAvailable(false);
      });
  }, []);

  if (!leafletAvailable || !mapModule) {
    return (
      <div
        style={{ height }}
        className={[
          "flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50",
          "dark:border-[#3D4A5C] dark:bg-[#2A3441]",
          className,
        ].join(" ")}
      >
        {/* Map icon */}
        <svg
          className="mb-3 h-12 w-12 text-zinc-400 dark:text-[#9FAEC1]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
          />
        </svg>

        <p className="mb-1 text-sm font-semibold text-zinc-700 dark:text-[#E8EDF2]">
          Leaflet Map
        </p>
        <p className="mb-3 max-w-xs text-center text-xs text-zinc-500 dark:text-[#9FAEC1]">
          Install Leaflet to enable interactive maps
        </p>

        <code className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-700 dark:border-[#3D4A5C] dark:bg-[#242B33] dark:text-[#E8EDF2]">
          npm install leaflet react-leaflet @types/leaflet
        </code>

        {/* Display configuration */}
        <div className="mt-4 rounded-md border border-zinc-200 bg-white px-3 py-2 text-xs dark:border-[#3D4A5C] dark:bg-[#242B33]">
          <p className="text-zinc-500 dark:text-[#9FAEC1]">
            Center: [{center[0]}, {center[1]}] · Zoom: {zoom} · Markers: {markers.length}
          </p>
        </div>
      </div>
    );
  }

  // Leaflet is available — render a basic map
  // In a real implementation, use react-leaflet components here
  return (
    <div
      style={{ height }}
      className={[
        "relative overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100",
        "dark:border-[#2D3640] dark:bg-[#2A3441]",
        className,
      ].join(" ")}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-sm text-zinc-500 dark:text-[#9FAEC1]">
          Leaflet loaded — implement react-leaflet rendering here.
        </p>
      </div>
      {/* Marker list overlay */}
      {markers.length > 0 && (
        <div className="absolute bottom-2 left-2 rounded-md bg-white/90 px-2 py-1 text-xs dark:bg-[#242B33]/90">
          {markers.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => onMarkerClick?.(m)}
              className="block text-left text-zinc-700 hover:text-[#4CCBBF] dark:text-[#E8EDF2]"
            >
              📍 {m.label || m.id}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
