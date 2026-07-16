/**
 * Barrel file for React contexts.
 *
 * Re-export contexts from here so consumers can import from `@/contexts`.
 */
export { AuthContext } from "./auth-context";
export type { AuthContextValue } from "./auth-context";
export { ThemeContext, useTheme } from "./theme-context";
export type { ThemeContextValue, Theme } from "./theme-context";
