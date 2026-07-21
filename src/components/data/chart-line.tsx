"use client";

export interface ChartLineDataPoint {
  label: string;
  value: number;
}

export interface ChartLineSeries {
  name: string;
  data: ChartLineDataPoint[];
  color?: string;
}

export interface ChartLineProps {
  data: ChartLineDataPoint[] | ChartLineSeries[];
  height?: number;
  showDots?: boolean;
  showGrid?: boolean;
  animate?: boolean;
  className?: string;
}

function isSeries(data: ChartLineDataPoint[] | ChartLineSeries[]): data is ChartLineSeries[] {
  return data.length > 0 && "name" in data[0] && "data" in data[0];
}

/**
 * SVG line chart supporting single data array or multiple series.
 * Renders smooth lines with optional dots, grid, and animation.
 */
export function ChartLine({
  data,
  height = 200,
  showDots = true,
  showGrid = true,
  animate = true,
  className = "",
}: ChartLineProps) {
  if (data.length === 0) return null;

  const series: ChartLineSeries[] = isSeries(data)
    ? data
    : [{ name: "default", data: data as ChartLineDataPoint[], color: "#4CCBBF" }];

  const allPoints = series.flatMap((s) => s.data);
  if (allPoints.length === 0) return null;

  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const width = 500;
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const maxValue = Math.max(...allPoints.map((p) => p.value), 1);
  const gridLines = 4;
  const defaultColors = ["#4CCBBF", "#ED495D", "#F59E0B", "#8B5CF6", "#3B82F6"];

  function getPath(points: ChartLineDataPoint[]): string {
    if (points.length < 2) return "";
    const stepX = chartWidth / (points.length - 1);

    return points
      .map((p, i) => {
        const x = padding.left + stepX * i;
        const y = padding.top + chartHeight - (p.value / maxValue) * chartHeight;
        return `${i === 0 ? "M" : "L"}${x},${y}`;
      })
      .join(" ");
  }

  function getPoint(points: ChartLineDataPoint[], i: number) {
    const stepX = chartWidth / (points.length - 1);
    const x = padding.left + stepX * i;
    const y = padding.top + chartHeight - (points[i].value / maxValue) * chartHeight;
    return { x, y };
  }

  return (
    <div className={["w-full", className].join(" ")}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        role="img"
        aria-label="Line chart"
      >
        {/* Grid */}
        {showGrid &&
          Array.from({ length: gridLines + 1 }).map((_, i) => {
            const y = padding.top + (chartHeight / gridLines) * i;
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
                  {Math.round(maxValue - (maxValue / gridLines) * i)}
                </text>
              </g>
            );
          })}

        {/* X-axis labels */}
        {series[0].data.map((p, i) => {
          const stepX = chartWidth / (series[0].data.length - 1);
          const x = padding.left + stepX * i;
          if (series[0].data.length > 10 && i % 2 !== 0) return null;
          return (
            <text
              key={`label-${i}`}
              x={x}
              y={height - padding.bottom + 16}
              textAnchor="middle"
              className="fill-zinc-500 text-[10px] dark:fill-[#9FAEC1]"
            >
              {p.label}
            </text>
          );
        })}

        {/* Lines */}
        {series.map((s, sIdx) => {
          const path = getPath(s.data);
          const color = s.color || defaultColors[sIdx % defaultColors.length];
          const pathLength = s.data.length * 100; // approximate

          return (
            <g key={s.name}>
              <path
                d={path}
                fill="none"
                stroke={color}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={animate ? pathLength : undefined}
                strokeDashoffset={animate ? pathLength : undefined}
              >
                {animate && (
                  <animate
                    attributeName="stroke-dashoffset"
                    from={pathLength}
                    to="0"
                    dur="1s"
                    fill="freeze"
                  />
                )}
              </path>

              {/* Dots */}
              {showDots &&
                s.data.map((_, i) => {
                  const { x, y } = getPoint(s.data, i);
                  return (
                    <circle
                      key={`dot-${sIdx}-${i}`}
                      cx={x}
                      cy={y}
                      r={3}
                      fill={color}
                      className="stroke-white dark:stroke-[#242B33]"
                      strokeWidth={2}
                    />
                  );
                })}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
