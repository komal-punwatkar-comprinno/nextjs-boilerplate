import type { Role } from "@/constants/roles";

// ─── User ────────────────────────────────────────────────────────────────────

/** User identity returned by the backend after authentication. */
export interface AuthUser {
  email: string;
  name: string;
  role: Role;
  team?: string;
  manager?: string;
}

// ─── Auth Requests ───────────────────────────────────────────────────────────

/** POST /auth/login — standard login */
export interface LoginRequest {
  email: string;
  password: string;
}

/** POST /auth/login — new password challenge response */
export interface NewPasswordChallengeRequest {
  email: string;
  password: string;
  new_password: string;
  session: string;
}

/** POST /auth/forgot-password */
export interface ForgotPasswordRequest {
  email: string;
}

/** POST /auth/reset-password */
export interface ResetPasswordRequest {
  email: string;
  code: string;
  new_password: string;
}

/** POST /auth/refresh */
export interface RefreshTokenRequest {
  refresh_token: string;
}

// ─── Auth Responses ──────────────────────────────────────────────────────────

/** Successful login — tokens + user profile */
export interface LoginSuccessResponse {
  access_token: string;
  id_token: string;
  refresh_token: string;
  user: AuthUser;
}

/** Login requires a new password (first login after admin-created account) */
export interface LoginChallengeResponse {
  challenge: "NEW_PASSWORD_REQUIRED";
  session: string;
}

/** Union of possible login responses */
export type LoginResponse = LoginSuccessResponse | LoginChallengeResponse;

/** POST /auth/refresh response */
export interface RefreshTokenResponse {
  access_token: string;
  id_token: string;
}

/** Generic message response (forgot-password, reset-password) */
export interface MessageResponse {
  message: string;
}

/** Backend error response */
export interface AuthErrorResponse {
  error: string;
}

// ─── Auth Session (client-side state) ────────────────────────────────────────

/** Tokens stored in localStorage */
export interface AuthTokens {
  access_token: string;
  id_token: string;
  refresh_token: string;
}

/** The complete authenticated session managed by AuthProvider */
export interface AuthSession {
  tokens: AuthTokens;
  user: AuthUser;
}

// ─── Form Credentials ────────────────────────────────────────────────────────

/** Credentials collected by the login form */
export interface LoginCredentials {
  email: string;
  password: string;
}

/** Credentials for the new-password challenge form */
export interface NewPasswordCredentials {
  new_password: string;
  confirm_password: string;
}

/** Credentials for the forgot-password form */
export interface ForgotPasswordCredentials {
  email: string;
}

/** Credentials for the reset-password form */
export interface ResetPasswordCredentials {
  email: string;
  code: string;
  new_password: string;
  confirm_password: string;
}

// ─── Type Guards ─────────────────────────────────────────────────────────────

/** Check if a login response is a challenge (requires new password) */
export function isLoginChallenge(
  res: LoginResponse
): res is LoginChallengeResponse {
  return "challenge" in res;
}

/** Check if a login response is a success (has tokens) */
export function isLoginSuccess(
  res: LoginResponse
): res is LoginSuccessResponse {
  return "access_token" in res;
}
