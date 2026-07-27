"use client";

import Link from "next/link";
import { useState } from "react";

import { useZodForm } from "@/hooks/use-zod-form";
import { loginSchema } from "@/lib/schemas";
import type { LoginFormValues } from "@/lib/schemas";
import { Input, Button, Icon, Divider, TogglePassword, Alert, Card } from "@/components";
import { Logo } from "@/components/common/logo";
import { routes } from "@/config/routes";

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

  const form = useZodForm(loginSchema, {
    defaultValues: { email: "", password: "" },
  });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = form;

  async function onSubmit(values: LoginFormValues) {
    setServerError(null);

    try {
      // ─── TODO: Replace this block with your real auth call ────────────────
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setServerError("Auth provider not configured yet. Wire up your login logic in src/app/login/page.tsx.");
      // ──────────────────────────────────────────────────────────────────────
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setServerError(message);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-16 dark:bg-[#0A0D14]">
      <div className="w-full max-w-md">

        {/* Logo — using boilerplate Logo component */}
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo src="/logo-300x300.png" name="Comprinno" size="lg" />
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-800 dark:text-white">
            Sign in to your account
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Enter your credentials to access your dashboard.
          </p>
        </div>

        {/* Card — using boilerplate Card component */}
        <Card className="p-8">

          {/* Developer notice — using boilerplate Alert component */}
          <Alert variant="warning" className="mb-6">
            <span className="font-semibold">Boilerplate demo — </span>
            form validation and loading states are fully wired. Connect your auth
            provider in{" "}
            <code className="rounded bg-amber-100 px-1 font-mono text-[11px] dark:bg-amber-500/20">
              src/app/login/page.tsx
            </code>{" "}
            inside the <code className="rounded bg-amber-100 px-1 font-mono text-[11px] dark:bg-amber-500/20">onSubmit</code> handler.
          </Alert>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">

            {/* Server / API error — using boilerplate Alert component */}
            {serverError && (
              <Alert variant="danger" dismissible>
                {serverError}
              </Alert>
            )}

            {/* Email — using boilerplate Input component */}
            <Input
              label="Email address"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              leftAddon={<Icon name="mail" size="sm" />}
              error={errors.email?.message}
              {...register("email")}
            />

            {/* Password — using boilerplate TogglePassword component */}
            <TogglePassword
              label="Password"
              autoComplete="current-password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register("password")}
            />

            {/* Forgot password */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-xs font-medium text-indigo-600 hover:text-indigo-700 dark:text-[#4CCBBF] dark:hover:text-[#6EE7DF]"
                onClick={() => setServerError("Forgot password flow — implement in your auth provider.")}
              >
                Forgot your password?
              </button>
            </div>

            {/* Submit — using boilerplate Button component */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? "Signing in…" : "Sign in"}
            </Button>
          </form>

          {/* Divider — using boilerplate Divider component */}
          <Divider label="or" className="my-6" />

          {/* SSO placeholder */}
          <button
            type="button"
            onClick={() => setServerError("SSO / OAuth — configure your provider and implement this handler.")}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
        </Card>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          Don&a
          
          pos;t have an account?{" "}
          <Link href={routes.dashboard} className="font-medium text-indigo-600 hover:text-indigo-700 dark:text-[#4CCBBF] dark:hover:text-[#6EE7DF]">
            View dashboard demo →
          </Link>
        </p>
      </div>
    </main>
  );
}
