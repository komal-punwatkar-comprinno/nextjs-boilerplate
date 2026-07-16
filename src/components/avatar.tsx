export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface AvatarProps {
  /** Image URL. When absent, initials are shown. */
  src?: string;
  /** Full name used to derive initials when no image is provided. */
  name?: string;
  size?: AvatarSize;
  className?: string;
}

const sizeClasses: Record<AvatarSize, string> = {
  xs: "h-6 w-6 text-[10px]",
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-xl",
};

/** Derive up to 2 initials from a full name. */
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0]!.charAt(0).toUpperCase();
  return (
    parts[0]!.charAt(0).toUpperCase() +
    parts[parts.length - 1]!.charAt(0).toUpperCase()
  );
}

/**
 * Circular user avatar. Shows an image when `src` is provided, otherwise
 * renders initials derived from `name`, or a generic icon.
 *
 * @example
 * <Avatar src="/photo.jpg" name="John Doe" size="md" />
 * <Avatar name="Jane Smith" size="sm" />
 */
export function Avatar({ src, name, size = "md", className = "" }: AvatarProps) {
  const base = `inline-flex items-center justify-center rounded-full bg-zinc-200 font-medium text-zinc-700 overflow-hidden shrink-0 dark:bg-[#353B46] dark:text-[#9FAEC1] ${sizeClasses[size]} ${className}`;

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={name ?? "User avatar"}
        className={base}
      />
    );
  }

  if (name) {
    return (
      <span className={base} aria-label={name} title={name}>
        {getInitials(name)}
      </span>
    );
  }

  // Generic fallback icon
  return (
    <span className={base} aria-hidden="true">
      <svg
        className="h-3/5 w-3/5 text-zinc-400 dark:text-[#9FAEC1]/60"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    </span>
  );
}

