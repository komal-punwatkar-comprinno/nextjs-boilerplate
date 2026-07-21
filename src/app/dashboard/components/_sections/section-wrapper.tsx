import { Card } from "@/components";

interface SectionWrapperProps {
  id: string;
  title: string;
  /** Optional description shown below the title */
  description?: string;
  children: React.ReactNode;
}

export function SectionWrapper({ id, title, description, children }: SectionWrapperProps) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`}>
      <div className="mb-5 border-b border-slate-200 pb-3 dark:border-[#2D3640]">
        <h2
          id={`${id}-heading`}
          className="text-lg font-bold text-slate-800 dark:text-[#E2E8F0]"
        >
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {description}
          </p>
        )}
      </div>
      <Card className="overflow-visible">
        <Card.Body className="space-y-6 overflow-visible">
          {children}
        </Card.Body>
      </Card>
    </section>
  );
}
