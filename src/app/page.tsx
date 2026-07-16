import Link from "next/link";
import { routes } from "@/config/routes";
import { siteConfig } from "@/config/site";

const features = [
  {
    number: "01",
    tag: "Foundation",
    title: "Auth, wired and ready",
    description:
      "JWT-based authentication with refresh tokens, role guards, and protected routes. Wire your provider in one file — everything else is done.",
    detail: "AuthProvider → AuthContext → useAuth hook → middleware guard",
  },
  {
    number: "02",
    tag: "Data Layer",
    title: "Typed API client",
    description:
      "Axios-based client with interceptors, error normalisation, and a BaseService class. Extend it for any resource in three lines.",
    detail: "class UsersService extends BaseService { … }",
  },
  {
    number: "03",
    tag: "UI System",
    title: "Component library built in",
    description:
      "Button, Input, Badge, Card, Modal, Avatar, Pagination — all accessible, all dark-mode ready. Import from one barrel, customise freely.",
    detail: "import { Button, Card, Badge } from '@/components'",
  },
  {
    number: "04",
    tag: "Forms",
    title: "React Hook Form + Zod",
    description:
      "Schema-validated forms with inline errors, loading states, and a useZodForm hook. No boilerplate, no repetition.",
    detail: "loginSchema · emailSchema · passwordSchema",
  },
  {
    number: "05",
    tag: "Architecture",
    title: "Feature-first structure",
    description:
      "Every feature owns its types, service, hook, and components. Routes in one file, no hardcoded strings.",
    detail: "src/features/your-feature/ → add route → done",
  },
  {
    number: "06",
    tag: "Shipped",
    title: "Dashboard, ready to extend",
    description:
      "Stat cards, project tables, activity log, task list — a full admin shell to clone and customise, not just a template.",
    detail: "Dashboard · Analytics · Users · Projects · Settings",
  },
];

const stats = [
  { value: "11+", label: "UI Components" },
  { value: "100%", label: "TypeScript" },
  { value: "0", label: "Config needed" },
];

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A0D14", color: "#E2E8F0" }}>

      {/* ── Navbar ─────────────────────────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{ borderColor: "rgba(255,255,255,0.06)", backgroundColor: "rgba(10,13,20,0.85)", backdropFilter: "blur(12px)" }}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <span
              className="flex h-7 w-7 items-center justify-center rounded-md text-xs font-black"
              style={{ backgroundColor: "#4CCBBF", color: "#0A0D14" }}
            >
              N
            </span>
            <span className="text-sm font-semibold" style={{ color: "#E2E8F0" }}>
              {siteConfig.name.split(" ")[0]}
            </span>
          </div>

          {/* Nav links */}
          <div className="hidden items-center gap-6 md:flex">
            {["Features", "Components", "Dashboard"].map((item) => (
              <span key={item} className="cursor-pointer text-sm text-[#64748B] transition-colors hover:text-[#E2E8F0]">
                {item}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-2">
            <Link
              href={routes.login}
              className="rounded-lg px-4 py-2 text-sm font-medium transition-colors"
              style={{ color: "#94A3B8" }}
            >
              Sign in
            </Link>
            <Link
              href={routes.dashboard}
              className="rounded-lg px-4 py-2 text-sm font-semibold transition-all"
              style={{ backgroundColor: "#4CCBBF", color: "#0A0D14" }}
            >
              Get started
            </Link>
          </div>
        </nav>
      </header>

      <main>
        {/* ── Hero ───────────────────────────────────────────────────────────── */}
        <section className="relative flex flex-col items-center justify-center overflow-hidden px-6 pb-24 pt-40 text-center">

          {/* Subtle radial glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(76,203,191,0.12) 0%, transparent 70%)",
            }}
          />

          {/* Badge */}
          <div
            className="relative mb-8 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium"
            style={{ borderColor: "rgba(76,203,191,0.25)", backgroundColor: "rgba(76,203,191,0.08)", color: "#4CCBBF" }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#4CCBBF" }} />
            Production-ready Next.js boilerplate
          </div>

          {/* Headline */}
          <h1
            className="relative max-w-3xl text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl"
            style={{ color: "#F1F5F9" }}
          >
            Build your SaaS{" "}
            <span
              style={{
                backgroundImage: "linear-gradient(135deg, #4CCBBF 0%, #6EE7DF 50%, #4CCBBF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              10× faster
            </span>
          </h1>

          <p className="relative mt-6 max-w-xl text-base leading-relaxed" style={{ color: "#64748B" }}>
            Authentication, API layer, component library, and a full admin dashboard —
            all pre-wired. Clone it, connect your backend, and start building features.
          </p>

          {/* CTAs */}
          <div className="relative mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <Link
              href={routes.dashboard}
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all"
              style={{ backgroundColor: "#4CCBBF", color: "#0A0D14", boxShadow: "0 0 24px rgba(76,203,191,0.25)" }}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              View dashboard
            </Link>
            <Link
              href={routes.components}
              className="inline-flex items-center gap-2 rounded-xl border px-6 py-3 text-sm font-medium transition-all"
              style={{ borderColor: "rgba(255,255,255,0.1)", color: "#94A3B8" }}
            >
              Browse components
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Dashboard mockup */}
          <div className="relative mt-20 w-full max-w-5xl">
            <div
              aria-hidden="true"
              className="absolute -bottom-8 left-1/2 h-32 w-3/4 -translate-x-1/2 blur-3xl"
              style={{ backgroundColor: "rgba(76,203,191,0.08)" }}
            />
            <div
              className="relative overflow-hidden rounded-2xl border"
              style={{ borderColor: "rgba(255,255,255,0.08)", backgroundColor: "#111827" }}
            >
              {/* Fake browser chrome */}
              <div
                className="flex items-center gap-2 border-b px-4 py-3"
                style={{ borderColor: "rgba(255,255,255,0.06)", backgroundColor: "rgba(255,255,255,0.02)" }}
              >
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#ED495D" }} />
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#FCA90B" }} />
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#4CCB98" }} />
                <div
                  className="ml-4 flex h-5 flex-1 max-w-xs items-center rounded px-2 text-[10px]"
                  style={{ backgroundColor: "rgba(255,255,255,0.04)", color: "#475569" }}
                >
                  localhost:3000/dashboard
                </div>
              </div>

              {/* Dashboard preview */}
              <div className="flex" style={{ minHeight: "340px" }}>
                {/* Fake sidebar */}
                <div className="hidden w-48 shrink-0 border-r p-4 sm:block" style={{ borderColor: "rgba(255,255,255,0.06)", backgroundColor: "#1C2127" }}>
                  <div className="mb-4 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded text-[10px] font-black" style={{ backgroundColor: "#4CCBBF", color: "#0A0D14" }}>N</span>
                    <span className="text-xs font-semibold" style={{ color: "#E2E8F0" }}>NextSaaS</span>
                  </div>
                  <div className="space-y-0.5">
                    {[
                      { label: "Dashboard", active: true },
                      { label: "Analytics", active: false },
                      { label: "Users", active: false },
                      { label: "Projects", active: false },
                      { label: "Messages", active: false },
                      { label: "Settings", active: false },
                    ].map(item => (
                      <div
                        key={item.label}
                        className="rounded px-2 py-1.5 text-[11px]"
                        style={{
                          backgroundColor: item.active ? "#2D3640" : "transparent",
                          color: item.active ? "#4CCBBF" : "#64748B",
                        }}
                      >
                        {item.label}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fake main area */}
                <div className="flex-1 p-5" style={{ backgroundColor: "#1C2127" }}>
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "#E2E8F0" }}>Good morning, User 👋</p>
                      <p className="text-[11px]" style={{ color: "#475569" }}>Thursday, July 16, 2026</p>
                    </div>
                    <div className="rounded-lg px-3 py-1 text-[11px] font-semibold" style={{ backgroundColor: "#4CCBBF", color: "#0A0D14" }}>
                      New Project
                    </div>
                  </div>

                  {/* Stat cards */}
                  <div className="mb-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
                    {[
                      { label: "Total Projects", value: "6", up: true },
                      { label: "Total Tasks", value: "132", up: true },
                      { label: "Team Members", value: "8", up: false },
                      { label: "Productivity", value: "76%", up: true },
                    ].map(stat => (
                      <div
                        key={stat.label}
                        className="rounded-xl p-3"
                        style={{ backgroundColor: "#242B33", border: "1px solid #2D3640" }}
                      >
                        <p className="text-[10px]" style={{ color: "#64748B" }}>{stat.label}</p>
                        <p className="mt-1 text-lg font-bold" style={{ color: "#E2E8F0" }}>{stat.value}</p>
                        <p className="mt-0.5 text-[10px]" style={{ color: stat.up ? "#4CCB98" : "#ED495D" }}>
                          {stat.up ? "↑" : "↓"} this month
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Table stub */}
                  <div className="rounded-xl" style={{ backgroundColor: "#242B33", border: "1px solid #2D3640" }}>
                    <div className="border-b px-4 py-2.5" style={{ borderColor: "#2D3640" }}>
                      <p className="text-xs font-semibold" style={{ color: "#E2E8F0" }}>Active Projects</p>
                    </div>
                    {["CRM Redesign", "Mobile App v2", "API Gateway"].map((name, i) => (
                      <div
                        key={name}
                        className="flex items-center justify-between px-4 py-2.5"
                        style={{ borderBottom: i < 2 ? "1px solid rgba(45,54,64,0.5)" : "none" }}
                      >
                        <span className="text-[11px]" style={{ color: "#94A3B8" }}>{name}</span>
                        <span
                          className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                          style={{
                            backgroundColor: i === 2 ? "rgba(76,203,152,0.15)" : "rgba(76,203,191,0.15)",
                            color: i === 2 ? "#4CCB98" : "#4CCBBF",
                          }}
                        >
                          {i === 2 ? "Completed" : "In Progress"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Fade bottom */}
            <div
              className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 rounded-b-2xl"
              style={{ background: "linear-gradient(to bottom, transparent, #0A0D14)" }}
            />
          </div>
        </section>

        {/* ── Stats strip ────────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div
            className="grid grid-cols-3 divide-x rounded-2xl border py-8"
            style={{ borderColor: "rgba(255,255,255,0.07)", backgroundColor: "rgba(255,255,255,0.02)" }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1 px-4 text-center">
                <p className="text-3xl font-bold" style={{ color: "#F1F5F9" }}>{stat.value}</p>
                <p className="text-xs" style={{ color: "#64748B" }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Features ───────────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="mb-16">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "#4CCBBF" }}>
              What&apos;s included
            </p>
            <h2 className="max-w-xl text-3xl font-bold leading-tight" style={{ color: "#F1F5F9" }}>
              Everything wired up, nothing to configure
            </h2>
          </div>

          <div className="space-y-px">
            {features.map((feature) => (
              <div
                key={feature.number}
                className="group flex flex-col gap-6 border-t py-10 transition-all sm:flex-row sm:items-start sm:gap-16"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
              >
                <div className="flex shrink-0 items-center gap-4 sm:w-40 sm:flex-col sm:items-start sm:gap-2">
                  <span className="font-mono text-sm font-semibold" style={{ color: "rgba(76,203,191,0.5)" }}>
                    {feature.number}
                  </span>
                  <span
                    className="rounded-full border px-2.5 py-0.5 text-xs font-medium"
                    style={{ borderColor: "rgba(255,255,255,0.08)", color: "#64748B" }}
                  >
                    {feature.tag}
                  </span>
                </div>

                <div className="flex-1">
                  <h3 className="mb-2 text-lg font-semibold" style={{ color: "#F1F5F9" }}>
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#64748B" }}>
                    {feature.description}
                  </p>
                  <code
                    className="mt-4 inline-block rounded-lg px-3 py-1.5 font-mono text-xs"
                    style={{ backgroundColor: "rgba(255,255,255,0.04)", color: "#4CCBBF", border: "1px solid rgba(76,203,191,0.12)" }}
                  >
                    {feature.detail}
                  </code>
                </div>

                <div
                  className="hidden shrink-0 self-center sm:block transition-transform group-hover:translate-x-1"
                  style={{ color: "rgba(255,255,255,0.15)" }}
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ────────────────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-6 pb-32">
          <div
            className="relative overflow-hidden rounded-3xl border p-16 text-center"
            style={{ borderColor: "rgba(76,203,191,0.15)", backgroundColor: "rgba(76,203,191,0.04)" }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{ background: "radial-gradient(ellipse 60% 60% at 50% 100%, rgba(76,203,191,0.10) 0%, transparent 70%)" }}
            />
            <p className="relative mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "#4CCBBF" }}>
              Get started today
            </p>
            <h2 className="relative mb-4 text-3xl font-bold" style={{ color: "#F1F5F9" }}>
              Ready to ship faster?
            </h2>
            <p className="relative mb-10 text-sm leading-relaxed" style={{ color: "#64748B" }}>
              Clone the repo, connect your API, and focus on what makes your product unique.
            </p>
            <div className="relative flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href={routes.dashboard}
                className="rounded-xl px-7 py-3.5 text-sm font-semibold transition-all"
                style={{ backgroundColor: "#4CCBBF", color: "#0A0D14", boxShadow: "0 0 24px rgba(76,203,191,0.2)" }}
              >
                Open Dashboard →
              </Link>
              <Link
                href={routes.components}
                className="rounded-xl border px-7 py-3.5 text-sm font-medium transition-colors"
                style={{ borderColor: "rgba(255,255,255,0.1)", color: "#94A3B8" }}
              >
                Browse Components
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer
        className="border-t py-10"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <span
              className="flex h-6 w-6 items-center justify-center rounded text-[10px] font-black"
              style={{ backgroundColor: "#4CCBBF", color: "#0A0D14" }}
            >
              N
            </span>
            <span className="text-sm font-semibold" style={{ color: "#E2E8F0" }}>{siteConfig.name.split(" ")[0]}</span>
          </div>
          <p className="text-xs" style={{ color: "#475569" }}>
            © {new Date().getFullYear()} {siteConfig.name}. Built with Next.js + Tailwind CSS v4.
          </p>
          <div className="flex items-center gap-6">
            {["Dashboard", "Components", "Login"].map(item => (
              <span key={item} className="cursor-pointer text-xs transition-colors" style={{ color: "#475569" }}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
