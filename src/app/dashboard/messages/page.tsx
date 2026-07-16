import type { Metadata } from "next";
import { ComingSoon } from "@/app/dashboard/_components/coming-soon";

export const metadata: Metadata = {
  title: "Messages",
  description: "Team messaging and communication hub.",
};

export default function MessagesPage() {
  return (
    <ComingSoon
      icon="💬"
      title="Messages"
      description="A centralised communication hub for your team — direct messages, threads, and notifications."
      features={[
        "Direct messages between team members",
        "Group conversations per project",
        "File and image sharing",
        "Message search",
        "Read receipts and typing indicators",
        "Push notification support",
      ]}
      implementationHint="Create your messaging service at src/services/messages-service.ts and build the feature module under src/features/messages/."
    />
  );
}

