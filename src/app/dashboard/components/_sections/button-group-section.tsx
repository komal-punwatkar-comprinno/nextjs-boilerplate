import { Button, ButtonGroup } from "@/components";
  import { SectionWrapper } from "./section-wrapper";
  
  export function ButtonGroupSection() {
    return (
      <SectionWrapper id="button-group" title="Button Group">
        <div className="space-y-8">
  
          {/* Basic */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Basic
            </p>
            <ButtonGroup>
              <Button variant="secondary">Left</Button>
              <Button variant="secondary">Middle</Button>
              <Button variant="secondary">Right</Button>
            </ButtonGroup>
          </div>
  
          {/* Sizes */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Sizes
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <ButtonGroup>
                <Button variant="secondary" size="sm">Left</Button>
                <Button variant="secondary" size="sm">Middle</Button>
                <Button variant="secondary" size="sm">Right</Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button variant="secondary" size="md">Left</Button>
                <Button variant="secondary" size="md">Middle</Button>
                <Button variant="secondary" size="md">Right</Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button variant="secondary" size="lg">Left</Button>
                <Button variant="secondary" size="lg">Middle</Button>
                <Button variant="secondary" size="lg">Right</Button>
              </ButtonGroup>
            </div>
          </div>
  
          {/* Variants */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Mixed variants
            </p>
            <div className="flex flex-wrap gap-4">
              <ButtonGroup>
                <Button variant="primary">Save</Button>
                <Button variant="secondary">Preview</Button>
                <Button variant="danger">Delete</Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button variant="secondary">Copy</Button>
                <Button variant="secondary">Cut</Button>
                <Button variant="secondary">Paste</Button>
              </ButtonGroup>
            </div>
          </div>
  
          {/* With icons */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              With icons
            </p>
            <ButtonGroup>
              <Button variant="secondary" size="sm">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Prev
              </Button>
              <Button variant="secondary" size="sm">1</Button>
              <Button variant="primary"   size="sm">2</Button>
              <Button variant="secondary" size="sm">3</Button>
              <Button variant="secondary" size="sm">
                Next
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </ButtonGroup>
          </div>
  
        </div>
      </SectionWrapper>
    );
  }