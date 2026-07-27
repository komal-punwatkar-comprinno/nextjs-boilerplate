import { cn } from "@/lib/utils";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSocialLink {
  label: string;
  href: string;
  /** SVG path data for the social icon. */
  icon: string;
}

export interface FooterProps {
  /** Brand name displayed in the footer. */
  brandName?: string;
  /** Logo image src (optional). */
  logo?: string;
  /** Navigation links. */
  links?: FooterLink[];
  /** Social media links with SVG icon paths. */
  socialLinks?: FooterSocialLink[];
  /** Additional class names. */
  className?: string;
  /** Use "dark" variant when placed on a dark background without CSS dark mode. */
  variant?: "auto" | "dark";
}

const defaultLinks: FooterLink[] = [
  { label: "About", href: "#" },
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Contact", href: "#" },
];

const defaultSocialLinks: FooterSocialLink[] = [
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: "M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.43.36a9.06 9.06 0 01-2.88 1.1A4.52 4.52 0 0016.11 0c-2.5 0-4.52 2.02-4.52 4.52 0 .35.04.7.11 1.03C7.73 5.35 4.1 3.55 1.67.83a4.5 4.5 0 00-.61 2.27c0 1.57.8 2.95 2.01 3.76a4.5 4.5 0 01-2.05-.56v.06c0 2.19 1.56 4.01 3.63 4.43a4.52 4.52 0 01-2.04.08c.58 1.8 2.25 3.11 4.23 3.15A9.07 9.07 0 010 19.54 12.8 12.8 0 006.95 21c8.35 0 12.91-6.92 12.91-12.91 0-.2 0-.39-.01-.58A9.22 9.22 0 0023 3z",
  },
  {
    label: "GitHub",
    href: "https://github.com",
    icon: "M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016.02 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58A12.01 12.01 0 0024 12c0-6.63-5.37-12-12-12z",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: "M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.66H9.37V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z",
  },
];

/**
 * Site footer with brand, copyright, navigation links, and social links.
 * Fully configurable via props — no hardcoded brand values.
 *
 * @example
 * <Footer
 *   brandName="Comprinno"
 *   logo="/logo-300x300.png"
 *   links={[{ label: "Docs", href: "/docs" }]}
 *   socialLinks={[{ label: "GitHub", href: "https://github.com/comprinno", icon: "M12 0C5.37..." }]}
 * />
 */
export function Footer({
  brandName = "Your Brand",
  logo,
  links = defaultLinks,
  socialLinks = defaultSocialLinks,
  className,
  variant = "auto",
}: FooterProps) {
  const currentYear = new Date().getFullYear();
  const isDark = variant === "dark";

  return (
    <footer
      className={cn(
        "border-t px-4 py-8 sm:px-6 lg:px-8",
        isDark
          ? "border-white/[0.06] bg-[#0A0D14]"
          : "border-zinc-200 bg-white dark:border-[#2D3640] dark:bg-[#242B33]",
        className
      )}
    >
      <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* Brand / Copyright */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            {logo && (
              <img src={logo} alt={brandName} className="h-6 w-6 object-contain" />
            )}
            <span className={cn(
              "text-sm font-semibold",
              isDark ? "text-[#E8EDF2]" : "text-zinc-900 dark:text-[#E8EDF2]"
            )}>
              {brandName}
            </span>
          </div>
          <p className={cn(
            "text-xs",
            isDark ? "text-[#9FAEC1]" : "text-zinc-500 dark:text-[#9FAEC1]"
          )}>
            © {currentYear} {brandName}. All rights reserved.
          </p>
        </div>

        {/* Links */}
        {links.length > 0 && (
          <nav aria-label="Footer navigation" className="flex items-center justify-center">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={cn(
                      "text-sm transition-colors",
                      isDark
                        ? "text-[#9FAEC1] hover:text-[#E8EDF2]"
                        : "text-zinc-600 hover:text-zinc-900 dark:text-[#9FAEC1] dark:hover:text-[#E8EDF2]"
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Social Links */}
        {socialLinks.length > 0 && (
          <div className="flex items-center gap-4 sm:justify-end">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={cn(
                  "transition-colors",
                  isDark
                    ? "text-[#9FAEC1] hover:text-[#4CCBBF]"
                    : "text-zinc-500 hover:text-zinc-700 dark:text-[#9FAEC1] dark:hover:text-[#4CCBBF]"
                )}
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d={social.icon} />
                </svg>
              </a>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
}
