"use client";

import { useState, useMemo } from "react";
import {
  PageHeader,
  Button,
  Input,
  Select,
  Card,
  Badge,
  Avatar,
  Icon,
  Modal,
  Pagination,
} from "@/components";
import { useModal, usePagination } from "@/hooks";

// ---------- Mock Data ----------

interface MockUser {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Manager" | "Developer" | "Viewer";
  status: "Active" | "Inactive";
  joined: string;
  avatar?: string;
}

const mockUsers: MockUser[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah.chen@acme.io",
    role: "Admin",
    status: "Active",
    joined: "Jan 15, 2025",
  },
  {
    id: "2",
    name: "Marcus Johnson",
    email: "m.johnson@acme.io",
    role: "Developer",
    status: "Active",
    joined: "Feb 3, 2025",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "e.rodriguez@acme.io",
    role: "Manager",
    status: "Active",
    joined: "Mar 12, 2025",
  },
  {
    id: "4",
    name: "David Kim",
    email: "d.kim@acme.io",
    role: "Developer",
    status: "Inactive",
    joined: "Apr 8, 2025",
  },
  {
    id: "5",
    name: "Lisa Wang",
    email: "l.wang@acme.io",
    role: "Viewer",
    status: "Active",
    joined: "May 20, 2025",
  },
  {
    id: "6",
    name: "James Taylor",
    email: "j.taylor@acme.io",
    role: "Developer",
    status: "Active",
    joined: "Jun 1, 2025",
  },
  {
    id: "7",
    name: "Aisha Patel",
    email: "a.patel@acme.io",
    role: "Manager",
    status: "Active",
    joined: "Jun 18, 2025",
  },
  {
    id: "8",
    name: "Robert Lee",
    email: "r.lee@acme.io",
    role: "Viewer",
    status: "Inactive",
    joined: "Jul 5, 2025",
  },
];

const roleOptions = [
  { value: "", label: "All Roles" },
  { value: "Admin", label: "Admin" },
  { value: "Manager", label: "Manager" },
  { value: "Developer", label: "Developer" },
  { value: "Viewer", label: "Viewer" },
];

const roleBadgeVariant: Record<string, "danger" | "warning" | "info" | "default"> = {
  Admin: "danger",
  Manager: "warning",
  Developer: "info",
  Viewer: "default",
};

// ---------- Component ----------

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const inviteModal = useModal();

  // Filter users
  const filteredUsers = useMemo(() => {
    return mockUsers.filter((user) => {
      const matchesSearch =
        searchQuery === "" ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = roleFilter === "" || user.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [searchQuery, roleFilter]);

  // Pagination
  const pagination = usePagination({
    totalItems: filteredUsers.length,
    pageSize: 5,
  });

  const visibleUsers = filteredUsers.slice(
    pagination.startIndex,
    pagination.endIndex
  );

  // Reset to page 1 when filters change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    pagination.reset();
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRoleFilter(e.target.value);
    pagination.reset();
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Users"
        description="Manage team members, roles, and permissions"
        actions={
          <Button variant="primary" leftIcon={<Icon name="plus" size="sm" />} onClick={inviteModal.open}>
            Invite User
          </Button>
        }
      />

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1">
          <Input
            placeholder="Search by name or email..."
            leftAddon={<Icon name="search" size="sm" />}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="w-full sm:w-48">
          <Select
            options={roleOptions}
            value={roleFilter}
            onChange={handleRoleChange}
          />
        </div>
      </div>

      {/* Users Table */}
      <Card>
        <Card.Body className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-100 dark:border-[#2D3640]">
                  <th className="px-5 py-3 text-left font-medium text-zinc-500 dark:text-[#9FAEC1]">
                    User
                  </th>
                  <th className="px-5 py-3 text-left font-medium text-zinc-500 dark:text-[#9FAEC1]">
                    Role
                  </th>
                  <th className="px-5 py-3 text-left font-medium text-zinc-500 dark:text-[#9FAEC1]">
                    Status
                  </th>
                  <th className="px-5 py-3 text-left font-medium text-zinc-500 dark:text-[#9FAEC1]">
                    Joined
                  </th>
                  <th className="px-5 py-3 text-right font-medium text-zinc-500 dark:text-[#9FAEC1]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {visibleUsers.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-8 text-center text-zinc-400 dark:text-[#64748B]"
                    >
                      No users found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  visibleUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-zinc-50 last:border-0 dark:border-[#2D3640] hover:bg-zinc-50 dark:hover:bg-[#2A3441] transition-colors"
                    >
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar size="sm" name={user.name} />
                          <div>
                            <p className="font-medium text-zinc-900 dark:text-[#E8EDF2]">
                              {user.name}
                            </p>
                            <p className="text-xs text-zinc-500 dark:text-[#9FAEC1]">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <Badge variant={roleBadgeVariant[user.role]}>
                          {user.role}
                        </Badge>
                      </td>
                      <td className="px-5 py-3">
                        <Badge
                          variant={
                            user.status === "Active" ? "success" : "default"
                          }
                        >
                          {user.status}
                        </Badge>
                      </td>
                      <td className="px-5 py-3 text-zinc-600 dark:text-[#9FAEC1]">
                        {user.joined}
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="sm">
                            <Icon name="edit" size="sm" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Icon name="trash" size="sm" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={pagination.setPage}
          />
        </div>
      )}

      {/* Invite User Modal */}
      <Modal
        isOpen={inviteModal.isOpen}
        onClose={inviteModal.close}
        title="Invite User"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={inviteModal.close}>
              Cancel
            </Button>
            <Button variant="primary" onClick={inviteModal.close}>
              Send Invite
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Input label="Full Name" placeholder="John Doe" required />
          <Input
            label="Email Address"
            placeholder="john@example.com"
            type="email"
            required
          />
          <Select
            label="Role"
            options={[
              { value: "Developer", label: "Developer" },
              { value: "Manager", label: "Manager" },
              { value: "Viewer", label: "Viewer" },
            ]}
            placeholder="Select a role"
            required
          />
        </div>
      </Modal>
    </div>
  );
}
