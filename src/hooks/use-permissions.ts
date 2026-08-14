"use client";

import { useCallback, useMemo } from "react";

import { useAuth } from "@/hooks/use-auth";
import { hasRole, type Role } from "@/constants/roles";

export interface UsePermissionsReturn {
  /** All roles assigned to the current user. */
  roles: string[];
  /** Returns true if the user has at least one of the given roles. */
  can: (requiredRoles: Role[]) => boolean;
  /** Returns true if the user has the "admin" role. */
  isAdmin: boolean;
}

/**
 * Exposes the current user's roles and a helper to check permissions.
 *
 * Must be used inside an `<AuthProvider>` tree.
 *
 * @example
 * const { can, isAdmin } = usePermissions();
 *
 * // Show a button only to admins
 * {isAdmin && <Button>Delete user</Button>}
 *
 * // Check a specific role
 * {can([ROLES.ADMIN, ROLES.USER]) && <SomePage />}
 */
export function usePermissions(): UsePermissionsReturn {
  const { user } = useAuth();

  const roles = useMemo(() => user?.roles ?? [], [user]);

  const can = useCallback(
    (requiredRoles: Role[]) => hasRole(roles, requiredRoles),
    [roles]
  );

  const isAdmin = useMemo(() => hasRole(roles, ["admin"]), [roles]);

  return { roles, can, isAdmin };
}
