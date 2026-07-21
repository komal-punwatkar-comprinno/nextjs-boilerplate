import { cn } from "@/lib/utils";

type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

interface ContainerProps {
  /** Maximum width preset. */
  size?: ContainerSize;
  /** Additional class names. */
  className?: string;
  children: React.ReactNode;
}

const sizeClasses: Record<ContainerSize, string> = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  xl: "max-w-[1440px]",
  full: "max-w-full",
};

/**
 * Content container with max-width and responsive padding.
 *
 * @example
 * <Container size="lg">
 *   <p>Page content here</p>
 * </Container>
 */
export function Container({
  size = "lg",
  className,
  children,
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        sizeClasses[size],
        className
      )}
    >
      {children}
    </div>
  );
}

export type { ContainerProps, ContainerSize };
