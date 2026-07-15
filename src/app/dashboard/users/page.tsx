import type { Metadata } from "next";
import { ComingSoon } from "@/app/dashboard/_components/coming-soon";

export const metadata: Metadata = {
  title: "Users",
  description: "Manage team members, roles, and permissions.",
};

export default function UsersPage() {
  return (
    <ComingSoon
      icon="👥"
      title="Users"
      description="Manage team members, assign roles, and control access permissions across your workspace."
      features={[
        "User listing with search & filters",
        "Invite new team members by email",
        "Role assignment (Admin, Manager, Developer, Viewer)",
        "Deactivate or remove users",
        "Bulk actions",
        "Activity log per user",
      ]}
      implementationHint="Create your users service at src/services/users-service.ts and build the feature module under src/features/users/."
    />
  );
}
