import { SectionWrapper } from "./section-wrapper";

export function TypographySection() {
  return (
    <SectionWrapper id="typography" title=" Typography">
      <div className="space-y-8 divide-y divide-slate-100 dark:divide-[#2D3640]">

        {/* Headings */}
        <div className="space-y-3 pb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-[#64748B]">Headings</p>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-[#E2E8F0]">H1 — The quick brown fox</h1>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-[#E2E8F0]">H2 — The quick brown fox</h2>
          <h3 className="text-2xl font-semibold text-slate-900 dark:text-[#E2E8F0]">H3 — The quick brown fox</h3>
          <h4 className="text-xl font-semibold text-slate-900 dark:text-[#E2E8F0]">H4 — The quick brown fox</h4>
          <h5 className="text-lg font-medium text-slate-900 dark:text-[#E2E8F0]">H5 — The quick brown fox</h5>
          <h6 className="text-base font-medium text-slate-900 dark:text-[#E2E8F0]">H6 — The quick brown fox</h6>
        </div>

        {/* Body text */}
        <div className="space-y-3 py-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-[#64748B]">Body Text</p>
          <p className="text-lg text-slate-700 dark:text-[#CBD5E1]">
            <span className="mr-2 font-medium text-slate-400 dark:text-[#64748B]">Large —</span>
            The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.
          </p>
          <p className="text-base text-slate-700 dark:text-[#CBD5E1]">
            <span className="mr-2 font-medium text-slate-400 dark:text-[#64748B]">Normal —</span>
            The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.
          </p>
          <p className="text-sm text-slate-700 dark:text-[#CBD5E1]">
            <span className="mr-2 font-medium text-slate-400 dark:text-[#64748B]">Small —</span>
            The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.
          </p>
        </div>

        {/* Special */}
        <div className="space-y-4 py-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-[#64748B]">Special</p>
          <p className="text-xl leading-relaxed text-slate-600 dark:text-[#CBD5E1]">
            <strong className="mr-2 font-medium text-slate-400 dark:text-[#64748B]">Lead —</strong>
            A lead paragraph stands out from body text. It introduces the section with slightly larger, lighter type.
          </p>
          <p className="text-sm text-slate-400 dark:text-[#64748B]">
            <strong className="mr-2 font-medium text-slate-500 dark:text-[#94A3B8]">Muted —</strong>
            This is muted text, used for secondary information and supporting copy.
          </p>
          <p className="text-xs uppercase tracking-widest text-slate-400 dark:text-[#64748B]">
            <strong className="mr-2 font-medium text-slate-500 dark:text-[#94A3B8]">Subtle/Caption —</strong>
            Subtle overline text for labels and captions
          </p>
          <p className="text-sm text-slate-700 dark:text-[#CBD5E1]">
            <strong className="mr-2 font-medium text-slate-400 dark:text-[#64748B]">Inline code —</strong>
            Use{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-[#4CCBBF] dark:bg-[#2D3640] dark:text-[#4CCBBF]">
              const greeting = &quot;Hello&quot;
            </code>{" "}
            or{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-[#4CCBBF] dark:bg-[#2D3640] dark:text-[#4CCBBF]">
              npm run dev
            </code>{" "}
            in sentences.
          </p>
        </div>

        {/* Blockquote */}
        <div className="space-y-4 py-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-[#64748B]">Blockquote</p>
          <blockquote className="border-l-4 border-[#4CCBBF] pl-4 italic text-slate-600 dark:text-[#CBD5E1]">
            &ldquo;Design is not just what it looks like and feels like. Design is how it works.&rdquo;
            <footer className="mt-1 text-xs not-italic text-slate-400 dark:text-[#64748B]">— Steve Jobs</footer>
          </blockquote>
        </div>

        {/* Lists */}
        <div className="grid grid-cols-1 gap-8 pt-6 sm:grid-cols-2">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-[#64748B]">Unordered List</p>
            <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700 dark:text-[#CBD5E1]">
              <li>Authentication &amp; authorization</li>
              <li>API client with typed responses</li>
              <li>Zod schema validation</li>
              <li>Reusable UI component library</li>
              <li>Form system with React Hook Form</li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-[#64748B]">Ordered List</p>
            <ol className="list-decimal space-y-1 pl-5 text-sm text-slate-700 dark:text-[#CBD5E1]">
              <li>Clone the repository</li>
              <li>Install dependencies with <code className="font-mono text-xs text-[#4CCBBF]">npm install</code></li>
              <li>Copy <code className="font-mono text-xs text-[#4CCBBF]">.env.example</code> to <code className="font-mono text-xs text-[#4CCBBF]">.env.local</code></li>
              <li>Run <code className="font-mono text-xs text-[#4CCBBF]">npm run dev</code></li>
              <li>Open <code className="font-mono text-xs text-[#4CCBBF]">http://localhost:3000</code></li>
            </ol>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
