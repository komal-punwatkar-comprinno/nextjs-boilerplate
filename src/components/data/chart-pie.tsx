"use client";

export interface ChartPieDataPoint {
  label: string;
  value: number;
  color: string;
}

export interface ChartPieProps {
  data: ChartPieDataPoint[];
  donut?: boolean;
  size?: number;
  showLabels?: boolean;
  animate?: boolean;
  className?: string;
}

/**
 * SVG pie/donut chart with animated segments.
 */
export function ChartPie({
  data,
  donut = false,
  size = 200,
  showLabels = true,
  animate = true,
  className = "",
}: ChartPieProps) {
  if (data.length === 0) return null;

  const total = data.reduce((sum, d) => sum + d.value, 0);
  if (total === 0) return null;

  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.38;
  const innerRadius = donut ? radius * 0.6 : 0;

  function getArcPath(startAngle: number, endAngle: number, outerR: number, innerR: number): string {
    const startOuter = polarToCartesian(cx, cy, outerR, startAngle);
    const endOuter = polarToCartesian(cx, cy, outerR, endAngle);
    const startInner = polarToCartesian(cx, cy, innerR, endAngle);
    const endInner = polarToCartesian(cx, cy, innerR, startAngle);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;

    if (innerR === 0) {
      return [
        `M ${cx} ${cy}`,
        `L ${startOuter.x} ${startOuter.y}`,
        `A ${outerR} ${outerR} 0 ${largeArc} 1 ${endOuter.x} ${endOuter.y}`,
        "Z",
      ].join(" ");
    }

    return [
      `M ${startOuter.x} ${startOuter.y}`,
      `A ${outerR} ${outerR} 0 ${largeArc} 1 ${endOuter.x} ${endOuter.y}`,
      `L ${startInner.x} ${startInner.y}`,
      `A ${innerR} ${innerR} 0 ${largeArc} 0 ${endInner.x} ${endInner.y}`,
      "Z",
    ].join(" ");
  }

  function polarToCartesian(centerX: number, centerY: number, r: number, angleDeg: number) {
    const angleRad = ((angleDeg - 90) * Math.PI) / 180;
    return {
      x: Math.round((centerX + r * Math.cos(angleRad)) * 1000) / 1000,
      y: Math.round((centerY + r * Math.sin(angleRad)) * 1000) / 1000,
    };
  }

  let currentAngle = 0;
  const segments = data.map((d) => {
    const angle = (d.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;
    return { ...d, startAngle, endAngle, angle };
  });

  return (
    <div className={["inline-flex flex-col items-center gap-3", className].join(" ")}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label="Pie chart"
      >
        {segments.map((seg, i) => {
          // Avoid rendering a full 360° arc (SVG can't draw it as a single arc)
          const adjustedEnd = seg.angle >= 359.99 ? seg.startAngle + 359.99 : seg.endAngle;
          const path = getArcPath(seg.startAngle, adjustedEnd, radius, innerRadius);

          return (
            <path
              key={i}
              d={path}
              fill={seg.color}
              className="transition-opacity hover:opacity-80"
              stroke="white"
              strokeWidth={1.5}
            >
              {animate && (
                <animate
                  attributeName="opacity"
                  from="0"
                  to="1"
                  dur="0.4s"
                  begin={`${i * 0.08}s`}
                  fill="freeze"
                />
              )}
            </path>
          );
        })}
      </svg>

      {/* Legend */}
      {showLabels && (
        <div className="flex flex-wrap justify-center gap-3">
          {data.map((d, i) => (
            <div key={i} className="flex items-center gap-1.5 text-xs">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: d.color }}
              />
              <span className="text-zinc-600 dark:text-[#9FAEC1]">
                {d.label} ({Math.round((d.value / total) * 100)}%)
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
