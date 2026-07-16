import type { Metadata } from "next";
import { ComingSoon } from "@/app/dashboard/_components/coming-soon";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your account and workspace preferences.",
};

export default function SettingsPage() {
  return (
    <ComingSoon
      icon="⚙️"
      title="Settings"
      description="Manage your account preferences, workspace configuration, integrations, and security settings."
      features={[
        "Profile and account details",
        "Password and two-factor authentication",
        "Workspace name, logo, and timezone",
        "Notification preferences",
        "API keys and integrations",
        "Billing and subscription management",
      ]}
      implementationHint="Create your settings service at src/services/settings-service.ts and build the feature module under src/features/settings/."
    />
  );
}

