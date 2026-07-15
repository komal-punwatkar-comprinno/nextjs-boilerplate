import Link from "next/link";
import { routes } from "@/config/routes";
import { siteConfig } from "@/config/site";

const features = [
  {
    icon: "🔐",
    title: "Auth Ready",
    description: "JWT-based authentication with refresh tokens, role guards, and protected routes out of the box.",
  },
  {
    icon: "🌐",
    title: "API Client",
    description: "Typed Axios-based API client with interceptors, error normalisation, and retry logic built in.",
  },
  {
    icon: "🛡️",
    title: "Type Safe",
    description: "End-to-end TypeScript with Zod schema validation for forms, API responses, and environment variables.",
  },
  {
    icon: "🎨",
    title: "Component Library",
    description: "A full set of accessible UI primitives — buttons, badges, cards, modals, tables, and more.",
  },
  {
    icon: "📋",
    title: "Form System",
    description: "React Hook Form + Zod integration with reusable field components and inline error messages.",
  },
  {
    icon: "🚧",
    title: "Route Protection",
    description: "Middleware-level authentication checks with automatic redirect to login for unauthenticated users.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Top nav bar */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-black text-white">
              N
            </span>
            <span className="text-sm font-semibold text-white">{siteConfig.name.split(" ")[0]}</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={routes.login}
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              Sign in
            </Link>
            <Link
              href={routes.dashboard}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
            >
              Dashboard
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <main>
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20 text-center">
          {/* Gradient orbs */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/4 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-3xl" />
            <div className="absolute top-1/3 -left-20 h-[400px] w-[400px] rounded-full bg-violet-600/15 blur-3xl" />
            <div className="absolute top-1/3 -right-20 h-[400px] w-[400px] rounded-full bg-indigo-800/15 blur-3xl" />
          </div>

          {/* Badge */}
          <div className="relative mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-xs font-medium text-indigo-300">Production-ready boilerplate</span>
          </div>

          {/* Headline */}
          <h1 className="relative max-w-4xl text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
            Build your SaaS{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-300 bg-clip-text text-transparent">
              10× faster
            </span>
          </h1>

          <p className="relative mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
            {siteConfig.description} Skip months of boilerplate — start with authentication, API
            integration, component library, and admin dashboard all wired up.
          </p>

          {/* CTAs */}
          <div className="relative mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href={routes.dashboard}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/40"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              View Dashboard
            </Link>
            <Link
              href={routes.components}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
              </svg>
              View Components
            </Link>
          </div>

          {/* Stats row */}
          <div className="relative mt-16 grid grid-cols-3 gap-8 border-t border-white/10 pt-12">
            {[
              { value: "11+", label: "UI Components" },
              { value: "100%", label: "TypeScript" },
              { value: "0 config", label: "Ready to ship" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features grid */}
        <section className="mx-auto max-w-6xl px-6 pb-24 pt-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-white">Everything you need to ship</h2>
            <p className="mt-3 text-slate-400">
              Every piece of the stack pre-built, pre-connected, and ready to customise.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-indigo-500/40 hover:bg-white/8"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/20 text-2xl ring-1 ring-indigo-500/30">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-base font-semibold text-white">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA banner */}
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 p-10 text-center shadow-2xl shadow-indigo-500/25">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-violet-400/20 blur-2xl" />
            </div>
            <h2 className="relative text-3xl font-bold text-white">Ready to get started?</h2>
            <p className="relative mt-3 text-indigo-200">
              Explore the dashboard and component library to see everything in action.
            </p>
            <div className="relative mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href={routes.dashboard}
                className="rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-indigo-700 shadow transition-colors hover:bg-indigo-50"
              >
                Go to Dashboard →
              </Link>
              <Link
                href={routes.components}
                className="rounded-xl border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Browse Components
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} {siteConfig.name}. Built with Next.js + Tailwind CSS v4.
        </p>
      </footer>
    </div>
  );
}
