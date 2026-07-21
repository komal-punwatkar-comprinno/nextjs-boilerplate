"use client";

export interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "full" | "icon";
  className?: string;
}

const sizeMap = {
  sm: { icon: 24, text: "text-sm" },
  md: { icon: 32, text: "text-lg" },
  lg: { icon: 40, text: "text-xl" },
};

/**
 * App logo component — renders SVG logo mark with optional text.
 */
export function Logo({ size = "md", variant = "full", className = "" }: LogoProps) {
  const s = sizeMap[size];

  return (
    <span className={["inline-flex items-center gap-2", className].join(" ")}>
      {/* Logo mark */}
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
      >
        <rect width="32" height="32" rx="8" className="fill-[#4CCBBF]" />
        <path
          d="M9 16l5 5 9-10"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Wordmark */}
      {variant === "full" && (
        <span
          className={[
            "font-bold tracking-tight text-zinc-900 dark:text-[#E8EDF2]",
            s.text,
          ].join(" ")}
        >
          Boilerplate
        </span>
      )}
    </span>
  );
}
