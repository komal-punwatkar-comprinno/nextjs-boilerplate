"use client";

import { useState } from "react";
import { ListGroup, Badge } from "@/components";
import { SectionWrapper } from "./section-wrapper";

const HomeIcon = <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const UserIcon = <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const BellIcon = <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>;
const CogIcon = <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;

export function ListGroupSection() {
  const [active, setActive] = useState("dashboard");

  return (
    <SectionWrapper id="list-group" title="List Group">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Basic</p>
          <ListGroup
            items={[
              { id: "1", label: "Dashboard" },
              { id: "2", label: "Analytics" },
              { id: "3", label: "Projects" },
              { id: "4", label: "Settings" },
            ]}
          />
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">With icons & badges</p>
          <ListGroup
            items={[
              { id: "inbox",    label: "Inbox",        icon: HomeIcon, badge: <Badge variant="info">12</Badge> },
              { id: "profile",  label: "Profile",      icon: UserIcon },
              { id: "notifs",   label: "Notifications",icon: BellIcon, badge: <Badge variant="danger">3</Badge> },
              { id: "settings", label: "Settings",     icon: CogIcon },
            ]}
          />
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Interactive with active state</p>
          <ListGroup
            items={[
              { id: "dashboard", label: "Dashboard",  description: "Overview & metrics",  icon: HomeIcon, active: active === "dashboard", onClick: () => setActive("dashboard") },
              { id: "users",     label: "Users",      description: "Manage team members", icon: UserIcon, active: active === "users",     onClick: () => setActive("users") },
              { id: "alerts",    label: "Alerts",     description: "System notifications",icon: BellIcon, active: active === "alerts",    onClick: () => setActive("alerts") },
              { id: "config",    label: "Config",     description: "App configuration",   icon: CogIcon,  active: active === "config",    onClick: () => setActive("config") },
            ]}
          />
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">With disabled item</p>
          <ListGroup
            items={[
              { id: "a", label: "Available option" },
              { id: "b", label: "Another option" },
              { id: "c", label: "Disabled option", disabled: true, description: "Not available in your plan" },
              { id: "d", label: "Final option" },
            ]}
          />
        </div>

      </div>
    </SectionWrapper>
  );
}
