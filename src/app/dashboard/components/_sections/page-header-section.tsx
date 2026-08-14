"use client";

import { ComponentPreview } from "../_components/component-preview";
import { SectionWrapper } from "./section-wrapper";
import { PageHeader, Button } from "@/components";

export function PageHeaderSection() {
  return (
    <SectionWrapper id="page-header" title="Page Header" description="Top-of-page header with title, description, actions, and optional tabs.">
      <div className="space-y-8">
        <ComponentPreview
          title="With Description & Actions"
          code={`<PageHeader
  title="Dashboard"
  description="Welcome back, Alex. Here's what's happening today."
  actions={<Button>New Project</Button>}
/>`}
        >
          <PageHeader
            title="Dashboard"
            description="Welcome back, Alex. Here's what's happening today."
            actions={<Button>New Project</Button>}
          />
        </ComponentPreview>

        <ComponentPreview
          title="Simple Header"
          code={`<PageHeader
  title="Settings"
  description="Manage your account preferences"
/>`}
        >
          <PageHeader
            title="Settings"
            description="Manage your account preferences"
          />
        </ComponentPreview>

        <ComponentPreview
          title="With Multiple Actions"
          code={`<PageHeader
  title="Users"
  description="Manage team members and roles"
  actions={
    <div className="flex gap-2">
      <Button variant="ghost">Export</Button>
      <Button variant="primary">Invite User</Button>
    </div>
  }
/>`}
        >
          <PageHeader
            title="Users"
            description="Manage team members and roles"
            actions={
              <div className="flex gap-2">
                <Button variant="ghost">Export</Button>
                <Button variant="primary">Invite User</Button>
              </div>
            }
          />
        </ComponentPreview>
      </div>
    </SectionWrapper>
  );
}
