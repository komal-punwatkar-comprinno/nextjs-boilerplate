"use client";

import { Dropdown, Button } from "@/components";
import { SectionWrapper } from "./section-wrapper";

const EditIcon = <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>;
const CopyIcon = <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
const DownloadIcon = <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>;
const TrashIcon = <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;

export function DropdownsSection() {
  return (
    <SectionWrapper id="dropdowns" title="Dropdowns">
      <div className="space-y-8">

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Basic</p>
          <div className="flex flex-wrap gap-3">
            <Dropdown
              trigger={<Button variant="secondary" size="sm">Actions ▾</Button>}
              items={[
                { id: "view",   label: "View details" },
                { id: "edit",   label: "Edit" },
                { id: "duplicate", label: "Duplicate" },
                { id: "archive",   label: "Archive", danger: true },
              ]}
            />
            <Dropdown
              trigger={<Button variant="primary" size="sm">Options ▾</Button>}
              items={[
                { id: "export",  label: "Export CSV" },
                { id: "print",   label: "Print" },
                { id: "share",   label: "Share link" },
              ]}
            />
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">With icons</p>
          <Dropdown
            trigger={<Button variant="secondary" size="sm">With Icons ▾</Button>}
            items={[
              { id: "edit",     label: "Edit",     icon: EditIcon },
              { id: "copy",     label: "Duplicate", icon: CopyIcon },
              { id: "download", label: "Download",  icon: DownloadIcon },
              { id: "delete",   label: "Delete",    icon: TrashIcon, danger: true },
            ]}
          />
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Align right (bottom-end)</p>
          <div className="flex justify-end">
            <Dropdown
              placement="bottom-end"
              trigger={<Button variant="secondary" size="sm">Align Right ▾</Button>}
              items={[
                { id: "profile",  label: "My Profile" },
                { id: "settings", label: "Settings" },
                { id: "logout",   label: "Sign out", danger: true },
              ]}
            />
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
}
