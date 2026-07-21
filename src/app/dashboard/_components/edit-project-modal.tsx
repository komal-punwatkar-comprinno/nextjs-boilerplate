"use client";

import { useState, useEffect } from "react";
import { Modal, Button, Input, Select } from "@/components";

export interface ProjectRow {
  name: string;
  progress: number;
  status: string;
  due: string;
}

interface EditProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectRow | null;
}

export function EditProjectModal({ isOpen, onClose, project }: EditProjectModalProps) {
  const [name, setName]         = useState("");
  const [status, setStatus]     = useState("In Progress");
  const [due, setDue]           = useState("");
  const [progress, setProgress] = useState(0);
  const [saving, setSaving]     = useState(false);

  useEffect(() => {
    if (project) {
      setName(project.name);
      setStatus(project.status);
      setDue(project.due);
      setProgress(project.progress);
    }
  }, [project]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => { setSaving(false); onClose(); }, 900);
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Project"
      size="md"
      footer={
        <>
          <Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
          <Button variant="primary" size="sm" isLoading={saving} onClick={handleSubmit}>
            Save changes
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Project name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Status"
            value={status}
            onChange={e => setStatus(e.target.value)}
            options={[
              { value: "In Progress", label: "In Progress" },
              { value: "Planning",    label: "Planning" },
              { value: "On Hold",     label: "On Hold" },
              { value: "Completed",   label: "Completed" },
            ]}
          />
          <Input
            label="Due date"
            placeholder="e.g. Aug 30"
            value={due}
            onChange={e => setDue(e.target.value)}
          />
        </div>

        {/* Progress slider */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-[#E2E8F0]">
            Progress — <span className="text-[#4CCBBF] font-semibold">{progress}%</span>
          </label>
          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            onChange={e => setProgress(Number(e.target.value))}
            className="w-full accent-[#4CCBBF]"
          />
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-[#2D3640]">
            <div
              className="h-full rounded-full bg-[#4CCBBF] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Team members */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-zinc-700 dark:text-[#E2E8F0]">Team members</label>
          <div className="flex flex-wrap gap-2">
            {["Alice", "Bob", "Carol", "Dave", "Eve", "Frank"].map(name => (
              <label key={name} className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 transition-colors hover:border-[#4CCBBF] hover:text-[#4CCBBF] dark:border-[#2D3640] dark:text-[#94A3B8]">
                <input type="checkbox" className="accent-[#4CCBBF]" defaultChecked />
                {name}
              </label>
            ))}
          </div>
        </div>
      </form>
    </Modal>
  );
}
