export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Composable card shell.
 *
 * @example
 * <Card>
 *   <Card.Header>
 *     <h2>Title</h2>
 *   </Card.Header>
 *   <Card.Body>Content here</Card.Body>
 *   <Card.Footer>
 *     <Button>Save</Button>
 *   </Card.Footer>
 * </Card>
 */
export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-zinc-200 bg-white shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

Card.Header = function CardHeader({
  children,
  className = "",
}: CardHeaderProps) {
  return (
    <div
      className={`border-b border-zinc-200 px-6 py-4 ${className}`}
    >
      {children}
    </div>
  );
};

Card.Body = function CardBody({ children, className = "" }: CardBodyProps) {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>;
};

Card.Footer = function CardFooter({
  children,
  className = "",
}: CardFooterProps) {
  return (
    <div
      className={`border-t border-zinc-200 px-6 py-4 ${className}`}
    >
      {children}
    </div>
  );
};
