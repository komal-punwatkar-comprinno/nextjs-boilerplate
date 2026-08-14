"use client";

import { useState } from "react";
import { Avatar, Badge, Button } from "@/components";
import { SectionWrapper } from "./section-wrapper";
import type { BadgeVariant } from "@/components";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive" | "Pending" | "Suspended";
  avatarImg: string;
}

const users: User[] = [
  { id: 1, name: "Alice Brown", email: "alice@example.com", role: "Admin", status: "Active", avatarImg: "https://i.pravatar.cc/150?img=1" },
  { id: 2, name: "Bob Kumar", email: "bob@example.com", role: "Developer", status: "Active", avatarImg: "https://i.pravatar.cc/150?img=2" },
  { id: 3, name: "Carol Lee", email: "carol@example.com", role: "Designer", status: "Pending", avatarImg: "https://i.pravatar.cc/150?img=5" },
  { id: 4, name: "Dave Mori", email: "dave@example.com", role: "Manager", status: "Inactive", avatarImg: "https://i.pravatar.cc/150?img=7" },
  { id: 5, name: "Eve Thompson", email: "eve@example.com", role: "Developer", status: "Active", avatarImg: "https://i.pravatar.cc/150?img=9" },
  { id: 6, name: "Frank Diaz", email: "frank@example.com", role: "Viewer", status: "Suspended", avatarImg: "https://i.pravatar.cc/150?img=11" },
];

const statusVariant: Record<User["status"], BadgeVariant> = {
  Active: "success",
  Inactive: "default",
  Pending: "warning",
  Suspended: "danger",
};

const roleVariant: Record<string, BadgeVariant> = {
  Admin: "info",
  Developer: "default",
  Designer: "default",
  Manager: "info",
  Viewer: "default",
};

export function TableSection() {
  const [selected, setSelected] = useState<Set<number>>(new Set());

  function toggleAll() {
    if (selected.size === users.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(users.map((u) => u.id)));
    }
  }

  function toggleRow(id: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const allChecked = selected.size === users.length;
  const someChecked = selected.size > 0 && !allChecked;

  return (
    <SectionWrapper id="tables" title="Data Table">
      <div className="space-y-3">
        {/* Toolbar */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {selected.size > 0
              ? `${selected.size} row${selected.size > 1 ? "s" : ""} selected`
              : `${users.length} users`}
          </p>
          <div className="flex gap-2">
            {selected.size > 0 && (
              <Button variant="danger" size="sm">
                Delete selected
              </Button>
            )}
            <Button variant="primary" size="sm">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add User
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 dark:border-slate-700 dark:bg-slate-700/50">
                <th className="px-4 py-3">
                  <input
                    type="checkbox"
                    aria-label="Select all"
                    checked={allChecked}
                    ref={(el) => { if (el) el.indeterminate = someChecked; }}
                    onChange={toggleAll}
                    className="h-4 w-4 rounded accent-indigo-600"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-300">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-300">Email</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-300">Role</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-300">Status</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-600/60">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className={`transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/40 ${
                    selected.has(user.id) ? "bg-indigo-50/40 dark:bg-indigo-900/20" : ""
                  }`}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      aria-label={`Select ${user.name}`}
                      checked={selected.has(user.id)}
                      onChange={() => toggleRow(user.id)}
                      className="h-4 w-4 rounded accent-indigo-600"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={user.avatarImg}
                        alt={user.name}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      <span className="font-medium text-slate-800 dark:text-slate-100">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{user.email}</td>
                  <td className="px-4 py-3">
                    <Badge variant={roleVariant[user.role] ?? "default"}>{user.role}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={statusVariant[user.status]}>{user.status}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="danger" size="sm">Remove</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SectionWrapper>
  );
}

