import { Accordion } from "@/components";
import { SectionWrapper } from "./section-wrapper";

export function AccordionSection() {
  return (
    <SectionWrapper id="accordion" title="Accordion">
      <div className="space-y-8">

        {/* Single open (default) */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Default — single panel open
          </p>
          <Accordion
            defaultOpenId="acc-1"
            items={[
              {
                id: "acc-1",
                title: "Accordion Item #1",
                content: "This is the first item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or by overriding the default variables.",
              },
              {
                id: "acc-2",
                title: "Accordion Item #2",
                content: "This is the second item's accordion body. You can modify any of this with custom CSS or by overriding default variables.",
              },
              {
                id: "acc-3",
                title: "Accordion Item #3",
                content: "This is the third item's accordion body. A placeholder image has been used to demonstrate the use of the accordion body.",
              },
            ]}
          />
        </div>

        {/* Multiple open */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Multiple panels open simultaneously
          </p>
          <Accordion
            multiple
            defaultOpenId="m-1"
            items={[
              { id: "m-1", title: "What is included?", content: "Auth, API layer, component library, form system, hooks, TypeScript — all production-ready." },
              { id: "m-2", title: "Can I customise it?", content: "Yes. Every component is in src/components and uses Tailwind utility classes you can override freely." },
              { id: "m-3", title: "Is dark mode supported?", content: "Yes, full dark mode is built in using Tailwind's dark: variant and CSS variables." },
            ]}
          />
        </div>

      </div>
    </SectionWrapper>
  );
}
