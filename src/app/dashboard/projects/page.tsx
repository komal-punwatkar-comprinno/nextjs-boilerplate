"use client";

import { useState, useMemo } from "react";
import {
  Button,
  Card,
  Badge,
  Avatar,
  Input,
  Select,
  Icon,
  Progress,
  Modal,
} from "@/components";
import { PageHeader } from "@/components";
import { useModal, useSearch } from "@/hooks";

// --- Mock Data ---

type ProjectStatus = "active" | "completed" | "on-hold";

interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  dueDate: string;
  team: { name: string; src?: string }[];
}

const MOCK_PROJECTS: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Complete overhaul of the company marketing website with new branding.",
    status: "active",
    progress: 72,
    dueDate: "2026-08-15",
    team: [
      { name: "Alice Martin" },
      { name: "Bob Chen" },
      { name: "Carol Davis" },
    ],
  },
  {
    id: "2",
    name: "Mobile App v2",
    description: "Build the next version of our iOS and Android mobile application.",
    status: "active",
    progress: 45,
    dueDate: "2026-09-30",
    team: [
      { name: "David Kim" },
      { name: "Eva Torres" },
    ],
  },
  {
    id: "3",
    name: "API Migration",
    description: "Migrate legacy REST endpoints to the new GraphQL gateway.",
    status: "completed",
    progress: 100,
    dueDate: "2026-07-01",
    team: [
      { name: "Frank Lee" },
      { name: "Grace Park" },
      { name: "Henry Wu" },
      { name: "Ivy Shah" },
    ],
  },
  {
    id: "4",
    name: "Analytics Dashboard",
    description: "Real-time analytics dashboard for tracking key performance metrics.",
    status: "on-hold",
    progress: 30,
    dueDate: "2026-10-20",
    team: [
      { name: "Jack Patel" },
      { name: "Karen Liu" },
    ],
  },
  {
    id: "5",
    name: "Payment Integration",
    description: "Integrate Stripe and PayPal for seamless checkout experience.",
    status: "active",
    progress: 88,
    dueDate: "2026-08-01",
    team: [
      { name: "Liam Brown" },
      { name: "Mia Johnson" },
      { name: "Noah Wilson" },
    ],
  },
  {
    id: "6",
    name: "Documentation Portal",
    description: "Build a public-facing documentation site with versioning support.",
    status: "completed",
    progress: 100,
    dueDate: "2026-06-15",
    team: [
      { name: "Olivia White" },
      { name: "Peter Zhang" },
    ],
  },
];

const STATUS_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
  { value: "on-hold", label: "On Hold" },
];

const STATUS_BADGE_MAP: Record<ProjectStatus, { variant: "success" | "warning" | "info"; label: string }> = {
  active: { variant: "success", label: "Active" },
  completed: { variant: "info", label: "Completed" },
  "on-hold": { variant: "warning", label: "On Hold" },
};

export default function ProjectsPage() {
  const { query, setQuery } = useSearch();
  const [statusFilter, setStatusFilter] = useState("all");
  const modal = useModal();

  // New project form state
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    status: "active",
    dueDate: "",
  });

  const filteredProjects = useMemo(() => {
    return MOCK_PROJECTS.filter((project) => {
      const matchesSearch =
        !query ||
        project.name.toLowerCase().includes(query.toLowerCase()) ||
        project.description.toLowerCase().includes(query.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || project.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [query, statusFilter]);

  const handleCreateProject = () => {
    // In a real app, you'd call a service here
    modal.close();
    setNewProject({ name: "", description: "", status: "active", dueDate: "" });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Projects"
        description="Manage and track all your team projects"
        actions={
          <Button
            leftIcon={<Icon name="plus" size="sm" />}
            onClick={modal.open}
          >
            New Project
          </Button>
        }
      />

      {/* Filter Row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1">
          <Input
            placeholder="Search projects..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            leftAddon={<Icon name="search" size="sm" />}
          />
        </div>
        <div className="w-full sm:w-48">
          <Select
            label="Status"
            options={STATUS_OPTIONS}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          />
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <Card>
          <Card.Body className="py-12 text-center">
            <p className="text-zinc-500 dark:text-[#9FAEC1]">
              No projects found matching your criteria.
            </p>
          </Card.Body>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {filteredProjects.map((project) => {
            const statusInfo = STATUS_BADGE_MAP[project.status];
            return (
              <Card key={project.id}>
                <Card.Header className="flex items-center justify-between">
                  <div className="flex items-center justify-between w-full">
                    <h3 className="font-semibold text-zinc-900 dark:text-[#E8EDF2]">
                      {project.name}
                    </h3>
                    <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
                  </div>
                </Card.Header>
                <Card.Body className="space-y-4">
                  <p className="truncate text-sm text-zinc-600 dark:text-[#9FAEC1]">
                    {project.description}
                  </p>

                  {/* Progress */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-[#9FAEC1]">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} />
                  </div>

                  {/* Due date & team */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-500 dark:text-[#9FAEC1]">
                      Due: {new Date(project.dueDate).toLocaleDateString()}
                    </span>
                    <div className="flex -space-x-2">
                      {project.team.slice(0, 4).map((member, idx) => (
                        <Avatar
                          key={idx}
                          name={member.name}
                          size="xs"
                          className="ring-2 ring-white dark:ring-[#242B33]"
                        />
                      ))}
                      {project.team.length > 4 && (
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-zinc-200 text-[10px] font-medium text-zinc-600 ring-2 ring-white dark:bg-[#353B46] dark:text-[#9FAEC1] dark:ring-[#242B33]">
                          +{project.team.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </Card.Body>
                <Card.Footer className="flex items-center justify-end gap-2">
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                  <Button variant="secondary" size="sm">
                    Edit
                  </Button>
                </Card.Footer>
              </Card>
            );
          })}
        </div>
      )}

      {/* New Project Modal */}
      <Modal
        isOpen={modal.isOpen}
        onClose={modal.close}
        title="New Project"
        footer={
          <>
            <Button variant="secondary" onClick={modal.close}>
              Cancel
            </Button>
            <Button onClick={handleCreateProject}>Create Project</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="Project Name"
            placeholder="Enter project name"
            value={newProject.name}
            onChange={(e) =>
              setNewProject((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <Input
            label="Description"
            placeholder="Brief project description"
            value={newProject.description}
            onChange={(e) =>
              setNewProject((prev) => ({ ...prev, description: e.target.value }))
            }
          />
          <Select
            label="Status"
            options={[
              { value: "active", label: "Active" },
              { value: "on-hold", label: "On Hold" },
            ]}
            value={newProject.status}
            onChange={(e) =>
              setNewProject((prev) => ({ ...prev, status: e.target.value }))
            }
          />
          <Input
            label="Due Date"
            type="date"
            value={newProject.dueDate}
            onChange={(e) =>
              setNewProject((prev) => ({ ...prev, dueDate: e.target.value }))
            }
          />
        </div>
      </Modal>
    </div>
  );
}
