"use client";

import { cn } from "@/lib/utils";

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "p"
  | "lead"
  | "muted"
  | "small"
  | "code";

export interface TypographyProps {
  variant?: TypographyVariant;
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

const variantMapping: Record<TypographyVariant, React.ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  p: "p",
  lead: "p",
  muted: "p",
  small: "small",
  code: "code",
};

const variantClasses: Record<TypographyVariant, string> = {
  h1: "text-3xl font-bold tracking-tight text-zinc-900 dark:text-[#E8EDF2] sm:text-4xl",
  h2: "text-2xl font-semibold tracking-tight text-zinc-900 dark:text-[#E8EDF2]",
  h3: "text-xl font-semibold text-zinc-900 dark:text-[#E8EDF2]",
  h4: "text-lg font-medium text-zinc-900 dark:text-[#E8EDF2]",
  p: "text-base text-zinc-700 dark:text-[#E8EDF2] leading-relaxed",
  lead: "text-lg text-zinc-600 dark:text-[#9FAEC1] leading-relaxed",
  muted: "text-sm text-zinc-500 dark:text-[#9FAEC1]",
  small: "text-xs text-zinc-500 dark:text-[#9FAEC1]",
  code: "rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-sm text-zinc-800 dark:bg-[#2A3441] dark:text-[#E8EDF2]",
};

export function Typography({ variant = "p", children, className, as }: TypographyProps) {
  const Component = as ?? variantMapping[variant];

  return (
    <Component className={cn(variantClasses[variant], className)}>
      {children}
    </Component>
  );
}
