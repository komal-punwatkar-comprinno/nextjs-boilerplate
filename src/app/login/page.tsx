"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/use-auth";
import { useZodForm } from "@/hooks/use-zod-form";
import { loginSchema } from "@/lib/schemas";
import type { LoginFormValues } from "@/lib/schemas";
import { Input, Button, Icon, TogglePassword, Alert, Card } from "@/components";
import { routes } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { authService } from "@/services/auth-service";
import { isLoginChallenge, isLoginSuccess } from "@/types/auth";
import type { ApiError } from "@/types/api";

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);

  // New password challenge state
  const [showNewPasswordModal, setShowNewPasswordModal] = useState(false);

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace(routes.dashboard);
    }
  }, [isLoading, isAuthenticated, router]);

  const [challengeSession, setChallengeSession] = useState<string>("");
  const [challengeEmail, setChallengeEmail] = useState<string>("");
  const [challengePassword, setChallengePassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [challengeError, setChallengeError] = useState<string | null>(null);
  const [challengeLoading, setChallengeLoading] = useState(false);

  const form = useZodForm(loginSchema, {
    defaultValues: { email: "", password: "" },
  });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = form;

  async function onSubmit(values: LoginFormValues) {
    setServerError(null);

    try {
      const result = await authService.login({
        email: values.email,
        password: values.password,
      });

      if (isLoginChallenge(result)) {
        // First login — user needs to set a new password
        setChallengeSession(result.session);
        setChallengeEmail(values.email);
        setChallengePassword(values.password);
        setShowNewPasswordModal(true);
        return;
      }

      if (isLoginSuccess(result)) {
        // Store tokens and user, then redirect to dashboard
        authService.saveSession(
          {
            access_token: result.access_token,
            id_token: result.id_token,
            refresh_token: result.refresh_token,
          },
          result.user
        );
        // Full page reload so AuthProvider initializes with the new session
        window.location.href = routes.dashboard;
      }
    } catch (err: unknown) {
      const apiError = err as ApiError;
      setServerError(apiError.message || "Unable to sign in. Please check your credentials and try again.");
    }
  }

  async function handleNewPasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    setChallengeError(null);

    // Validation
    if (newPassword.length < 8) {
      setChallengeError("Password must be at least 8 characters long.");
      return;
    }
    if (!/[A-Z]/.test(newPassword) || !/[a-z]/.test(newPassword) || !/[0-9]/.test(newPassword) || !/[^A-Za-z0-9]/.test(newPassword)) {
      setChallengeError("Password must include uppercase, lowercase, number, and special character.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setChallengeError("Passwords do not match.");
      return;
    }

    setChallengeLoading(true);
    try {
      const result = await authService.completeNewPasswordChallenge({
        email: challengeEmail,
        password: challengePassword,
        new_password: newPassword,
        session: challengeSession,
      });

      if (isLoginSuccess(result)) {
        authService.saveSession(
          {
            access_token: result.access_token,
            id_token: result.id_token,
            refresh_token: result.refresh_token,
          },
          result.user
        );
        window.location.href = routes.dashboard;
      }
    } catch (err: unknown) {
      const apiError = err as ApiError;
      setChallengeError(apiError.message || "Password change failed. Please try again.");
    } finally {
      setChallengeLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-16 dark:bg-[#0A0D14]">
      <div className="w-full max-w-md">

        {/* Logo & Header */}
        <div className="mb-8 flex flex-col items-center text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/comprinno-logo.png" alt="Comprinno" className="h-12 w-auto object-contain" />
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-800 dark:text-white">
            {siteConfig.name}
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Sign in to your account
          </p>
        </div>

        {/* Login Card */}
        <Card className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">

            {/* Server / API error */}
            {serverError && (
              <Alert variant="danger" dismissible>
                {serverError}
              </Alert>
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
            <TogglePassword
              label="Password"
              autoComplete="current-password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register("password")}
            />

            {/* Forgot password link */}
            <div className="flex justify-end">
              <Link
                href={routes.forgotPassword}
                className="text-xs font-medium text-[#1b2a49] hover:text-[#ff9472] dark:text-[#ff9472] dark:hover:text-[#e8845f]"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Submit */}
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
        </Card>
      </div>

      {/* ── New Password Challenge Modal ──────────────────────────────────── */}
      {showNewPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-2xl dark:bg-[#1C2127]">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">
              Welcome! Set your password
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              This is your first login. Please create a new password.
            </p>

            <form onSubmit={handleNewPasswordSubmit} className="mt-6 space-y-4">
              {challengeError && (
                <Alert variant="danger">
                  {challengeError}
                </Alert>
              )}

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-[#1b2a49] focus:ring-1 focus:ring-[#1b2a49] dark:border-slate-600 dark:bg-[#242B33] dark:text-white"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-[#1b2a49] focus:ring-1 focus:ring-[#1b2a49] dark:border-slate-600 dark:bg-[#242B33] dark:text-white"
                />
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Must include: 8+ characters, uppercase, lowercase, number, and special character.
              </p>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={challengeLoading}
                className="w-full"
              >
                {challengeLoading ? "Setting password…" : "Set Password & Sign In"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
