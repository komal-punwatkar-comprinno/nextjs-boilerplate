"use client";

export interface ChartBarDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface ChartBarProps {
  data: ChartBarDataPoint[];
  height?: number;
  showGrid?: boolean;
  showLabels?: boolean;
  animate?: boolean;
  className?: string;
}

/**
 * Pure SVG bar chart with optional grid, labels, and animation.
 */
export function ChartBar({
  data,
  height = 200,
  showGrid = true,
  showLabels = true,
  animate = true,
  className = "",
}: ChartBarProps) {
  if (data.length === 0) return null;

  const padding = { top: 20, right: 20, bottom: showLabels ? 40 : 20, left: 50 };
  const width = 500;
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const barWidth = Math.min(40, (chartWidth / data.length) * 0.6);
  const barGap = (chartWidth - barWidth * data.length) / (data.length + 1);

  const gridLines = maxValue <= 5 ? maxValue : Math.min(5, Math.ceil(maxValue));
  const gridStep = maxValue <= 5 ? 1 : Math.ceil(maxValue / gridLines);
  const adjustedMax = gridStep * gridLines;
  const defaultColor = "#4CCBBF";

  return (
    <div className={["w-full", className].join(" ")}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        role="img"
        aria-label="Bar chart"
      >
        {/* Grid lines */}
        {showGrid &&
          Array.from({ length: gridLines + 1 }).map((_, i) => {
            const y = padding.top + (chartHeight / gridLines) * i;
            const val = adjustedMax - gridStep * i;
            return (
              <g key={`grid-${i}`}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  className="stroke-zinc-200 dark:stroke-[#3D4A5C]"
                  strokeWidth={0.5}
                />
                <text
                  x={padding.left - 8}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-zinc-400 text-[10px] dark:fill-[#9FAEC1]"
                >
                  {val}
                </text>
              </g>
            );
          })}

        {/* Bars */}
        {data.map((d, i) => {
          const barHeight = (d.value / adjustedMax) * chartHeight;
          const x = padding.left + barGap * (i + 1) + barWidth * i;
          const y = padding.top + chartHeight - barHeight;

          return (
            <g key={`bar-${i}`} className="group">
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx={3}
                fill={d.color || defaultColor}
                opacity={0.9}
                className="transition-opacity hover:opacity-100"
              >
                <title>{d.label}: {d.value}</title>
                {animate && (
                  <animate
                    attributeName="height"
                    from="0"
                    to={barHeight}
                    dur="0.6s"
                    begin={`${i * 0.05}s`}
                    fill="freeze"
                  />
                )}
                {animate && (
                  <animate
                    attributeName="y"
                    from={padding.top + chartHeight}
                    to={y}
                    dur="0.6s"
                    begin={`${i * 0.05}s`}
                    fill="freeze"
                  />
                )}
              </rect>

              {/* Value on top of bar */}
              <text
                x={x + barWidth / 2}
                y={y - 5}
                textAnchor="middle"
                className="fill-zinc-600 text-[9px] font-semibold dark:fill-[#E8EDF2] opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {d.value}
              </text>

              {/* Labels */}
              {showLabels && (
                <text
                  x={x + barWidth / 2}
                  y={height - padding.bottom + 16}
                  textAnchor="middle"
                  className="fill-zinc-500 text-[10px] dark:fill-[#9FAEC1]"
                >
                  {d.label.length > 8 ? d.label.slice(0, 7) + "…" : d.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
