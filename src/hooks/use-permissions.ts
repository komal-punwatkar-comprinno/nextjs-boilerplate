"use client";

import { useCallback, useMemo } from "react";

import { useAuth } from "@/hooks/use-auth";
import { hasRole, isAdmin as checkIsAdmin, isManagerOrAbove as checkIsManagerOrAbove, type Role } from "@/constants/roles";

export interface UsePermissionsReturn {
  /** The current user's role (single role from Cognito `custom:role`). */
  role: string;
  /** Returns true if the user's role matches at least one of the given roles. */
  can: (requiredRoles: Role[]) => boolean;
  /** Returns true if the user has the "admin" role. */
  isAdmin: boolean;
  /** Returns true if the user is admin or manager. */
  isManagerOrAbove: boolean;
}

/**
 * Exposes the current user's role and permission-check helpers.
 *
 * Must be used inside an `<AuthProvider>` tree.
 *
 * @example
 * const { can, isAdmin, isManagerOrAbove } = usePermissions();
 *
 * // Show a button only to admins
 * {isAdmin && <Button>Delete user</Button>}
 *
 * // Check specific roles
 * {can([ROLES.ADMIN, ROLES.MANAGER]) && <AdminPanel />}
 */
export function usePermissions(): UsePermissionsReturn {
  const { user } = useAuth();

  // SkillSphere uses a single role from Cognito (custom:role).
  // Fallback to "member" when no user/role is available.
  const role = useMemo(() => user?.role ?? "member", [user]);

  const can = useCallback(
    (requiredRoles: Role[]) => hasRole(role, requiredRoles),
    [role]
  );

  const isAdmin = useMemo(() => checkIsAdmin(role), [role]);
  const isManagerOrAbove = useMemo(() => checkIsManagerOrAbove(role), [role]);

  return { role, can, isAdmin, isManagerOrAbove };
}
