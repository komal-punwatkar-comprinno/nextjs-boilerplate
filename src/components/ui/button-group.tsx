export interface ButtonGroupProps {
    children: React.ReactNode;
    className?: string;
  }
  
  /**
   * Groups buttons together with joined borders and no gap.
   *
   * @example
   * <ButtonGroup>
   *   <Button variant="secondary">Left</Button>
   *   <Button variant="secondary">Middle</Button>
   *   <Button variant="secondary">Right</Button>
   * </ButtonGroup>
   */
  export function ButtonGroup({ children, className = "" }: ButtonGroupProps) {
    return (
      <div
        className={`inline-flex [&>button]:rounded-none [&>button:first-child]:rounded-l-md [&>button:last-child]:rounded-r-md [&>button:not(:first-child)]:-ml-px
  ${className}`}
        role="group"
      >
        {children}
      </div>
    );
  }
