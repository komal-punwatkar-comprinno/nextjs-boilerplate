"use client";

import { useState } from "react";
import { Modal, Button } from "@/components";
import { SectionWrapper } from "./section-wrapper";

export function ModalSection() {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  return (
    <SectionWrapper id="modals" title="Modal">
      <div className="space-y-4">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Click a button below to open a fully functional modal dialog. Supports keyboard{" "}
          <code className="rounded bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 font-mono text-xs dark:text-slate-200">
            Escape
          </code>{" "}
          to close, backdrop click, and focus management.
        </p>

        <div className="flex flex-wrap gap-3">
          <Button variant="primary" onClick={() => setConfirmOpen(true)}>
            Open Confirm Dialog
          </Button>
          <Button variant="secondary" onClick={() => setFormOpen(true)}>
            Open Form Modal
          </Button>
        </div>
      </div>

      {/* Confirm / destructive dialog */}
      <Modal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Delete Project"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => setConfirmOpen(false)}>
              Delete
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 rounded-lg bg-red-50 dark:bg-red-900/30 p-3">
            <span className="text-2xl">⚠️</span>
            <p className="text-sm text-red-700 dark:text-red-300">This action cannot be undone.</p>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Are you sure you want to delete{" "}
            <strong className="font-semibold text-slate-800 dark:text-slate-100">CRM Redesign</strong>? All tasks,
            files, and team assignments will be permanently removed.
          </p>
        </div>
      </Modal>

      {/* Form modal */}
      <Modal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        title="Invite Team Member"
        size="md"
        footer={
          <>
            <Button variant="ghost" onClick={() => setFormOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setFormOpen(false)}>
              Send Invite
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Email address
            </label>
            <input
              type="email"
              placeholder="colleague@company.com"
              className="h-9 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 dark:border-slate-500 dark:bg-slate-700 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:ring-offset-slate-800"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Role</label>
            <select className="h-9 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 dark:border-slate-500 dark:bg-slate-700 dark:text-slate-100 dark:focus:ring-offset-slate-800">
              <option>Developer</option>
              <option>Designer</option>
              <option>Manager</option>
              <option>Viewer</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Projects access
            </label>
            <div className="flex flex-wrap gap-2">
              {["CRM Redesign", "Mobile App v2", "Analytics"].map((p) => (
                <label
                  key={p}
                  className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 dark:border-slate-500 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 accent-indigo-600"
                    defaultChecked={p === "CRM Redesign"}
                  />
                  {p}
                </label>
              ))}
            </div>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            An invitation email will be sent immediately upon clicking &ldquo;Send Invite&rdquo;.
          </p>
        </div>
      </Modal>
    </SectionWrapper>
  );
}

