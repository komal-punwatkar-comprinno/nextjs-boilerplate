"use client";

import { useState } from "react";
import { DataTable, Badge } from "@/components";
import { SectionWrapper } from "./section-wrapper";

interface User {
  name: string;
  email: string;
  role: string;
  status: string;
}

const users: User[] = [
  { name: "Sarah Johnson", email: "sarah@example.com", role: "Admin", status: "Active" },
  { name: "Michael Chen", email: "michael@example.com", role: "Editor", status: "Active" },
  { name: "Emily Davis", email: "emily@example.com", role: "Viewer", status: "Inactive" },
  { name: "James Wilson", email: "james@example.com", role: "Editor", status: "Active" },
  { name: "Olivia Brown", email: "olivia@example.com", role: "Admin", status: "Active" },
  { name: "Daniel Lee", email: "daniel@example.com", role: "Viewer", status: "Pending" },
  { name: "Sophia Martinez", email: "sophia@example.com", role: "Editor", status: "Active" },
  { name: "Liam Taylor", email: "liam@example.com", role: "Viewer", status: "Inactive" },
  { name: "Ava Anderson", email: "ava@example.com", role: "Admin", status: "Active" },
  { name: "Noah Thomas", email: "noah@example.com", role: "Editor", status: "Pending" },
  { name: "Isabella Garcia", email: "isabella@example.com", role: "Viewer", status: "Active" },
  { name: "Ethan Robinson", email: "ethan@example.com", role: "Editor", status: "Active" },
];

const statusVariant: Record<string, "success" | "danger" | "warning"> = {
  Active: "success",
  Inactive: "danger",
  Pending: "warning",
};

const columns = [
  { accessor: "name", header: "Name", sortable: true },
  { accessor: "email", header: "Email", sortable: true },
  { accessor: "role", header: "Role", sortable: true },
  {
    accessor: "status",
    header: "Status",
    sortable: true,
    render: (value: unknown) => (
      <Badge variant={statusVariant[value as string] || "default"}>
        {value as string}
      </Badge>
    ),
  },
];

export function DatatablesSection() {
  const [page, setPage] = useState(1);
  const [sortedData, setSortedData] = useState(users);
  const pageSize = 5;

  const handleSort = (accessor: string, direction: "asc" | "desc") => {
    const sorted = [...users].sort((a, b) => {
      const aVal = a[accessor as keyof User];
      const bVal = b[accessor as keyof User];
      if (aVal < bVal) return direction === "asc" ? -1 : 1;
      if (aVal > bVal) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setSortedData(sorted);
    setPage(1);
  };

  const paginatedData = sortedData.slice((page - 1) * pageSize, page * pageSize);

  return (
    <SectionWrapper id="datatables" title="Data Tables">
      <div className="space-y-8">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Sortable with Pagination
          </p>
          <p className="mb-4 text-sm text-zinc-600 dark:text-[#9FAEC1]">
            Click column headers to sort. Pagination is controlled with page state.
          </p>
          <DataTable
            columns={columns}
            data={paginatedData}
            onSort={handleSort}
            pagination={{
              page,
              pageSize,
              total: sortedData.length,
              onPageChange: setPage,
            }}
          />
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Features
          </p>
          <ul className="list-inside list-disc space-y-1 text-sm text-zinc-600 dark:text-[#9FAEC1]">
            <li>Sortable columns with direction indicator</li>
            <li>Custom cell renderers via render prop</li>
            <li>Built-in pagination controls</li>
            <li>Loading skeleton state</li>
            <li>Empty state message</li>
            <li>Row click handler</li>
          </ul>
        </div>
      </div>
    </SectionWrapper>
  );
}
