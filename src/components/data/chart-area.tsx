"use client";

export interface ChartAreaDataPoint {
  label: string;
  value: number;
}

export interface ChartAreaSeries {
  name: string;
  data: ChartAreaDataPoint[];
  color?: string;
}

export interface ChartAreaProps {
  data: ChartAreaDataPoint[] | ChartAreaSeries[];
  height?: number;
  showDots?: boolean;
  showGrid?: boolean;
  animate?: boolean;
  className?: string;
}

function isSeries(data: ChartAreaDataPoint[] | ChartAreaSeries[]): data is ChartAreaSeries[] {
  return data.length > 0 && "name" in data[0] && "data" in data[0];
}

/**
 * SVG area chart — filled line chart with gradient fill under the line.
 */
export function ChartArea({
  data,
  height = 200,
  showDots = false,
  showGrid = true,
  animate = true,
  className = "",
}: ChartAreaProps) {
  if (data.length === 0) return null;

  const series: ChartAreaSeries[] = isSeries(data)
    ? data
    : [{ name: "default", data: data as ChartAreaDataPoint[], color: "#4CCBBF" }];

  const allPoints = series.flatMap((s) => s.data);
  if (allPoints.length === 0) return null;

  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const width = 500;
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const maxValue = Math.max(...allPoints.map((p) => p.value), 1);
  const gridLines = 4;
  const defaultColors = ["#4CCBBF", "#ED495D", "#F59E0B", "#8B5CF6", "#3B82F6"];

  function getPoint(points: ChartAreaDataPoint[], i: number) {
    const stepX = chartWidth / (points.length - 1);
    const x = padding.left + stepX * i;
    const y = padding.top + chartHeight - (points[i].value / maxValue) * chartHeight;
    return { x, y };
  }

  function getLinePath(points: ChartAreaDataPoint[]): string {
    return points
      .map((_, i) => {
        const { x, y } = getPoint(points, i);
        return `${i === 0 ? "M" : "L"}${x},${y}`;
      })
      .join(" ");
  }

  function getAreaPath(points: ChartAreaDataPoint[]): string {
    const baseline = padding.top + chartHeight;
    const firstX = padding.left;
    const lastX = padding.left + chartWidth;

    const linePart = points
      .map((_, i) => {
        const { x, y } = getPoint(points, i);
        return `${i === 0 ? "M" : "L"}${x},${y}`;
      })
      .join(" ");

    return `${linePart} L${lastX},${baseline} L${firstX},${baseline} Z`;
  }

  return (
    <div className={["w-full", className].join(" ")}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        role="img"
        aria-label="Area chart"
      >
        <defs>
          {series.map((s, sIdx) => {
            const color = s.color || defaultColors[sIdx % defaultColors.length];
            return (
              <linearGradient
                key={`gradient-${sIdx}`}
                id={`area-gradient-${sIdx}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                <stop offset="100%" stopColor={color} stopOpacity={0.02} />
              </linearGradient>
            );
          })}
        </defs>

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
          const { x } = getPoint(series[0].data, i);
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

        {/* Areas and lines */}
        {series.map((s, sIdx) => {
          const color = s.color || defaultColors[sIdx % defaultColors.length];
          const areaPath = getAreaPath(s.data);
          const linePath = getLinePath(s.data);

          return (
            <g key={s.name}>
              <path
                d={areaPath}
                fill={`url(#area-gradient-${sIdx})`}
                opacity={animate ? 0 : 1}
              >
                {animate && (
                  <animate attributeName="opacity" from="0" to="1" dur="0.8s" fill="freeze" />
                )}
              </path>
              <path
                d={linePath}
                fill="none"
                stroke={color}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
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
