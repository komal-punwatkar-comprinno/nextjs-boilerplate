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
 *   <Card.Header><h2>Title</h2></Card.Header>
 *   <Card.Body>Content here</Card.Body>
 *   <Card.Footer><Button>Save</Button></Card.Footer>
 * </Card>
 */
export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-slate-200 bg-white shadow-sm dark:border-[#2D3640] dark:bg-[#242B33] ${className}`}
    >
      {children}
    </div>
  );
}

Card.Header = function CardHeader({ children, className = "" }: CardHeaderProps) {
  return (
    <div className={`border-b border-slate-100 px-5 py-4 dark:border-[#2D3640] ${className}`}>
      {children}
    </div>
  );
};

Card.Body = function CardBody({ children, className = "" }: CardBodyProps) {
  return <div className={`px-5 py-4 ${className}`}>{children}</div>;
};

Card.Footer = function CardFooter({ children, className = "" }: CardFooterProps) {
  return (
    <div className={`border-t border-slate-100 px-5 py-3 dark:border-[#2D3640] ${className}`}>
      {children}
    </div>
  );
};

