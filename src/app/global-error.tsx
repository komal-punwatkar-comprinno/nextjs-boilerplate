"use client";

/**
 * Root-level error boundary.
 *
 * Catches errors thrown during rendering of the root layout itself.
 * This file must define its own <html> and <body> tags because it
 * replaces the root layout when active.
 *
 * See: https://nextjs.org/docs/app/api-reference/file-conventions/error#global-error
 */
export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  const message =
    process.env.NODE_ENV === "development"
      ? error.message
      : "An unexpected error occurred. Please refresh the page.";

  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center px-6 py-16 font-sans antialiased">
        <section className="max-w-md text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-600">
            Critical error
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight">
            Something went wrong
          </h1>
          <p className="mt-6 leading-7 text-zinc-600">{message}</p>
          {error.digest && (
            <p className="mt-2 text-xs text-zinc-400">
              Error ID: {error.digest}
            </p>
          )}
          <button
            className="mt-8 rounded-md bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700"
            onClick={unstable_retry}
            type="button"
          >
            Try again
          </button>
        </section>
      </body>
    </html>
  );
}
