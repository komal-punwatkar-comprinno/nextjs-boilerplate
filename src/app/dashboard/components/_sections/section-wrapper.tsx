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
        className="mb-4 text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2"
      >
        {title}
      </h2>
      <Card>
        <Card.Body>{children}</Card.Body>
      </Card>
    </section>
  );
}
