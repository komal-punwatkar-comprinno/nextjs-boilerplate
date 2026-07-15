/** A user identity exposed to the application after authentication. */
export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  roles: string[];
}

/** The authenticated session stored and consumed by the application. */
export interface AuthSession {
  accessToken: string;
  expiresAt: number;
  user: AuthUser;
}

/** Credentials collected by an authentication form before backend mapping. */
export interface LoginCredentials {
  identifier: string;
  password: string;
}
