import { SectionWrapper } from "./section-wrapper";

/*
 * These are the ACTUAL colors used in this boilerplate.
 * Grouped to match globals.css + component dark-mode classes.
 */
const palettes = [
  {
    name: "Primary - Teal",
    
    shades: [
      { label: "50",    hex: "#edfaf9" },
      { label: "100",   hex: "#d0f4f1" },
      { label: "200",   hex: "#a3e9e4" },
      { label: "300",   hex: "#6dd9d2" },
      { label: "400 ★", hex: "#4CCBBF" },
      { label: "500",   hex: "#31b0a5" },
      { label: "600",   hex: "#268d84" },
      { label: "700",   hex: "#1e6e68" },
      { label: "800",   hex: "#175250" },
      { label: "900",   hex: "#103c3a" },
    ],
  },
  {
    name: "Dark Surfaces - Navy",
    
    shades: [
      { label: "Canvas",  hex: "#1C2127" },
      { label: "Surface", hex: "#242B33" },
      { label: "Raised",  hex: "#2D3640" },
      { label: "Border",  hex: "#3D4A5C" },
      { label: "Sidebar", hex: "#1A1F2E" },
    ],
  },
  {
    name: "Light Surfaces",
    
    shades: [
      { label: "Page bg",    hex: "#F5F6FA" },
      { label: "Card",       hex: "#FFFFFF" },
      { label: "Border",     hex: "#E5E7EB" },
      { label: "Muted bg",   hex: "#F8FAFC" },
      { label: "Hover row",  hex: "#F1F5F9" },
    ],
  },
  {
    name: "Success - Teal Green",
    
    shades: [
      { label: "Light", hex: "#d0f4e7" },
      { label: "Base ★",hex: "#4CCB98" },
      { label: "Dark",  hex: "#268d62" },
    ],
  },
  {
    name: "Warning - Amber",
    
    shades: [
      { label: "Light", hex: "#fef3c7" },
      { label: "Base ★",hex: "#FCA90B" },
      { label: "Dark",  hex: "#b77608" },
    ],
  },
  {
    name: "Danger - Red",
    
    shades: [
      { label: "Light", hex: "#fde8eb" },
      { label: "Base ★",hex: "#ED495D" },
      { label: "Dark",  hex: "#c0283a" },
    ],
  },
  {
    name: "Info - Blue",
   
    shades: [
      { label: "Light", hex: "#dbeafe" },
      { label: "Base ★",hex: "#3B82F6" },
      { label: "Dark",  hex: "#1d4ed8" },
    ],
  },
  {
    name: "Text Scale",
    
    shades: [
      { label: "Primary",   hex: "#1A1D23" },
      { label: "Secondary", hex: "#475569" },
      { label: "Muted",     hex: "#64748B" },
      { label: "Subtle",    hex: "#94A3B8" },
      { label: "Disabled",  hex: "#CBD5E1" },
      // Dark mode text scale
      { label: "D Primary",  hex: "#E2E8F0" },
      { label: "D Secondary",hex: "#CBD5E1" },
      { label: "D Muted",    hex: "#94A3B8" },
      { label: "D Subtle",   hex: "#64748B" },
      { label: "D Disabled", hex: "#475569" },
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
      <div className="space-y-10">
        {palettes.map((palette) => (
          <div key={palette.name}>
            <div className="mb-3">
              <p className="text-sm font-semibold text-slate-700 dark:text-[#E2E8F0]">{palette.name}</p>
              
            </div>
            <div className="flex flex-wrap gap-2">
              {palette.shades.map(({ label, hex }) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <div
                    className="h-12 w-16 rounded-lg border border-black/5 shadow-sm"
                    style={{ backgroundColor: hex }}
                    title={hex}
                  />
                  <span className="text-[10px] font-medium text-slate-500 dark:text-[#64748B]">{label}</span>
                  <span
                    className="rounded px-1 py-0.5 font-mono text-[9px]"
                    style={{ backgroundColor: hex, color: isDark(hex) ? "#fff" : "#1A1D23" }}
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
