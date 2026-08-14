"use client";

import { useState } from "react";
import { Modal, Button, Input, Select, Textarea, Checkbox } from "@/components";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddTaskModal({ isOpen, onClose }: AddTaskModalProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [assignees, setAssignees] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  function toggleAssignee(name: string) {
    setAssignees((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    // Simulate save delay
    setTimeout(() => {
      setSaving(false);
      onClose();
      setTitle(""); setPriority("medium"); setDueDate(""); setDescription(""); setAssignees([]);
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

        <Textarea
          label="Description"
          rows={3}
          placeholder="Optional details about this task…"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        {/* Assignee row */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-zinc-700 dark:text-[#E2E8F0]">Assign to</label>
          <div className="flex flex-wrap gap-2">
            {["Alice", "Bob", "Carol", "Dave", "Eve"].map(name => (
              <Checkbox
                key={name}
                label={name}
                checked={assignees.includes(name)}
                onChange={() => toggleAssignee(name)}
              />
            ))}
          </div>
        </div>
      </form>
    </Modal>
  );
}
