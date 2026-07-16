import { Card } from "@/components/card";

interface SectionWrapperProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export function SectionWrapper({ id, title, children }: SectionWrapperProps) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`}>
      <h2
        id={`${id}-heading`}
        className="mb-4 border-b border-slate-200 pb-2 text-lg font-semibold text-slate-800 dark:border-[#2D3640] dark:text-[#E2E8F0]"
      >
        {title}
      </h2>
      <Card>
        <Card.Body>{children}</Card.Body>
      </Card>
    </section>
  );
}
