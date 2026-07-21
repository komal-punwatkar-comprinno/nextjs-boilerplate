"use client";

import { useState } from "react";
import { Badge, Button, Card, Avatar } from "@/components";
import { AddTaskModal } from "./_components/add-task-modal";
import { EditProjectModal, type ProjectRow } from "./_components/edit-project-modal";
import { ViewAllProjectsModal, ViewAllTasksModal } from "./_components/view-all-modal";

/* ─── Icons ─────────────────────────────────────────────────────────────── */
function IconFolder({ className = "h-5 w-5" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  );
}
function IconClipboard({ className = "h-5 w-5" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  );
}
function IconUsers({ className = "h-5 w-5" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
function IconTrend({ className = "h-5 w-5" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );
}
function IconPlus({ className = "h-4 w-4" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
}

/* ─── Static data ────────────────────────────────────────────────────────── */
const statCards = [
  { label: "Total Projects", value: "6",   trend: "+2 this month",  trendUp: true,  icon: <IconFolder /> },
  { label: "Total Tasks",    value: "132", trend: "+12% this month", trendUp: true,  icon: <IconClipboard /> },
  { label: "Team Members",   value: "8",   trend: "-1 this month",  trendUp: false, icon: <IconUsers /> },
  { label: "Productivity",   value: "76%", trend: "+4% this month", trendUp: true,  icon: <IconTrend /> },
];

const initialProjects: ProjectRow[] = [
  { name: "CRM Redesign",        progress: 82,  status: "In Progress", due: "Jul 30" },
  { name: "Mobile App v2",       progress: 55,  status: "In Progress", due: "Aug 15" },
  { name: "API Gateway",         progress: 100, status: "Completed",   due: "Jul 10" },
  { name: "Analytics Dashboard", progress: 20,  status: "Planning",    due: "Sep 1"  },
  { name: "Auth Service",        progress: 40,  status: "On Hold",     due: "Aug 20" },
];

const projectMembers: Record<string, { src: string; name: string }[]> = {
  "CRM Redesign":        [{ src:"https://i.pravatar.cc/150?img=1",name:"Alice"  },{ src:"https://i.pravatar.cc/150?img=2",name:"Bob"  },{ src:"https://i.pravatar.cc/150?img=3",name:"Carol" }],
  "Mobile App v2":       [{ src:"https://i.pravatar.cc/150?img=4",name:"Dave"   },{ src:"https://i.pravatar.cc/150?img=5",name:"Eve"  }],
  "API Gateway":         [{ src:"https://i.pravatar.cc/150?img=6",name:"Frank"  },{ src:"https://i.pravatar.cc/150?img=7",name:"Grace"}],
  "Analytics Dashboard": [{ src:"https://i.pravatar.cc/150?img=8",name:"Hank"   },{ src:"https://i.pravatar.cc/150?img=9",name:"Iris" },{ src:"https://i.pravatar.cc/150?img=10",name:"Jack"}],
  "Auth Service":        [{ src:"https://i.pravatar.cc/150?img=11",name:"Karen" }],
};

type ProjectStatus = "In Progress" | "Completed" | "Planning" | "On Hold";
const statusVariant: Record<ProjectStatus, "info" | "success" | "default" | "warning"> = {
  "In Progress": "info", "Completed": "success", "Planning": "default", "On Hold": "warning",
};

const activities = [
  { text: "Project CRM Redesign reached 80% completion", time: "2 min ago",   dot: "bg-[#4CCB98]" },
  { text: "Grace Williams joined the Mobile App team",   time: "1 hour ago",  dot: "bg-[#4CCBBF]" },
  { text: "API Gateway project marked as completed",     time: "3 hours ago", dot: "bg-[#4CCB98]" },
  { text: "New comment on Analytics Dashboard spec",     time: "5 hours ago", dot: "bg-[#FCA90B]" },
  { text: "Sprint review scheduled for tomorrow 10 AM",  time: "Yesterday",   dot: "bg-[#94A3B8]" },
];

const initialTasks = [
  { title: "Review pull request #204",         priority: "Critical" as const, done: false },
  { title: "Update onboarding flow design",    priority: "High"     as const, done: false },
  { title: "Write unit tests for auth module", priority: "High"     as const, done: true  },
  { title: "Migrate database to Postgres 16",  priority: "Medium"   as const, done: false },
  { title: "Update README documentation",      priority: "Low"      as const, done: true  },
  { title: "Set up staging environment",       priority: "Medium"   as const, done: false },
];

type Priority = "Critical" | "High" | "Medium" | "Low";
const priorityVariant: Record<Priority, "danger" | "warning" | "info" | "default"> = {
  Critical: "danger", High: "warning", Medium: "info", Low: "default",
};

function progressColor(p: number) {
  if (p === 100) return "bg-[#4CCB98]";
  if (p >= 60)   return "bg-[#4CCBBF]";
  if (p >= 30)   return "bg-[#FCA90B]";
  return "bg-[#ED495D]";
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}
function getFormattedDate() {
  return new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function DashboardPage() {
  const greeting = getGreeting();
  const today    = getFormattedDate();

  // Tasks state — togglable checkboxes
  const [tasks, setTasks] = useState(initialTasks);
  function toggleTask(i: number) {
    setTasks(prev => prev.map((t, idx) => idx === i ? { ...t, done: !t.done } : t));
  }

  // Modal state
  const [addTaskOpen,       setAddTaskOpen]       = useState(false);
  const [editProjectOpen,   setEditProjectOpen]   = useState(false);
  const [editingProject,    setEditingProject]    = useState<ProjectRow | null>(null);
  const [viewProjectsOpen,  setViewProjectsOpen]  = useState(false);
  const [viewTasksOpen,     setViewTasksOpen]     = useState(false);

  function openEditProject(project: ProjectRow) {
    setEditingProject(project);
    setEditProjectOpen(true);
  }

  return (
    <>
      {/* ── Modals ─────────────────────────────────────────────────────── */}
      <AddTaskModal        isOpen={addTaskOpen}      onClose={() => setAddTaskOpen(false)} />
      <EditProjectModal    isOpen={editProjectOpen}  onClose={() => setEditProjectOpen(false)} project={editingProject} />
      <ViewAllProjectsModal isOpen={viewProjectsOpen} onClose={() => setViewProjectsOpen(false)} />
      <ViewAllTasksModal   isOpen={viewTasksOpen}    onClose={() => setViewTasksOpen(false)} />

      <div className="space-y-5">

        {/* ── Greeting ───────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-800 dark:text-[#E2E8F0]">{greeting}, User 👋</h1>
            <p className="mt-0.5 text-sm text-slate-400 dark:text-[#64748B]">{today}</p>
          </div>
          <Button variant="primary" size="sm" onClick={() => setAddTaskOpen(true)}>
            <IconPlus />
            New Project
          </Button>
        </div>

        {/* ── Stat cards ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {statCards.map((card) => (
            <div key={card.label} className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 dark:border-[#2D3640] dark:bg-[#242B33]">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 dark:bg-[#2D3640] dark:text-[#94A3B8]">
                {card.icon}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-slate-400 dark:text-[#64748B]">{card.label}</p>
                <p className="mt-0.5 text-2xl font-bold text-slate-800 dark:text-[#E2E8F0]">{card.value}</p>
                <p className={`mt-0.5 text-xs font-medium ${card.trendUp ? "text-[#4CCB98]" : "text-[#ED495D]"}`}>
                  {card.trendUp ? "↑" : "↓"} {card.trend}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Active Projects table ───────────────────────────────────────── */}
        <Card>
          <Card.Header>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-slate-800 dark:text-[#E2E8F0]">Active Projects</h2>
                <p className="text-xs text-slate-400 dark:text-[#64748B]">5 projects total</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setViewProjectsOpen(true)}>
                View all
              </Button>
            </div>
          </Card.Header>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/60 dark:border-[#2D3640] dark:bg-[#2D3640]/40">
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-[#64748B]">Project</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-[#64748B]">Progress</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-[#64748B]">Status</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-[#64748B]">Team</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-[#64748B]">Due Date</th>
                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-[#64748B]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-[#2D3640]/60">
                {initialProjects.map((project) => (
                  <tr key={project.name} className="transition-colors hover:bg-slate-50/80 dark:hover:bg-[#2D3640]/30">
                    <td className="px-5 py-3.5 font-medium text-slate-700 dark:text-[#CBD5E1]">{project.name}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="h-1.5 w-28 overflow-hidden rounded-full bg-slate-100 dark:bg-[#2D3640]">
                          <div className={`h-full rounded-full transition-all ${progressColor(project.progress)}`} style={{ width: `${project.progress}%` }} />
                        </div>
                        <span className="text-xs text-slate-400 dark:text-[#64748B]">{project.progress}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge variant={statusVariant[project.status as ProjectStatus]}>{project.status}</Badge>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex -space-x-2">
                        {(projectMembers[project.name] ?? []).map((m) => (
                          <Avatar key={m.name} src={m.src} name={m.name} size="sm" className="ring-2 ring-white dark:ring-[#242B33]" />
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-400 dark:text-[#64748B]">{project.due}</td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button variant="ghost" size="sm" onClick={() => setViewProjectsOpen(true)}>View</Button>
                        <Button variant="secondary" size="sm" onClick={() => openEditProject(project)}>Edit</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* ── Bottom two-column ───────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

          {/* Activity Log */}
          <Card>
            <Card.Header>
              <h2 className="text-sm font-semibold text-slate-800 dark:text-[#E2E8F0]">Activity Log</h2>
            </Card.Header>
            <Card.Body className="px-5 py-1">
              {activities.map((a, i) => (
                <div key={i} className="flex items-start gap-3 py-3">
                  <div className="relative flex flex-col items-center">
                    <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${a.dot}`} />
                    {i < activities.length - 1 && <div className="mt-1 h-full w-px bg-slate-100 dark:bg-[#2D3640]" />}
                  </div>
                  <div className="pb-1">
                    <p className="text-sm text-slate-600 dark:text-[#CBD5E1]">{a.text}</p>
                    <p className="mt-0.5 text-xs text-slate-400 dark:text-[#64748B]">{a.time}</p>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>

          {/* My Tasks */}
          <Card>
            <Card.Header>
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-800 dark:text-[#E2E8F0]">My Tasks</h2>
                <div className="flex items-center gap-2">
                  <Badge variant="info">{tasks.filter(t => !t.done).length} pending</Badge>
                  <Button variant="ghost" size="sm" onClick={() => setAddTaskOpen(true)}>
                    <IconPlus className="h-3.5 w-3.5" />
                    Add
                  </Button>
                </div>
              </div>
            </Card.Header>
            <Card.Body className="px-5 py-1">
              {tasks.map((task, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 border-b border-slate-50 py-3 last:border-0 dark:border-[#2D3640]/50"
                >
                  {/* Clickable checkbox */}
                  <button
                    type="button"
                    onClick={() => toggleTask(i)}
                    className={`flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded border-2 transition-colors ${
                      task.done ? "border-[#4CCB98] bg-[#4CCB98]" : "border-slate-200 hover:border-[#4CCB98] dark:border-[#2D3640] dark:hover:border-[#4CCB98]"
                    }`}
                  >
                    {task.done && (
                      <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
                      </svg>
                    )}
                  </button>
                  <p className={`flex-1 text-sm transition-all ${task.done ? "line-through text-slate-300 dark:text-[#475569]" : "text-slate-600 dark:text-[#CBD5E1]"}`}>
                    {task.title}
                  </p>
                  <Badge variant={priorityVariant[task.priority]}>{task.priority}</Badge>
                </div>
              ))}
            </Card.Body>
            <Card.Footer>
              <Button variant="ghost" size="sm" className="w-full" onClick={() => setViewTasksOpen(true)}>
                View all tasks
              </Button>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </>
  );
}
