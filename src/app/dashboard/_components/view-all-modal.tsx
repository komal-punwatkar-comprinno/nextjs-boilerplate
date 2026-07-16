"use client";

import { useState } from "react";
import { Modal } from "@/components/modal";
import { Button } from "@/components/button";
import { Badge } from "@/components/badge";
import { Avatar } from "@/components/avatar";

/* ── View All Projects ────────────────────────────────────────────────────── */
const allProjects = [
  { name: "CRM Redesign",        progress: 82,  status: "In Progress" as const, due: "Jul 30",  members: [{src:"https://i.pravatar.cc/150?img=1",name:"Alice"},{src:"https://i.pravatar.cc/150?img=2",name:"Bob"}] },
  { name: "Mobile App v2",       progress: 55,  status: "In Progress" as const, due: "Aug 15",  members: [{src:"https://i.pravatar.cc/150?img=4",name:"Dave"}] },
  { name: "API Gateway",         progress: 100, status: "Completed"   as const, due: "Jul 10",  members: [{src:"https://i.pravatar.cc/150?img=6",name:"Frank"}] },
  { name: "Analytics Dashboard", progress: 20,  status: "Planning"    as const, due: "Sep 1",   members: [{src:"https://i.pravatar.cc/150?img=8",name:"Hank"},{src:"https://i.pravatar.cc/150?img=9",name:"Iris"}] },
  { name: "Auth Service",        progress: 40,  status: "On Hold"     as const, due: "Aug 20",  members: [{src:"https://i.pravatar.cc/150?img=11",name:"Karen"}] },
  { name: "Design System",       progress: 65,  status: "In Progress" as const, due: "Aug 5",   members: [{src:"https://i.pravatar.cc/150?img=3",name:"Carol"}] },
  { name: "Payment Integration", progress: 10,  status: "Planning"    as const, due: "Oct 1",   members: [{src:"https://i.pravatar.cc/150?img=5",name:"Eve"}] },
  { name: "Notification Service",progress: 90,  status: "In Progress" as const, due: "Jul 25",  members: [{src:"https://i.pravatar.cc/150?img=7",name:"Grace"}] },
];

type ProjectStatus = "In Progress" | "Completed" | "Planning" | "On Hold";
const statusVariant: Record<ProjectStatus, "info" | "success" | "default" | "warning"> = {
  "In Progress": "info", "Completed": "success", "Planning": "default", "On Hold": "warning",
};

function progressColor(p: number) {
  if (p === 100) return "bg-[#4CCB98]";
  if (p >= 60)   return "bg-[#4CCBBF]";
  if (p >= 30)   return "bg-[#FCA90B]";
  return "bg-[#ED495D]";
}

interface ViewAllProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ViewAllProjectsModal({ isOpen, onClose }: ViewAllProjectsModalProps) {
  const [search, setSearch] = useState("");
  const filtered = allProjects.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="All Projects" size="xl"
      footer={<Button variant="ghost" size="sm" onClick={onClose}>Close</Button>}
    >
      {/* Search */}
      <div className="mb-4 flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-[#2D3640] dark:bg-[#2D3640]">
        <svg className="h-4 w-4 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="search"
          placeholder="Search projects…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-[#E2E8F0] dark:placeholder:text-[#64748B]"
        />
      </div>

      <div className="space-y-2 max-h-[55vh] overflow-y-auto pr-1">
        {filtered.map(p => (
          <div key={p.name} className="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50/50 p-3 dark:border-[#2D3640] dark:bg-[#2D3640]/30">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-medium text-slate-700 dark:text-[#CBD5E1]">{p.name}</p>
                <Badge variant={statusVariant[p.status]}>{p.status}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-32 overflow-hidden rounded-full bg-slate-200 dark:bg-[#2D3640]">
                  <div className={`h-full rounded-full ${progressColor(p.progress)}`} style={{ width: `${p.progress}%` }} />
                </div>
                <span className="text-xs text-slate-400">{p.progress}%</span>
              </div>
            </div>
            <div className="flex -space-x-2 shrink-0">
              {p.members.map(m => (
                <Avatar key={m.name} src={m.src} name={m.name} size="xs" className="ring-2 ring-white dark:ring-[#242B33]" />
              ))}
            </div>
            <p className="shrink-0 text-xs text-slate-400 dark:text-[#64748B]">{p.due}</p>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-slate-400">No projects match &quot;{search}&quot;</p>
        )}
      </div>
    </Modal>
  );
}

/* ── View All Tasks ───────────────────────────────────────────────────────── */
const allTasks = [
  { title: "Review pull request #204",          priority: "Critical" as const, done: false, assignee: "Alice" },
  { title: "Update onboarding flow design",     priority: "High"     as const, done: false, assignee: "Bob" },
  { title: "Write unit tests for auth module",  priority: "High"     as const, done: true,  assignee: "Carol" },
  { title: "Migrate database to Postgres 16",   priority: "Medium"   as const, done: false, assignee: "Dave" },
  { title: "Update README documentation",       priority: "Low"      as const, done: true,  assignee: "Eve" },
  { title: "Set up staging environment",        priority: "Medium"   as const, done: false, assignee: "Frank" },
  { title: "Implement dark mode for settings",  priority: "Low"      as const, done: false, assignee: "Grace" },
  { title: "Fix pagination bug on users page",  priority: "High"     as const, done: false, assignee: "Hank" },
  { title: "Add email notification service",    priority: "Medium"   as const, done: true,  assignee: "Iris" },
  { title: "Code review for payment module",    priority: "Critical" as const, done: false, assignee: "Jack" },
];

type Priority = "Critical" | "High" | "Medium" | "Low";
const priorityVariant: Record<Priority, "danger" | "warning" | "info" | "default"> = {
  Critical: "danger", High: "warning", Medium: "info", Low: "default",
};

interface ViewAllTasksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ViewAllTasksModal({ isOpen, onClose }: ViewAllTasksModalProps) {
  const [filter, setFilter] = useState<"all" | "pending" | "done">("all");
  const [search, setSearch] = useState("");

  const filtered = allTasks.filter(t => {
    const matchesFilter = filter === "all" || (filter === "done" ? t.done : !t.done);
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="All Tasks" size="lg"
      footer={<Button variant="ghost" size="sm" onClick={onClose}>Close</Button>}
    >
      {/* Filters */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-1 rounded-lg border border-slate-200 p-1 dark:border-[#2D3640]">
          {(["all", "pending", "done"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-md px-3 py-1 text-xs font-medium capitalize transition-colors cursor-pointer ${
                filter === f
                  ? "bg-[#4CCBBF] text-[#0A0D14]"
                  : "text-slate-500 hover:text-slate-700 dark:text-[#64748B] dark:hover:text-[#E2E8F0]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 dark:border-[#2D3640] dark:bg-[#2D3640]">
          <svg className="h-3.5 w-3.5 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            placeholder="Search tasks…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-36 bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-400 dark:text-[#E2E8F0] dark:placeholder:text-[#64748B]"
          />
        </div>
      </div>

      <div className="space-y-1.5 max-h-[50vh] overflow-y-auto pr-1">
        {filtered.map((task, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl border border-slate-100 px-4 py-3 dark:border-[#2D3640]">
            <div className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border-2 ${task.done ? "border-[#4CCB98] bg-[#4CCB98]" : "border-slate-300 dark:border-[#2D3640]"}`}>
              {task.done && (
                <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
                </svg>
              )}
            </div>
            <p className={`flex-1 text-sm ${task.done ? "line-through text-slate-400 dark:text-[#475569]" : "text-slate-700 dark:text-[#CBD5E1]"}`}>
              {task.title}
            </p>
            <span className="text-xs text-slate-400 dark:text-[#64748B]">{task.assignee}</span>
            <Badge variant={priorityVariant[task.priority]}>{task.priority}</Badge>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-slate-400">No tasks found</p>
        )}
      </div>
    </Modal>
  );
}
