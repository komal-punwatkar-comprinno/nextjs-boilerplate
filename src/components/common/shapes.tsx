"use client";

export interface ShapesProps {
  variant: "dots" | "blob" | "circle" | "wave";
  className?: string;
}

/**
 * Decorative SVG shapes used as page/section backgrounds.
 */
export function Shapes({ variant, className = "" }: ShapesProps) {
  switch (variant) {
    case "dots":
      return <DotsShape className={className} />;
    case "blob":
      return <BlobShape className={className} />;
    case "circle":
      return <CircleShape className={className} />;
    case "wave":
      return <WaveShape className={className} />;
    default:
      return null;
  }
}

function DotsShape({ className }: { className: string }) {
  const dots = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 12; col++) {
      dots.push(
        <circle
          key={`${row}-${col}`}
          cx={col * 20 + 10}
          cy={row * 20 + 10}
          r={2}
          className="fill-zinc-400 dark:fill-[#4CCBBF]/40"
        />
      );
    }
  }

  return (
    <svg
      viewBox="0 0 240 160"
      className={["pointer-events-none", className].join(" ")}
      aria-hidden="true"
    >
      {dots}
    </svg>
  );
}

function BlobShape({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={["pointer-events-none", className].join(" ")}
      aria-hidden="true"
    >
      <path
        d="M44.7,-76.4C58.8,-69.2,71.8,-58.7,79.6,-45.3C87.4,-31.9,90,-15.9,88.7,-0.8C87.3,14.4,82,28.8,73.8,41.5C65.6,54.2,54.5,65.2,41.3,73.2C28.1,81.2,12.9,86.1,-1.5,88.7C-15.9,91.3,-31.8,91.5,-44.9,83.8C-58,76.1,-68.3,60.5,-75.6,44.2C-82.8,27.9,-87,11,-84.8,-4.8C-82.6,-20.6,-74,-35.3,-63.1,-46.8C-52.1,-58.4,-38.8,-66.8,-25.1,-74.3C-11.4,-81.8,2.7,-88.5,17.3,-87.5C31.9,-86.5,47.1,-77.9,44.7,-76.4Z"
        transform="translate(100 100)"
        className="fill-[#4CCBBF]/25 dark:fill-[#4CCBBF]/15"
      />
    </svg>
  );
}

function CircleShape({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={["pointer-events-none", className].join(" ")}
      aria-hidden="true"
    >
      <circle cx="100" cy="100" r="80" className="stroke-zinc-300 dark:stroke-[#4CCBBF]/30" fill="none" strokeWidth={1} />
      <circle cx="100" cy="100" r="60" className="stroke-zinc-300 dark:stroke-[#4CCBBF]/30" fill="none" strokeWidth={1} />
      <circle cx="100" cy="100" r="40" className="stroke-zinc-300 dark:stroke-[#4CCBBF]/30" fill="none" strokeWidth={1} />
      <circle cx="100" cy="100" r="20" className="fill-[#4CCBBF]/10 dark:fill-[#4CCBBF]/10" />
    </svg>
  );
}

function WaveShape({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      className={["pointer-events-none w-full", className].join(" ")}
      aria-hidden="true"
    >
      <path
        d="M0,40 C200,80 400,0 600,40 C800,80 1000,0 1200,40 L1200,120 L0,120 Z"
        className="fill-zinc-200 dark:fill-[#2D3640]"
      />
    </svg>
  );
}
