import Link from "next/link";

import { routes } from "@/config/routes";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16">
      <section className="max-w-md text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-600">
          Error 404
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight">
          Page not found
        </h1>
        <p className="mt-6 leading-7 text-zinc-600">
          The page you are looking for does not exist or may have moved.
        </p>
        <Link
          className="mt-8 inline-flex rounded-md bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700"
          href={routes.home}
        >
          Return home
        </Link>
      </section>
    </main>
  );
}
