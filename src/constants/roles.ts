/**
 * Application role definitions.
 *
 * Roles match the `custom:role` attribute stored in the Cognito user pool.
 * The hierarchy is: admin > manager > member.
 */
export const ROLES = {
  ADMIN: "admin",
  MANAGER: "manager",
  MEMBER: "member",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

/**
 * Returns `true` when the user's role is included in the required roles list.
 *
 * @example
 * hasRole("admin", [ROLES.ADMIN])           // true
 * hasRole("member", [ROLES.ADMIN])          // false
 * hasRole("manager", [ROLES.ADMIN, ROLES.MANAGER]) // true
 */
export function hasRole(
  userRole: string,
  requiredRoles: Role[]
): boolean {
  return requiredRoles.includes(userRole as Role);
}

/**
 * Returns `true` when the user's role is admin.
 */
export function isAdmin(role: string): boolean {
  return role === ROLES.ADMIN;
}

/**
 * Returns `true` when the user's role is admin or manager.
 */
export function isManagerOrAbove(role: string): boolean {
  return role === ROLES.ADMIN || role === ROLES.MANAGER;
}
