import type { Metadata } from "next";
import { ComingSoon } from "@/app/dashboard/_components/coming-soon";

export const metadata: Metadata = {
  title: "Projects",
  description: "Organise and track all your team projects.",
};

export default function ProjectsPage() {
  return (
    <ComingSoon
      icon="📁"
      title="Projects"
      description="Create, organise, and track all your team projects from one central place."
      features={[
        "Project board with status columns",
        "Task assignment and due dates",
        "Progress tracking with milestones",
        "Team member allocation",
        "File attachments",
        "Project-level activity feed",
      ]}
      implementationHint="Create your projects service at src/services/projects-service.ts and build the feature module under src/features/projects/."
    />
  );
}

