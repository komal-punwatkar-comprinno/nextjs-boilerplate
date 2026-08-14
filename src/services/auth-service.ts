import { apiClient } from "@/lib/api-client";
import { STORAGE_KEYS } from "@/constants/storage-keys";
import type {
  LoginRequest,
  NewPasswordChallengeRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  RefreshTokenRequest,
  LoginResponse,
  RefreshTokenResponse,
  MessageResponse,
  AuthUser,
  AuthTokens,
} from "@/types/auth";

/**
 * AuthService — handles all authentication operations against the
 * SkillSphere Lambda backend (Cognito-backed).
 *
 * All endpoints use `noAuth: true` because auth calls are made before
 * or without a valid session.
 *
 * @example
 * import { authService } from "@/services/auth-service";
 *
 * const result = await authService.login({ email, password });
 * if (isLoginSuccess(result)) { ... }
 */
class AuthService {
  /**
   * POST /auth/login
   * Handles both standard login and NEW_PASSWORD_REQUIRED challenge response.
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return apiClient.post<LoginResponse>("/auth/login", credentials, {
      noAuth: true,
    });
  }

  /**
   * POST /auth/login (with new_password + session)
   * Responds to the NEW_PASSWORD_REQUIRED challenge on first login.
   */
  async completeNewPasswordChallenge(
    data: NewPasswordChallengeRequest
  ): Promise<LoginResponse> {
    return apiClient.post<LoginResponse>("/auth/login", data, {
      noAuth: true,
    });
  }

  /**
   * POST /auth/forgot-password
   * Triggers Cognito to send a verification code to the user's email.
   */
  async forgotPassword(data: ForgotPasswordRequest): Promise<MessageResponse> {
    return apiClient.post<MessageResponse>("/auth/forgot-password", data, {
      noAuth: true,
    });
  }

  /**
   * POST /auth/reset-password
   * Confirms the password reset with verification code + new password.
   */
  async resetPassword(data: ResetPasswordRequest): Promise<MessageResponse> {
    return apiClient.post<MessageResponse>("/auth/reset-password", data, {
      noAuth: true,
    });
  }

  /**
   * POST /auth/refresh
   * Exchanges the refresh token for new access + id tokens.
   */
  async refreshToken(data: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    return apiClient.post<RefreshTokenResponse>("/auth/refresh", data, {
      noAuth: true,
    });
  }

  // ─── Token & Session Management ─────────────────────────────────────────

  /**
   * Persists tokens and user to localStorage after successful login.
   */
  saveSession(tokens: AuthTokens, user: AuthUser): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.access_token);
    localStorage.setItem(STORAGE_KEYS.ID_TOKEN, tokens.id_token);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refresh_token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }

  /**
   * Updates tokens in localStorage after a refresh (no new refresh_token).
   */
  updateTokens(tokens: RefreshTokenResponse): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.access_token);
    localStorage.setItem(STORAGE_KEYS.ID_TOKEN, tokens.id_token);
  }

  /**
   * Retrieves stored tokens from localStorage.
   */
  getStoredTokens(): AuthTokens | null {
    if (typeof window === "undefined") return null;
    const access_token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    const id_token = localStorage.getItem(STORAGE_KEYS.ID_TOKEN);
    const refresh_token = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

    if (!access_token || !id_token || !refresh_token) return null;

    return { access_token, id_token, refresh_token };
  }

  /**
   * Retrieves stored user from localStorage.
   */
  getStoredUser(): AuthUser | null {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    if (!raw) return null;

    try {
      return JSON.parse(raw) as AuthUser;
    } catch {
      return null;
    }
  }

  /**
   * Clears all auth data from localStorage and returns true.
   */
  logout(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.ID_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  }

  /**
   * Checks if a session exists in localStorage (tokens present).
   * Does NOT validate token expiry — that's handled by AuthProvider.
   */
  hasSession(): boolean {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem(STORAGE_KEYS.ID_TOKEN);
  }

  /**
   * Decodes the JWT payload from the id_token (without verification).
   * Used client-side to read token expiry time.
   */
  decodeToken(token: string): Record<string, unknown> | null {
    try {
      const parts = token.split(".");
      if (parts.length !== 3) return null;
      const payload = atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"));
      return JSON.parse(payload);
    } catch {
      return null;
    }
  }

  /**
   * Returns the expiry timestamp (ms) of the id_token.
   * Returns 0 if token is invalid or not present.
   */
  getTokenExpiry(): number {
    const token = typeof window !== "undefined"
      ? localStorage.getItem(STORAGE_KEYS.ID_TOKEN)
      : null;
    if (!token) return 0;

    const payload = this.decodeToken(token);
    if (!payload || typeof payload.exp !== "number") return 0;

    return payload.exp * 1000; // Convert seconds to ms
  }

  /**
   * Returns true if the id_token is expired.
   */
  isTokenExpired(): boolean {
    const expiry = this.getTokenExpiry();
    return expiry === 0 || expiry < Date.now();
  }
}

/** Singleton instance */
export const authService = new AuthService();
