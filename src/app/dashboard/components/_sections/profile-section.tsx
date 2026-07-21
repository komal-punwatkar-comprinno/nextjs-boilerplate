"use client";

import { ComponentPreview } from "../_components/component-preview";
import { SectionWrapper } from "./section-wrapper";
import { Profile } from "@/components";

export function ProfileSection() {
  return (
    <SectionWrapper id="profile" title="Profile" description="User profile card displaying avatar, name, role, and status.">
      <div className="space-y-8">
        <ComponentPreview
          title="Admin Profile"
          code={`<Profile
  name="Alex Johnson"
  role="Admin"
  email="alex@example.com"
  status="active"
/>`}
        >
          <Profile
            name="Alex Johnson"
            role="Admin"
            email="alex@example.com"
            status="active"
          />
        </ComponentPreview>

        <ComponentPreview
          title="Team Members"
          code={`<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <Profile name="Sarah Chen" role="Developer" status="active" email="sarah@example.com" />
  <Profile name="Marcus Rivera" role="Designer" status="away" email="marcus@example.com" />
  <Profile name="Priya Patel" role="Manager" status="busy" email="priya@example.com" />
</div>`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Profile name="Sarah Chen" role="Developer" status="active" email="sarah@example.com" />
            <Profile name="Marcus Rivera" role="Designer" status="away" email="marcus@example.com" />
            <Profile name="Priya Patel" role="Manager" status="busy" email="priya@example.com" />
          </div>
        </ComponentPreview>

        <ComponentPreview
          title="Offline / No Email"
          code={`<Profile name="John Doe" role="Viewer" status="offline" />`}
        >
          <Profile name="John Doe" role="Viewer" status="offline" />
        </ComponentPreview>
      </div>
    </SectionWrapper>
  );
}
