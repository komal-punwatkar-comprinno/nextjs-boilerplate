import { redirect } from "next/navigation";
import { routes } from "@/config/routes";

/**
 * Landing page — redirects to login.
 *
 * In the existing SkillSphere app, index.html simply redirects to the
 * login page (or dashboard if already authenticated). The auth check
 * will be handled by middleware once Phase 1 is wired.
 */
export default function HomePage() {
  redirect(routes.login);
}
