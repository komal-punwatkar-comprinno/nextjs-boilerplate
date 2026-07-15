/**
 * Application-wide, non-secret settings.
 *
 * Keep deployment-specific values in environment variables rather than here.
 */
export const siteConfig = {
  name: "Next.js SaaS Boilerplate",
  description: "A reusable foundation for enterprise SaaS applications.",
} as const
