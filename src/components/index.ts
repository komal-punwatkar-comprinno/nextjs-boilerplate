/**
 * Barrel file for shared UI components.
 * Import from "@/components" for any of these.
 */

// Phase 4 — Layout
export { Breadcrumb } from "./breadcrumb";
export type { BreadcrumbItem } from "./breadcrumb";
export { Header } from "./header";
export { Sidebar } from "./sidebar";
export { Navbar } from "./navbar";

// Phase 6 — Shared UI
export { Button } from "./button";
export type { ButtonProps, ButtonVariant, ButtonSize } from "./button";

export { Input } from "./input";
export type { InputProps } from "./input";

export { Select } from "./select";
export type { SelectProps, SelectOption } from "./select";

export { Textarea } from "./textarea";
export type { TextareaProps } from "./textarea";

export { Badge } from "./badge";
export type { BadgeProps, BadgeVariant } from "./badge";

export { Card } from "./card";
export type { CardProps } from "./card";

export { Spinner } from "./spinner";
export type { SpinnerProps, SpinnerSize } from "./spinner";

export { Avatar } from "./avatar";
export type { AvatarProps, AvatarSize } from "./avatar";

export { Modal } from "./modal";
export type { ModalProps } from "./modal";

export { Pagination } from "./pagination";
export type { PaginationProps } from "./pagination";

// Phase 7 — Form field aliases
export { FormInput, FormSelect, FormTextarea } from "./form-fields";

// Icons
export { Icon } from "./icon";
export type { IconProps, IconName, IconSize } from "./icon";
export { iconPaths } from "./icons";

// Theme
export { ThemeToggle } from "./theme-toggle";
