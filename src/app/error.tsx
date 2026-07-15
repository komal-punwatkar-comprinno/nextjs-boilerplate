"use client";

type ErrorPageProps = {
  error: Error & { digest?: string };
  unstable_retry: () => void;
};

export default function ErrorPage({
  error,
  unstable_retry,
}: ErrorPageProps) {
  const message =
    process.env.NODE_ENV === "development"
      ? error.message
      : "An unexpected error occurred. Please try again.";

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="max-w-md text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-600">
          Something went wrong
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight">
          We could not load this page
        </h1>
        <p className="mt-6 leading-7 text-zinc-600">{message}</p>
        <button
          className="mt-8 rounded-md bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700"
          onClick={unstable_retry}
          type="button"
        >
          Try again
        </button>
      </section>
    </main>
  );
}
