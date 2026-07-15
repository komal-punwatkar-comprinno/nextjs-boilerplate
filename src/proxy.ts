import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// import { AUTH_COOKIE_KEY } from "@/constants/auth";
// import { routes } from "@/config/routes";

/**
 * ─── ROUTE PROTECTION (proxy.ts) ────────────────────────────────────────────
 *
 * This file controls which pages require authentication.
 *
 * CURRENT STATE: Auth logic is commented out so ALL pages are publicly
 * accessible. This lets customers browse the full boilerplate demo on
 * Vercel / Netlify without needing to log in.
 *
 * HOW TO ENABLE PROTECTION (when you integrate your auth provider):
 *
 *   1. Uncomment the imports above (AUTH_COOKIE_KEY, routes).
 *   2. Uncomment the protectedRoutes and authRoutes arrays below.
 *   3. Uncomment the full auth-check logic inside the proxy() function.
 *   4. Replace the single `return NextResponse.next()` line with nothing
 *      (delete it) so the real logic runs.
 *   5. Make sure your auth provider sets a cookie named by AUTH_COOKIE_KEY
 *      ("session") after a successful login.
 *
 * HOW IT WORKS (when enabled):
 *   - Every request passes through this function BEFORE the page renders.
 *   - If a visitor hits /dashboard without a session cookie → redirect /login.
 *   - If a logged-in user hits /login → redirect /dashboard.
 *   - Static files, images, and API routes are excluded via `config.matcher`.
 *
 * ────────────────────────────────────────────────────────────────────────────
 */

// ─── Protected routes ─────────────────────────────────────────────────────
// const protectedRoutes: string[] = [routes.dashboard];

// ─── Auth routes (redirect away when already logged in) ───────────────────
// const authRoutes: string[] = [routes.login];

export function proxy(request: NextRequest) {
  // ── AUTH LOGIC (commented out — uncomment to enable protection) ───────────
  //
  // const { pathname } = request.nextUrl;
  //
  // const isProtected = protectedRoutes.some(
  //   (route) => pathname === route || pathname.startsWith(`${route}/`)
  // );
  // const isAuthRoute = authRoutes.some((route) => pathname === route);
  //
  // // Read the session token from the cookie (optimistic check only).
  // // Full server-side verification happens in the Data Access Layer.
  // const sessionToken = request.cookies.get(AUTH_COOKIE_KEY)?.value;
  // const isAuthenticated = Boolean(sessionToken);
  //
  // // Unauthenticated user trying to access a protected route → redirect to login
  // if (isProtected && !isAuthenticated) {
  //   const loginUrl = new URL(routes.login, request.nextUrl);
  //   loginUrl.searchParams.set("from", pathname);
  //   return NextResponse.redirect(loginUrl);
  // }
  //
  // // Authenticated user trying to access an auth route (login) → redirect to dashboard
  // if (isAuthRoute && isAuthenticated) {
  //   return NextResponse.redirect(new URL(routes.dashboard, request.nextUrl));
  // }
  //
  // ─────────────────────────────────────────────────────────────────────────

  // All requests pass through freely while auth is disabled.
  return NextResponse.next();
}

// Run on all routes except Next.js internals and static assets.
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg$).*)"],
};
