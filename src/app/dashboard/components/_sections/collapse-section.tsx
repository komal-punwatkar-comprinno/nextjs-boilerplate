 "use client";
  
  import { Collapse } from "@/components";
  import { SectionWrapper } from "./section-wrapper";
  
  export function CollapseSection() {
    return (
      <SectionWrapper id="collapse" title="Collapse">
        <div className="space-y-8">
  
          {/* Default closed */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Default — closed
            </p>
            <Collapse label="Click to reveal details">
              <p>This content is revealed dynamically with a smooth CSS height transition. You can put any content inside — text, forms, lists, or other
  components.</p>
            </Collapse>
          </div>
  
          {/* Default open */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Default — open
            </p>
            <Collapse label="What is included in this boilerplate?" defaultOpen>
              <p>Auth infrastructure, API service layer, component library, form system, custom hooks, and full TypeScript support — all production-ready out of
  the box.</p>
            </Collapse>
          </div>
  
          {/* Multiple */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Multiple panels
            </p>
            <div className="space-y-2">
              <Collapse label="Is dark mode supported?">
                <p>Yes. Full dark mode is built in using Tailwind's dark: variant and CSS custom properties.</p>
              </Collapse>
              <Collapse label="Can I deploy to Vercel?">
                <p>Yes. The project is configured for Vercel out of the box. Just connect your repository and deploy.</p>
              </Collapse>
              <Collapse label="Is it TypeScript strict?">
                <p>Yes. TypeScript strict mode is enabled. All components are fully typed with exported interfaces.</p>
              </Collapse>
            </div>
          </div>
  
        </div>
      </SectionWrapper>
    );
  }