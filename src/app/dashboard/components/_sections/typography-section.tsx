import { SectionWrapper } from "./section-wrapper";

export function TypographySection() {
  return (
    <SectionWrapper id="typography" title="2. Typography">
      <div className="space-y-8 divide-y divide-slate-100">
        {/* Headings */}
        <div className="space-y-3 pb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Headings</p>
          <h1 className="text-4xl font-bold text-slate-900">H1 — The quick brown fox</h1>
          <h2 className="text-3xl font-bold text-slate-900">H2 — The quick brown fox</h2>
          <h3 className="text-2xl font-semibold text-slate-900">H3 — The quick brown fox</h3>
          <h4 className="text-xl font-semibold text-slate-900">H4 — The quick brown fox</h4>
          <h5 className="text-lg font-medium text-slate-900">H5 — The quick brown fox</h5>
          <h6 className="text-base font-medium text-slate-900">H6 — The quick brown fox</h6>
        </div>

        {/* Body text */}
        <div className="space-y-3 py-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Body Text</p>
          <p className="text-lg text-slate-700">
            <span className="font-medium text-slate-500 mr-2">Large —</span>
            The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.
          </p>
          <p className="text-base text-slate-700">
            <span className="font-medium text-slate-500 mr-2">Normal —</span>
            The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.
          </p>
          <p className="text-sm text-slate-700">
            <span className="font-medium text-slate-500 mr-2">Small —</span>
            The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.
          </p>
        </div>

        {/* Special */}
        <div className="space-y-4 py-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Special</p>
          <p className="text-xl leading-relaxed text-slate-600">
            <strong className="font-medium text-slate-500 mr-2">Lead —</strong>
            A lead paragraph stands out from body text. It introduces the section with slightly larger, lighter type.
          </p>
          <p className="text-sm text-slate-400">
            <strong className="font-medium text-slate-500 mr-2">Muted —</strong>
            This is muted text, used for secondary information and supporting copy.
          </p>
          <p className="text-xs text-slate-400 uppercase tracking-widest">
            <strong className="font-medium text-slate-500 mr-2">Subtle/Caption —</strong>
            Subtle overline text for labels and captions
          </p>
          <p className="text-sm text-slate-700">
            <strong className="font-medium text-slate-500 mr-2">Inline code —</strong>
            Use <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-indigo-600">const greeting = &quot;Hello&quot;</code> or{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-indigo-600">npm run dev</code> in sentences.
          </p>
        </div>

        {/* Blockquote */}
        <div className="space-y-4 py-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Blockquote</p>
          <blockquote className="border-l-4 border-indigo-400 pl-4 text-slate-600 italic">
            "Design is not just what it looks like and feels like. Design is how it works."
            <footer className="mt-1 text-xs text-slate-400 not-italic">— Steve Jobs</footer>
          </blockquote>
        </div>

        {/* Lists */}
        <div className="grid grid-cols-2 gap-8 pt-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Unordered List</p>
            <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
              <li>Authentication & authorization</li>
              <li>API client with typed responses</li>
              <li>Zod schema validation</li>
              <li>Reusable UI component library</li>
              <li>Form system with React Hook Form</li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Ordered List</p>
            <ol className="list-decimal space-y-1 pl-5 text-sm text-slate-700">
              <li>Clone the repository</li>
              <li>Install dependencies with <code className="font-mono text-xs">npm install</code></li>
              <li>Copy <code className="font-mono text-xs">.env.example</code> to <code className="font-mono text-xs">.env.local</code></li>
              <li>Run <code className="font-mono text-xs">npm run dev</code></li>
              <li>Open <code className="font-mono text-xs">http://localhost:3000</code></li>
            </ol>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
