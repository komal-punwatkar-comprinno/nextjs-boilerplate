"use client";

import Link from "next/link";
import { useState } from "react";

import { useZodForm } from "@/hooks/use-zod-form";
import { forgotPasswordSchema, resetPasswordSchema } from "@/lib/schemas";
import type { ForgotPasswordFormValues, ResetPasswordFormValues } from "@/lib/schemas";
import { Input, Button, Icon, TogglePassword, Alert, Card } from "@/components";
import { routes } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { authService } from "@/services/auth-service";
import type { ApiError } from "@/types/api";

type Step = "email" | "reset" | "success";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-16 dark:bg-[#0A0D14]">
      <div className="w-full max-w-md">

        {/* Logo & Header */}
        <div className="mb-8 flex flex-col items-center text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/comprinno-logo.png" alt="Comprinno" className="h-12 w-auto object-contain" />
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-800 dark:text-white">
            {step === "success" ? "Password Reset" : "Forgot Password"}
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {step === "email" && "Enter your email to receive a verification code."}
            {step === "reset" && "Enter the code sent to your email and your new password."}
            {step === "success" && "Your password has been reset successfully."}
          </p>
        </div>

        <Card className="p-8">
          {/* Step 1: Email */}
          {step === "email" && (
            <EmailStep
              error={error}
              setError={setError}
              onSuccess={(emailValue) => {
                setEmail(emailValue);
                setSuccessMsg("Verification code sent to your email.");
                setError(null);
                setStep("reset");
              }}
            />
          )}

          {/* Step 2: Code + New Password */}
          {step === "reset" && (
            <ResetStep
              email={email}
              error={error}
              successMsg={successMsg}
              setError={setError}
              setSuccessMsg={setSuccessMsg}
              onSuccess={() => {
                setError(null);
                setStep("success");
              }}
            />
          )}

          {/* Step 3: Success */}
          {step === "success" && (
            <div className="space-y-4 text-center">
              <Alert variant="success">
                Password reset successful! You can now sign in with your new password.
              </Alert>
              <Link
                href={routes.login}
                className="inline-flex items-center gap-2 rounded-lg bg-[#1b2a49] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2a3d5f]"
              >
                <Icon name="arrowLeft" size="sm" />
                Back to Sign In
              </Link>
            </div>
          )}
        </Card>

        {/* Back to login link */}
        {step !== "success" && (
          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            Remember your password?{" "}
            <Link
              href={routes.login}
              className="font-medium text-[#1b2a49] hover:text-[#ff9472] dark:text-[#ff9472] dark:hover:text-[#e8845f]"
            >
              Sign in
            </Link>
          </p>
        )}
      </div>
    </main>
  );
}

// ─── Step 1: Email Form ──────────────────────────────────────────────────────

function EmailStep({
  error,
  setError,
  onSuccess,
}: {
  error: string | null;
  setError: (e: string | null) => void;
  onSuccess: (email: string) => void;
}) {
  const form = useZodForm(forgotPasswordSchema, {
    defaultValues: { email: "" },
  });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = form;

  async function onSubmit(values: ForgotPasswordFormValues) {
    setError(null);
    try {
      await authService.forgotPassword({ email: values.email });
      onSuccess(values.email);
    } catch (err: unknown) {
      const apiError = err as ApiError;
      setError(apiError.message || "Failed to send verification code. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {error && (
        <Alert variant="danger" dismissible>
          {error}
        </Alert>
      )}

      <Input
        label="Email address"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        leftAddon={<Icon name="mail" size="sm" />}
        error={errors.email?.message}
        {...register("email")}
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? "Sending code…" : "Send Verification Code"}
      </Button>
    </form>
  );
}

// ─── Step 2: Reset Password Form ─────────────────────────────────────────────

function ResetStep({
  email,
  error,
  successMsg,
  setError,
  setSuccessMsg,
  onSuccess,
}: {
  email: string;
  error: string | null;
  successMsg: string | null;
  setError: (e: string | null) => void;
  setSuccessMsg: (m: string | null) => void;
  onSuccess: () => void;
}) {
  const form = useZodForm(resetPasswordSchema, {
    defaultValues: { email, code: "", new_password: "", confirm_password: "" },
  });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = form;

  async function onSubmit(values: ResetPasswordFormValues) {
    setError(null);
    setSuccessMsg(null);
    try {
      await authService.resetPassword({
        email: values.email,
        code: values.code,
        new_password: values.new_password,
      });
      onSuccess();
    } catch (err: unknown) {
      const apiError = err as ApiError;
      setError(apiError.message || "Password reset failed. Please check your code and try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {successMsg && (
        <Alert variant="success">
          {successMsg}
        </Alert>
      )}

      {error && (
        <Alert variant="danger" dismissible>
          {error}
        </Alert>
      )}

      {/* Hidden email field — pre-filled from step 1 */}
      <input type="hidden" {...register("email")} />

      <Input
        label="Verification Code"
        type="text"
        autoComplete="one-time-code"
        placeholder="Enter the code from your email"
        leftAddon={<Icon name="lock" size="sm" />}
        error={errors.code?.message}
        {...register("code")}
      />

      <TogglePassword
        label="New Password"
        autoComplete="new-password"
        placeholder="Enter new password"
        error={errors.new_password?.message}
        {...register("new_password")}
      />

      <TogglePassword
        label="Confirm Password"
        autoComplete="new-password"
        placeholder="Confirm new password"
        error={errors.confirm_password?.message}
        {...register("confirm_password")}
      />

      <p className="text-xs text-slate-500 dark:text-slate-400">
        Must include: 8+ characters, uppercase, lowercase, number, and special character.
      </p>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? "Resetting…" : "Reset Password"}
      </Button>
    </form>
  );
}
