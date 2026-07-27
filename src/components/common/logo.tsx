"use client";

import Image from "next/image";

export interface LogoProps {
  /** Logo image source path. */
  src?: string;
  /** Brand name displayed next to the logo. */
  name?: string;
  /** Size preset. */
  size?: "sm" | "md" | "lg";
  /** Show icon only or full logo with name. */
  variant?: "full" | "icon";
  /** Additional class names. */
  className?: string;
  /** Override text color classes for the brand name. */
  textClassName?: string;
}

const sizeMap = {
  sm: { icon: 28, text: "text-base" },
  md: { icon: 32, text: "text-lg" },
  lg: { icon: 40, text: "text-xl" },
};

/**
 * Brand logo with optional name. Fully configurable via props.
 *
 * @example
 * <Logo src="/logo.png" name="Comprinno" size="md" />
 * <Logo src="/logo.png" variant="icon" />
 */
export function Logo({
  src = "/logo.png",
  name = "Brand",
  size = "md",
  variant = "full",
  className = "",
  textClassName,
}: LogoProps) {
  const s = sizeMap[size];

  return (
    <span className={["inline-flex items-center gap-2", className].join(" ")}>
      {/* Logo icon */}
      <Image
        src={src}
        alt={name}
        width={s.icon}
        height={s.icon}
        className="object-contain"
      />

      {/* Brand name */}
      {variant === "full" && (
        <span
          className={[
            "font-bold tracking-tight",
            textClassName || "text-zinc-900 dark:text-white",
            s.text,
          ].join(" ")}
        >
          {name}
        </span>
      )}
    </span>
  );
}
