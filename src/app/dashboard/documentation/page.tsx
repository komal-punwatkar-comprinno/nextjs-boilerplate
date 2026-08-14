"use client";

import { useState } from "react";
import { useScrollSpy } from "@/hooks/use-scroll-spy";

// ─── Section IDs ─────────────────────────────────────────────────────────────
const SECTION_IDS = [
  "introduction",
  "getting-started",
  "tech-stack",
  "project-structure",
  "key-features",
  "adding-a-feature",
  "hooks",
  "environment",
  "scripts",
  "architecture-rules",
] as const;

type SectionId = (typeof SECTION_IDS)[number];

interface NavItem {
  id: SectionId;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "introduction", label: "Introduction" },
  { id: "getting-started", label: "Getting Started" },
  { id: "tech-stack", label: "Tech Stack" },
  { id: "project-structure", label: "Project Structure" },
  { id: "key-features", label: "Key Features" },
  { id: "adding-a-feature", label: "Adding a Feature" },
  { id: "hooks", label: "Hooks" },
  { id: "environment", label: "Environment Variables" },
  { id: "scripts", label: "Scripts" },
  { id: "architecture-rules", label: "Architecture Rules" },
];

// ─── Code Block Component ────────────────────────────────────────────────────
function CodeBlock({ children, title }: { children: string; title?: string }) {
  return (
    <div className="rounded-lg border border-gray-200 dark:border-white/10 overflow-hidden">
      {title && (
        <div className="bg-gray-100 dark:bg-white/5 px-4 py-2 border-b border-gray-200 dark:border-white/10">
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{title}</span>
        </div>
      )}
      <pre className="overflow-x-auto bg-gray-50 dark:bg-[#0d1117] p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-300">
        <code>{children}</code>
      </pre>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function DocumentationPage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleActiveChange = () => {};
  const { activeId } = useScrollSpy([...SECTION_IDS], handleActiveChange);

  const handleNavClick = (id: string) => {
    setMobileNavOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex gap-8 max-w-7xl mx-auto">
      {/* ── Sidebar Navigation ──────────────────────────────────────────── */}
      {/* Mobile toggle */}
      <button
        type="button"
        onClick={() => setMobileNavOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#4CCBBF] text-white shadow-lg lg:hidden"
        aria-label="Toggle documentation nav"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Nav sidebar */}
      <aside
        className={[
          "fixed inset-y-0 right-0 z-30 w-64 bg-white dark:bg-[#1A1F2E] p-6 shadow-xl transition-transform lg:sticky lg:top-0 lg:z-0 lg:h-[calc(100vh-7rem)] lg:w-52 lg:shrink-0 lg:translate-x-0 lg:bg-transparent lg:p-0 lg:shadow-none dark:lg:bg-transparent",
          mobileNavOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        <nav className="lg:sticky lg:top-6 space-y-1 overflow-y-auto max-h-[calc(100vh-8rem)]">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-[#475569]">
            On this page
          </p>
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={[
                  "block w-full text-left rounded-md px-3 py-1.5 text-sm transition-colors",
                  isActive
                    ? "bg-[#4CCBBF]/10 font-medium text-[#4CCBBF]"
                    : "text-gray-600 hover:text-gray-900 dark:text-[#94A3B8] dark:hover:text-[#E2E8F0]",
                ].join(" ")}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Mobile overlay */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-20 bg-black/40 lg:hidden" onClick={() => setMobileNavOpen(false)} />
      )}

      {/* ── Main Content ────────────────────────────────────────────────── */}
      <div className="flex-1 min-w-0 space-y-12 pb-16">
        {/* Introduction */}
        <section id="introduction" className="scroll-mt-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Documentation</h1>
          <p className="mt-3 text-base text-gray-600 dark:text-[#94A3B8] leading-relaxed max-w-2xl">
            A production-ready frontend foundation for enterprise SaaS applications built on{" "}
            <strong>Next.js 16</strong>, <strong>React 19</strong>, <strong>TypeScript</strong>, and{" "}
            <strong>Tailwind CSS v4</strong>.
          </p>
          <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-500/20 dark:bg-blue-500/10 p-4">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              <strong>Note:</strong> This is a static frontend boilerplate. It provides the complete UI layer — authentication flow, component library, routing, and service layer — ready for you to connect your backend.
            </p>
          </div>
        </section>

        {/* Getting Started */}
        <section id="getting-started" className="scroll-mt-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Getting Started</h2>
          <p className="mt-2 text-gray-600 dark:text-[#94A3B8]">
            Clone the repo and install dependencies to get running in seconds.
          </p>
          <div className="mt-4">
            <CodeBlock title="Terminal">{`npm install\nnpm run dev`}</CodeBlock>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Available Pages</h3>
            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-white/10">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-white/5">
                  <tr>
                    <th className="px-4 py-2.5 text-left font-medium text-gray-600 dark:text-gray-400">URL</th>
                    <th className="px-4 py-2.5 text-left font-medium text-gray-600 dark:text-gray-400">Page</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                  <tr><td className="px-4 py-2 font-mono text-xs text-[#4CCBBF]">http://localhost:3000</td><td className="px-4 py-2 text-gray-700 dark:text-gray-300">Landing page</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs text-[#4CCBBF]">http://localhost:3000/login</td><td className="px-4 py-2 text-gray-700 dark:text-gray-300">Login form</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs text-[#4CCBBF]">http://localhost:3000/dashboard</td><td className="px-4 py-2 text-gray-700 dark:text-gray-300">Dashboard</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs text-[#4CCBBF]">http://localhost:3000/dashboard/components</td><td className="px-4 py-2 text-gray-700 dark:text-gray-300">Component showcase</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section id="tech-stack" className="scroll-mt-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Tech Stack</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: "Framework", value: "Next.js 16.2 (App Router)" },
              { label: "UI", value: "React 19" },
              { label: "Language", value: "TypeScript 5 (strict)" },
              { label: "Styling", value: "Tailwind CSS v4" },
              { label: "Forms", value: "React Hook Form 7 + Zod 3" },
              { label: "Fonts", value: "Geist Sans / Geist Mono" },
              { label: "Compiler", value: "React Compiler" },
              { label: "Linting", value: "ESLint 9" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.02] px-4 py-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#4CCBBF]/10 text-[#4CCBBF]">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.label}</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Project Structure */}
        <section id="project-structure" className="scroll-mt-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Project Structure</h2>
          <p className="mt-2 text-gray-600 dark:text-[#94A3B8]">
            The project follows Next.js App Router conventions with a feature-based architecture.
          </p>
          <div className="mt-4">
            <CodeBlock title="src/">{`src/
├── app/                  # Pages & layouts (App Router)
│   ├── login/            # Login page with real form
│   └── dashboard/
│       ├── analytics/    # Stub — implement your feature here
│       ├── users/        # Stub
│       ├── projects/     # Stub
│       ├── messages/     # Stub
│       ├── settings/     # Stub
│       ├── _components/  # Shell, ComingSoon placeholder
│       └── components/   # Full UI component showcase
├── components/           # Shared UI — Button, Input, Card, Icon, Modal…
├── features/             # Feature modules (add yours here)
├── hooks/                # useAuth, useZodForm, useModal, usePagination…
├── services/             # API service layer
├── lib/                  # apiClient, BaseService, Zod schemas
├── providers/            # AuthProvider
├── contexts/             # AuthContext
├── types/                # AuthUser, ApiResponse, ApiError…
├── constants/            # ROLES, STORAGE_KEYS, env, auth
├── config/               # routes.ts, site.ts, navigation.ts
├── utils/                # date, string, storage, cookie helpers
└── proxy.ts              # Middleware — route protection (disabled)`}</CodeBlock>
          </div>
        </section>

        {/* Key Features */}
        <section id="key-features" className="scroll-mt-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Key Features</h2>

          {/* Auth */}
          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Authentication (infrastructure-ready)</h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-[#94A3B8]">
                Full auth flow is wired. Only the provider integration is pending.
              </p>
              <div className="mt-3">
                <CodeBlock>{`// 1. Implement AuthService in src/services/auth-service.ts
// 2. Call it in the onSubmit handler in src/app/login/page.tsx
// 3. Enable route protection in src/proxy.ts (uncomment the guard logic)`}</CodeBlock>
              </div>
            </div>

            {/* API Layer */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">API Layer</h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-[#94A3B8]">
                Never call <code className="rounded bg-gray-100 dark:bg-white/10 px-1.5 py-0.5 text-xs font-mono">fetch</code> directly from a page. Use the service layer.
              </p>
              <div className="mt-3">
                <CodeBlock>{`// Extend BaseService for any resource
class UsersService extends BaseService {
  constructor() { super("/users"); }
  list() { return this.getList<User>(); }
  getById(id: string) { return this.getOne<User>(\`/\${id}\`); }
}
export const usersService = new UsersService();`}</CodeBlock>
              </div>
            </div>

            {/* Component Library */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Component Library</h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-[#94A3B8]">
                Import from the barrel — never from individual files.
              </p>
              <div className="mt-3">
                <CodeBlock>{`import { Button, Input, Badge, Card, Modal, Icon, Spinner, Avatar, Pagination } from "@/components";`}</CodeBlock>
              </div>
            </div>

            {/* Icon System */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Icon System</h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-[#94A3B8]">
                40+ Heroicons outline icons, no external dependency.
              </p>
              <div className="mt-3">
                <CodeBlock>{`<Icon name="trash" size="sm" className="text-red-600" />

// Add a new icon in src/components/icons.ts — one line:
myIcon: "M12 4v16m8-8H4",`}</CodeBlock>
              </div>
            </div>

            {/* Forms */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Forms</h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-[#94A3B8]">
                React Hook Form + Zod wired through <code className="rounded bg-gray-100 dark:bg-white/10 px-1.5 py-0.5 text-xs font-mono">useZodForm</code>.
              </p>
              <div className="mt-3">
                <CodeBlock>{`const form = useZodForm(loginSchema, {
  defaultValues: { email: "", password: "" }
});

<Input
  label="Email"
  error={form.formState.errors.email?.message}
  {...form.register("email")}
/>
<Button type="submit" isLoading={form.formState.isSubmitting}>
  Sign in
</Button>`}</CodeBlock>
              </div>
            </div>
          </div>
        </section>

        {/* Adding a Feature */}
        <section id="adding-a-feature" className="scroll-mt-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Adding a Feature</h2>
          <p className="mt-2 text-gray-600 dark:text-[#94A3B8]">
            Follow this structure for new feature modules:
          </p>
          <div className="mt-4">
            <CodeBlock title="Feature module structure">{`src/features/your-feature/
├── index.ts          # Public barrel
├── types.ts          # Feature types
├── your-service.ts   # Extends BaseService
├── use-your-hook.ts  # Feature hook
└── components/       # Feature UI`}</CodeBlock>
          </div>
          <div className="mt-4">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">Steps:</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>Add route to <code className="rounded bg-gray-100 dark:bg-white/10 px-1.5 py-0.5 text-xs font-mono">src/config/routes.ts</code></li>
              <li>Add page at <code className="rounded bg-gray-100 dark:bg-white/10 px-1.5 py-0.5 text-xs font-mono">src/app/dashboard/your-feature/page.tsx</code></li>
              <li>Add sidebar link in <code className="rounded bg-gray-100 dark:bg-white/10 px-1.5 py-0.5 text-xs font-mono">src/components/sidebar.tsx</code></li>
            </ol>
          </div>
        </section>

        {/* Hooks */}
        <section id="hooks" className="scroll-mt-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Hooks</h2>
          <div className="mt-4 overflow-x-auto rounded-lg border border-gray-200 dark:border-white/10">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-white/5">
                <tr>
                  <th className="px-4 py-2.5 text-left font-medium text-gray-600 dark:text-gray-400">Hook</th>
                  <th className="px-4 py-2.5 text-left font-medium text-gray-600 dark:text-gray-400">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                {[
                  ["useAuth()", "user, isAuthenticated, logout"],
                  ["useZodForm(schema)", "RHF + Zod resolver"],
                  ["useModal()", "isOpen, open, close, toggle"],
                  ["usePagination({ totalItems })", "page, totalPages, setPage, startIndex, endIndex"],
                  ["useSearch()", "query, debouncedQuery, setQuery"],
                  ["usePermissions()", "can(roles[]), isAdmin"],
                  ["useDebounce(value, delay)", "Debounce any value"],
                  ["useScrollSpy(ids[])", "Active section for scroll-based nav"],
                ].map(([hook, purpose]) => (
                  <tr key={hook}>
                    <td className="px-4 py-2 font-mono text-xs text-[#4CCBBF]">{hook}</td>
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Environment Variables */}
        <section id="environment" className="scroll-mt-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Environment Variables</h2>
          <p className="mt-2 text-gray-600 dark:text-[#94A3B8]">
            Create <code className="rounded bg-gray-100 dark:bg-white/10 px-1.5 py-0.5 text-xs font-mono">.env.local</code> in the project root:
          </p>
          <div className="mt-4">
            <CodeBlock title=".env.local">{`NEXT_PUBLIC_API_BASE_URL=https://api.your-domain.com
NEXT_PUBLIC_APP_ENV=development`}</CodeBlock>
          </div>
        </section>

        {/* Scripts */}
        <section id="scripts" className="scroll-mt-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Scripts</h2>
          <div className="mt-4 overflow-x-auto rounded-lg border border-gray-200 dark:border-white/10">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-white/5">
                <tr>
                  <th className="px-4 py-2.5 text-left font-medium text-gray-600 dark:text-gray-400">Command</th>
                  <th className="px-4 py-2.5 text-left font-medium text-gray-600 dark:text-gray-400">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                {[
                  ["npm run dev", "Development server"],
                  ["npm run build", "Production build"],
                  ["npm run start", "Production server"],
                  ["npm run lint", "ESLint"],
                ].map(([cmd, desc]) => (
                  <tr key={cmd}>
                    <td className="px-4 py-2 font-mono text-xs text-[#4CCBBF]">{cmd}</td>
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Architecture Rules */}
        <section id="architecture-rules" className="scroll-mt-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Architecture Rules</h2>
          <ul className="mt-4 space-y-3">
            {[
              { rule: "No direct fetch in pages", desc: "Always use the service layer." },
              { rule: "Server Components by default", desc: "\"use client\" only for state, events, or browser APIs." },
              { rule: "One feature per directory", desc: "Each owns its types, service, hook, and components." },
              { rule: "All routes in routes.ts", desc: "Never hardcode path strings." },
              { rule: "All imports from @/components", desc: "Use the barrel, not individual file paths." },
            ].map((item) => (
              <li key={item.rule} className="flex gap-3 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.02] px-4 py-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{item.rule}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
