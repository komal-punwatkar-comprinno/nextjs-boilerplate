/**
 * Application role definitions.
 *
 * Roles are strings that match the values stored in the Cognito user pool
 * groups (or the equivalent identity provider attribute).
 */
export const ROLES = {
  ADMIN: "admin",
  USER: "user",
  VIEWER: "viewer",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

/**
 * Returns `true` when the provided role list includes at least one of the
 * required roles.
 *
 * @example
 * hasRole(["admin"], [ROLES.ADMIN]) // true
 * hasRole(["user"], [ROLES.ADMIN])  // false
 */
export function hasRole(
  userRoles: string[],
  requiredRoles: Role[]
): boolean {
  return requiredRoles.some((role) => userRoles.includes(role));
}
