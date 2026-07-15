"use client";

import Link from "next/link";
import { useState } from "react";

import { useZodForm } from "@/hooks/use-zod-form";
import { loginSchema } from "@/lib/schemas";
import type { LoginFormValues } from "@/lib/schemas";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Icon } from "@/components/icon";
import { routes } from "@/config/routes";
import { siteConfig } from "@/config/site";

/**
 * Login page — fully wired form with Zod validation and loading/error states.
 *
 * ─── FOR DEVELOPERS ──────────────────────────────────────────────────────────
 * The form UI, validation, and state management are complete.
 * To connect a real auth provider (e.g. AWS Cognito):
 *
 *   1. Implement `AuthService.login()` in src/services/auth-service.ts.
 *   2. Call it inside the `onSubmit` handler below.
 *   3. On success: store the session token and redirect to the dashboard.
 *   4. On failure: call `setServerError()` with the error message.
 *
 * See src/lib/schemas.ts for the loginSchema (email + password fields).
 * See src/hooks/use-zod-form.ts for the form hook.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export default function LoginPage() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const form = useZodForm(loginSchema, {
    defaultValues: { email: "", password: "" },
  });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = form;

  async function onSubmit(values: LoginFormValues) {
    setServerError(null);

    try {
      // ─── TODO: Replace this block with your real auth call ────────────────
      // Example with Cognito:
      //   const session = await authService.login({
      //     identifier: values.email,
      //     password: values.password,
      //   });
      //   localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, session.accessToken);
      //   router.push(routes.dashboard);
      //
      // Simulating network delay for the boilerplate demo:
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setServerError("Auth provider not configured yet. Wire up your login logic in src/app/login/page.tsx.");
      // ──────────────────────────────────────────────────────────────────────
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setServerError(message);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-16">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-lg font-black text-white shadow-lg shadow-indigo-500/30">
            N
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-800">
            Sign in to {siteConfig.name.split(" ")[0]}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Enter your credentials to access your dashboard.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

          {/* Developer notice */}
          <div className="mb-6 rounded-lg border border-dashed border-amber-300 bg-amber-50 px-4 py-3">
            <div className="flex items-start gap-2">
              <span className="mt-0.5 text-base">👨‍💻</span>
              <p className="text-xs leading-relaxed text-amber-700">
                <span className="font-semibold">Boilerplate demo — </span>
                form validation and loading states are fully wired. Connect your auth
                provider in{" "}
                <code className="rounded bg-amber-100 px-1 font-mono text-[11px]">
                  src/app/login/page.tsx
                </code>{" "}
                inside the <code className="rounded bg-amber-100 px-1 font-mono text-[11px]">onSubmit</code> handler.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">

            {/* Server / API error */}
            {serverError && (
              <div
                role="alert"
                className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                <Icon name="xCircle" size="sm" className="mt-0.5 shrink-0 text-red-500" />
                {serverError}
              </div>
            )}

            {/* Email */}
            <Input
              label="Email address"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              leftAddon={<Icon name="mail" size="sm" />}
              error={errors.email?.message}
              {...register("email")}
            />

            {/* Password */}
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              leftAddon={<Icon name="lock" size="sm" />}
              rightAddon={
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((v) => !v)}
                  className="pointer-events-auto text-slate-400 hover:text-slate-600"
                >
                  <Icon name="eye" size="sm" />
                </button>
              }
              error={errors.password?.message}
              {...register("password")}
            />

            {/* Forgot password */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
                onClick={() => setServerError("Forgot password flow — implement in your auth provider.")}
              >
                Forgot your password?
              </button>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isSubmitting}
              className="w-full bg-indigo-600 hover:bg-indigo-500 focus-visible:ring-indigo-500"
            >
              {isSubmitting ? "Signing in…" : "Sign in"}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs text-slate-400">or</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* SSO placeholder */}
          <button
            type="button"
            onClick={() => setServerError("SSO / OAuth — configure your provider and implement this handler.")}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-slate-500">
          Don&apos;t have an account?{" "}
          <Link href={routes.dashboard} className="font-medium text-indigo-600 hover:text-indigo-700">
            View dashboard demo →
          </Link>
        </p>
      </div>
    </main>
  );
}
