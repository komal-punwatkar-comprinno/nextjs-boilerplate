"use client";

import { StickyHeaderTable, Badge } from "@/components";
import { SectionWrapper } from "./section-wrapper";

interface Employee {
  id: string;
  name: string;
  department: string;
  position: string;
  location: string;
  status: string;
}

const employees: Employee[] = [
  { id: "EMP-001", name: "Alice Cooper", department: "Engineering", position: "Senior Developer", location: "San Francisco", status: "Active" },
  { id: "EMP-002", name: "Bob Martinez", department: "Design", position: "UI Designer", location: "New York", status: "Active" },
  { id: "EMP-003", name: "Carol White", department: "Marketing", position: "Content Lead", location: "London", status: "On Leave" },
  { id: "EMP-004", name: "David Kim", department: "Engineering", position: "Backend Engineer", location: "Seoul", status: "Active" },
  { id: "EMP-005", name: "Eva Johnson", department: "Product", position: "Product Manager", location: "Berlin", status: "Active" },
  { id: "EMP-006", name: "Frank Lee", department: "Engineering", position: "DevOps Engineer", location: "Toronto", status: "Active" },
  { id: "EMP-007", name: "Grace Park", department: "Sales", position: "Account Executive", location: "Chicago", status: "Active" },
  { id: "EMP-008", name: "Henry Adams", department: "Engineering", position: "Frontend Developer", location: "Austin", status: "Remote" },
  { id: "EMP-009", name: "Irene Costa", department: "HR", position: "HR Manager", location: "Lisbon", status: "Active" },
  { id: "EMP-010", name: "Jack Thompson", department: "Finance", position: "Financial Analyst", location: "Sydney", status: "Active" },
  { id: "EMP-011", name: "Karen Patel", department: "Engineering", position: "QA Engineer", location: "Mumbai", status: "Active" },
  { id: "EMP-012", name: "Leo Rossi", department: "Design", position: "UX Researcher", location: "Milan", status: "On Leave" },
  { id: "EMP-013", name: "Maria Santos", department: "Marketing", position: "SEO Specialist", location: "Sao Paulo", status: "Active" },
  { id: "EMP-014", name: "Nathan Clark", department: "Engineering", position: "Staff Engineer", location: "Seattle", status: "Active" },
  { id: "EMP-015", name: "Olivia Hughes", department: "Product", position: "Product Designer", location: "Dublin", status: "Remote" },
];

const statusVariant: Record<string, "success" | "warning" | "info"> = {
  Active: "success",
  "On Leave": "warning",
  Remote: "info",
};

const columns = [
  { accessor: "id", header: "ID", width: "100px" },
  { accessor: "name", header: "Name", width: "160px" },
  { accessor: "department", header: "Department", width: "140px" },
  { accessor: "position", header: "Position", width: "180px" },
  { accessor: "location", header: "Location", width: "140px" },
  {
    accessor: "status",
    header: "Status",
    width: "120px",
    render: (value: unknown) => (
      <Badge variant={statusVariant[value as string] || "default"}>
        {value as string}
      </Badge>
    ),
  },
];

export function StickyHeaderSection() {
  return (
    <SectionWrapper id="sticky-header" title="Sticky Header Table">
      <div className="space-y-8">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Height-Constrained with Sticky Header
          </p>
          <p className="mb-4 text-sm text-zinc-600 dark:text-[#9FAEC1]">
            Scroll the table body below — the header row stays fixed at the top. Useful for large datasets
            in confined spaces.
          </p>
          <StickyHeaderTable
            columns={columns}
            data={employees}
            maxHeight="320px"
          />
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Features
          </p>
          <ul className="list-inside list-disc space-y-1 text-sm text-zinc-600 dark:text-[#9FAEC1]">
            <li>Sticky header row during vertical scroll</li>
            <li>Configurable maxHeight</li>
            <li>Custom column widths</li>
            <li>Custom cell renderers</li>
            <li>Loading skeleton state</li>
            <li>Row click handler</li>
          </ul>
        </div>
      </div>
    </SectionWrapper>
  );
}
