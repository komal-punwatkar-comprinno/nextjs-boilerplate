import { SectionWrapper } from "./section-wrapper";

const palettes = [
  {
    name: "Primary (Indigo)",
    shades: [
      { shade: "50", hex: "#eef2ff" },
      { shade: "100", hex: "#e0e7ff" },
      { shade: "200", hex: "#c7d2fe" },
      { shade: "300", hex: "#a5b4fc" },
      { shade: "400", hex: "#818cf8" },
      { shade: "500", hex: "#6366f1" },
      { shade: "600", hex: "#4f46e5" },
      { shade: "700", hex: "#4338ca" },
      { shade: "800", hex: "#3730a3" },
      { shade: "900", hex: "#312e81" },
    ],
  },
  {
    name: "Success (Green)",
    shades: [
      { shade: "50", hex: "#f0fdf4" },
      { shade: "100", hex: "#dcfce7" },
      { shade: "200", hex: "#bbf7d0" },
      { shade: "400", hex: "#4ade80" },
      { shade: "500", hex: "#22c55e" },
      { shade: "600", hex: "#16a34a" },
      { shade: "700", hex: "#15803d" },
      { shade: "800", hex: "#166534" },
      { shade: "900", hex: "#14532d" },
    ],
  },
  {
    name: "Warning (Amber)",
    shades: [
      { shade: "50", hex: "#fffbeb" },
      { shade: "100", hex: "#fef3c7" },
      { shade: "200", hex: "#fde68a" },
      { shade: "400", hex: "#fbbf24" },
      { shade: "500", hex: "#f59e0b" },
      { shade: "600", hex: "#d97706" },
      { shade: "700", hex: "#b45309" },
      { shade: "800", hex: "#92400e" },
      { shade: "900", hex: "#78350f" },
    ],
  },
  {
    name: "Danger (Red)",
    shades: [
      { shade: "50", hex: "#fef2f2" },
      { shade: "100", hex: "#fee2e2" },
      { shade: "200", hex: "#fecaca" },
      { shade: "400", hex: "#f87171" },
      { shade: "500", hex: "#ef4444" },
      { shade: "600", hex: "#dc2626" },
      { shade: "700", hex: "#b91c1c" },
      { shade: "800", hex: "#991b1b" },
      { shade: "900", hex: "#7f1d1d" },
    ],
  },
  {
    name: "Info (Blue)",
    shades: [
      { shade: "50", hex: "#eff6ff" },
      { shade: "100", hex: "#dbeafe" },
      { shade: "200", hex: "#bfdbfe" },
      { shade: "400", hex: "#60a5fa" },
      { shade: "500", hex: "#3b82f6" },
      { shade: "600", hex: "#2563eb" },
      { shade: "700", hex: "#1d4ed8" },
      { shade: "800", hex: "#1e40af" },
      { shade: "900", hex: "#1e3a8a" },
    ],
  },
  {
    name: "Neutral (Slate)",
    shades: [
      { shade: "50", hex: "#f8fafc" },
      { shade: "100", hex: "#f1f5f9" },
      { shade: "200", hex: "#e2e8f0" },
      { shade: "400", hex: "#94a3b8" },
      { shade: "500", hex: "#64748b" },
      { shade: "600", hex: "#475569" },
      { shade: "700", hex: "#334155" },
      { shade: "800", hex: "#1e293b" },
      { shade: "900", hex: "#0f172a" },
    ],
  },
];

function isDark(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 128;
}

export function ColorSection() {
  return (
    <SectionWrapper id="colors" title="1. Theme Colors">
      <div className="space-y-8">
        {palettes.map((palette) => (
          <div key={palette.name}>
            <p className="mb-3 text-sm font-semibold text-slate-600">{palette.name}</p>
            <div className="flex flex-wrap gap-2">
              {palette.shades.map(({ shade, hex }) => (
                <div key={shade} className="flex flex-col items-center gap-1">
                  <div
                    className="h-12 w-14 rounded-lg border border-black/5 shadow-sm"
                    style={{ backgroundColor: hex }}
                    title={hex}
                  />
                  <span className="text-[10px] font-medium text-slate-500">{shade}</span>
                  <span
                    className="rounded px-1 py-0.5 font-mono text-[9px]"
                    style={{
                      backgroundColor: hex,
                      color: isDark(hex) ? "#fff" : "#1e293b",
                    }}
                  >
                    {hex}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
