import { iconPaths, type IconName } from "./icons";

export type { IconName };

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface IconProps {
  /** Icon to render — must be a key from the icon registry. */
  name: IconName;
  /** Size preset. Defaults to "md" (20×20). */
  size?: IconSize;
  /** Extra Tailwind classes, e.g. "text-indigo-600" or "shrink-0". */
  className?: string;
  /** Accessible label. Provide when the icon conveys meaning without surrounding text. */
  "aria-label"?: string;
}

const sizeClasses: Record<IconSize, string> = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
  xl: "h-8 w-8",
};

/**
 * Renders a single Heroicons (outline) SVG icon from the central registry.
 *
 * All icons inherit `currentColor` so you can tint them with any Tailwind
 * text-color class. No external dependency — paths are bundled at build time.
 *
 * @example
 * // Basic usage
 * <Icon name="trash" />
 *
 * // With size and colour
 * <Icon name="checkCircle" size="lg" className="text-emerald-600" />
 *
 * // Inside a button with accessible label
 * <button aria-label="Delete item">
 *   <Icon name="trash" size="sm" className="text-red-500" />
 * </button>
 *
 * // Decorative (hidden from screen readers)
 * <Icon name="home" aria-hidden />
 */
export function Icon({
  name,
  size = "md",
  className = "",
  "aria-label": ariaLabel,
}: IconProps) {
  const rawPath = iconPaths[name];

  // Support multi-path icons (paths separated by " M" after the first segment)
  const segments = rawPath.split(/ (?=M)/);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
      role={ariaLabel ? "img" : undefined}
      className={[sizeClasses[size], className].filter(Boolean).join(" ")}
    >
      {segments.map((d, i) => (
        <path
          key={i}
          strokeLinecap="round"
          strokeLinejoin="round"
          d={d}
        />
      ))}
    </svg>
  );
}

