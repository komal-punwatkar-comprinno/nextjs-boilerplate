/**
 * Barrel file for custom React hooks.
 * Import from "@/hooks" for any of these.
 */

// Auth
export { useAuth } from "./use-auth";

// Forms
export { useZodForm } from "./use-zod-form";

// UI state
export { useModal } from "./use-modal";
export type { UseModalReturn } from "./use-modal";

// Data / search
export { useDebounce } from "./use-debounce";
export { useSearch } from "./use-search";
export type { UseSearchReturn } from "./use-search";

export { usePagination } from "./use-pagination";
export type { UsePaginationReturn, UsePaginationOptions } from "./use-pagination";

// Permissions
export { usePermissions } from "./use-permissions";
export type { UsePermissionsReturn } from "./use-permissions";

// Scroll
export { useScrollSpy } from "./use-scroll-spy";
export { useScrollPosition } from "./use-scroll-position";

// Browser APIs
export { useMediaQuery } from "./use-media-query";
export { useLocalStorage } from "./use-local-storage";
export { useClickOutside } from "./use-click-outside";
export { useCopyToClipboard } from "./use-copy-to-clipboard";
export { useDarkMode } from "./use-dark-mode";
