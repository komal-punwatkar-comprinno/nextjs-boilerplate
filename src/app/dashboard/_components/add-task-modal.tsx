"use client";

import { useState } from "react";
import { Modal } from "@/components/modal";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Select } from "@/components/select";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddTaskModal({ isOpen, onClose }: AddTaskModalProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    // Simulate save delay
    setTimeout(() => {
      setSaving(false);
      onClose();
      setTitle(""); setPriority("medium"); setDueDate(""); setDescription("");
    }, 900);
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Task"
      size="md"
      footer={
        <>
          <Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
          <Button variant="primary" size="sm" isLoading={saving} onClick={handleSubmit}>
            Create Task
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Task title"
          placeholder="e.g. Review pull request #205"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Priority"
            value={priority}
            onChange={e => setPriority(e.target.value)}
            options={[
              { value: "critical", label: "Critical" },
              { value: "high",     label: "High" },
              { value: "medium",   label: "Medium" },
              { value: "low",      label: "Low" },
            ]}
          />
          <Input
            label="Due date"
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-zinc-700 dark:text-[#E2E8F0]">
            Description
          </label>
          <textarea
            rows={3}
            placeholder="Optional details about this task…"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full resize-none rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-zinc-900 dark:border-[#2D3640] dark:bg-[#2D3640] dark:text-[#E2E8F0] dark:placeholder:text-[#64748B] dark:focus:ring-[#4CCBBF] dark:focus:ring-offset-[#242B33]"
          />
        </div>

        {/* Assignee row */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-zinc-700 dark:text-[#E2E8F0]">Assign to</label>
          <div className="flex flex-wrap gap-2">
            {["Alice", "Bob", "Carol", "Dave", "Eve"].map(name => (
              <label key={name} className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 transition-colors hover:border-[#4CCBBF] hover:text-[#4CCBBF] dark:border-[#2D3640] dark:text-[#94A3B8]">
                <input type="checkbox" className="accent-[#4CCBBF]" />
                {name}
              </label>
            ))}
          </div>
        </div>
      </form>
    </Modal>
  );
}
