import type { Metadata } from "next";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Avatar } from "@/components/avatar";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Overview of your workspace.",
};

const statCards = [
  {
    label: "Total Projects",
    value: "6",
    trend: "+2 this month",
    trendUp: true,
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    ),
  },
  {
    label: "Total Tasks",
    value: "132",
    trend: "+12% this month",
    trendUp: true,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    label: "Team Members",
    value: "8",
    trend: "-1 this month",
    trendUp: false,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: "Productivity",
    value: "76%",
    trend: "+4% this month",
    trendUp: true,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
];

const projects = [
  {
    name: "CRM Redesign",
    progress: 82,
    status: "In Progress" as const,
    members: [
      { src: "https://i.pravatar.cc/150?img=1", name: "Alice" },
      { src: "https://i.pravatar.cc/150?img=2", name: "Bob" },
      { src: "https://i.pravatar.cc/150?img=3", name: "Carol" },
    ],
    due: "Jul 30",
  },
  {
    name: "Mobile App v2",
    progress: 55,
    status: "In Progress" as const,
    members: [
      { src: "https://i.pravatar.cc/150?img=4", name: "Dave" },
      { src: "https://i.pravatar.cc/150?img=5", name: "Eve" },
    ],
    due: "Aug 15",
  },
  {
    name: "API Gateway",
    progress: 100,
    status: "Completed" as const,
    members: [
      { src: "https://i.pravatar.cc/150?img=6", name: "Frank" },
      { src: "https://i.pravatar.cc/150?img=7", name: "Grace" },
    ],
    due: "Jul 10",
  },
  {
    name: "Analytics Dashboard",
    progress: 20,
    status: "Planning" as const,
    members: [
      { src: "https://i.pravatar.cc/150?img=8", name: "Hank" },
      { src: "https://i.pravatar.cc/150?img=9", name: "Iris" },
      { src: "https://i.pravatar.cc/150?img=10", name: "Jack" },
    ],
    due: "Sep 1",
  },
  {
    name: "Auth Service",
    progress: 40,
    status: "On Hold" as const,
    members: [
      { src: "https://i.pravatar.cc/150?img=11", name: "Karen" },
    ],
    due: "Aug 20",
  },
];

type ProjectStatus = "In Progress" | "Completed" | "Planning" | "On Hold";

const statusVariant: Record<ProjectStatus, "info" | "success" | "default" | "warning"> = {
  "In Progress": "info",
  "Completed": "success",
  "Planning": "default",
  "On Hold": "warning",
};

const activities = [
  { icon: "🎉", text: "Project CRM Redesign reached 80% completion", time: "2 minutes ago", color: "bg-emerald-100" },
  { icon: "👤", text: "Grace Williams joined the Mobile App team", time: "1 hour ago", color: "bg-violet-100" },
  { icon: "✅", text: "API Gateway project marked as completed", time: "3 hours ago", color: "bg-indigo-100" },
  { icon: "💬", text: "New comment on Analytics Dashboard spec", time: "5 hours ago", color: "bg-amber-100" },
  { icon: "🔔", text: "Sprint review scheduled for tomorrow 10 AM", time: "Yesterday", color: "bg-blue-100" },
];

const tasks = [
  { title: "Review pull request #204", priority: "Critical" as const, done: false },
  { title: "Update onboarding flow design", priority: "High" as const, done: false },
  { title: "Write unit tests for auth module", priority: "High" as const, done: true },
  { title: "Migrate database to Postgres 16", priority: "Medium" as const, done: false },
  { title: "Update README documentation", priority: "Low" as const, done: true },
  { title: "Set up staging environment", priority: "Medium" as const, done: false },
];

type Priority = "Critical" | "High" | "Medium" | "Low";

const priorityVariant: Record<Priority, "danger" | "warning" | "info" | "default"> = {
  Critical: "danger",
  High: "warning",
  Medium: "info",
  Low: "default",
};

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function getFormattedDate(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function DashboardPage() {
  const greeting = getGreeting();
  const today = getFormattedDate();

  return (
    <div className="space-y-6">
      {/* Greeting Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            {greeting}, User 👋
          </h1>
          <p className="mt-0.5 text-sm text-slate-500">{today}</p>
        </div>
        <Button variant="primary" size="sm">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          New Project
        </Button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => (
          <Card key={card.label} className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{card.label}</p>
                <p className="mt-2 text-3xl font-bold text-slate-800">{card.value}</p>
              </div>
              <div className={`rounded-xl p-3 ${card.iconBg}`}>
                <span className={card.iconColor}>{card.icon}</span>
              </div>
            </div>
            <div className="mt-3">
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  card.trendUp
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {card.trendUp ? "↑" : "↓"} {card.trend}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Active Projects Table */}
      <Card>
        <Card.Header>
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-800">Active Projects</h2>
            <Button variant="ghost" size="sm">View all</Button>
          </div>
        </Card.Header>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Project</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Progress</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Team</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Due Date</th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projects.map((project) => (
                <tr key={project.name} className="transition-colors hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-800">{project.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-32 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full transition-all ${
                            project.progress === 100
                              ? "bg-emerald-500"
                              : project.progress >= 60
                              ? "bg-indigo-500"
                              : project.progress >= 30
                              ? "bg-amber-500"
                              : "bg-red-400"
                          }`}
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-500">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={statusVariant[project.status]}>{project.status}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex -space-x-2">
                      {project.members.map((m) => (
                        <Avatar key={m.name} src={m.src} name={m.name} size="sm" className="ring-2 ring-white" />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{project.due}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">View</Button>
                      <Button variant="secondary" size="sm">Edit</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Bottom 2-column section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Activity Log */}
        <Card>
          <Card.Header>
            <h2 className="text-base font-semibold text-slate-800">Activity Log</h2>
          </Card.Header>
          <Card.Body className="space-y-0 px-6 py-2">
            {activities.map((activity, i) => (
              <div key={i} className="flex gap-4 py-3">
                <div className="relative flex flex-col items-center">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-full text-lg ${activity.color} shrink-0`}>
                    {activity.icon}
                  </span>
                  {i < activities.length - 1 && (
                    <div className="mt-1 h-full w-px bg-slate-100" />
                  )}
                </div>
                <div className="pb-3">
                  <p className="text-sm text-slate-700">{activity.text}</p>
                  <p className="mt-0.5 text-xs text-slate-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </Card.Body>
        </Card>

        {/* My Tasks */}
        <Card>
          <Card.Header>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-800">My Tasks</h2>
              <Badge variant="info">{tasks.filter((t) => !t.done).length} pending</Badge>
            </div>
          </Card.Header>
          <Card.Body className="space-y-0 px-6 py-2">
            {tasks.map((task, i) => (
              <div
                key={i}
                className="flex items-center gap-3 border-b border-slate-50 py-3 last:border-0"
              >
                <div
                  className={`h-4 w-4 shrink-0 rounded ${
                    task.done
                      ? "border-2 border-emerald-500 bg-emerald-500"
                      : "border-2 border-slate-300"
                  } flex items-center justify-center`}
                >
                  {task.done && (
                    <svg className="h-2.5 w-2.5 text-white" fill="currentColor" viewBox="0 0 12 12">
                      <path d="M10 3L5 8.5 2 5.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <p className={`flex-1 text-sm ${task.done ? "line-through text-slate-400" : "text-slate-700"}`}>
                  {task.title}
                </p>
                <Badge variant={priorityVariant[task.priority]}>{task.priority}</Badge>
              </div>
            ))}
          </Card.Body>
          <Card.Footer>
            <Button variant="ghost" size="sm" className="w-full">
              View all tasks
            </Button>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
}
