import type { AuthSession, LoginCredentials } from "@/types/auth";

/**
 * Provider-agnostic authentication boundary.
 *
 * Implement this contract with Cognito or another identity provider without
 * coupling pages, hooks, and providers to that vendor's SDK or response shape.
 */
export interface AuthService {
  login(credentials: LoginCredentials): Promise<AuthSession>;
  logout(): Promise<void>;
  getSession(): Promise<AuthSession | null>;
  refreshSession(): Promise<AuthSession | null>;
}
