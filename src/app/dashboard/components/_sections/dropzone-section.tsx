"use client";

import { useState } from "react";
import { ComponentPreview } from "../_components/component-preview";
import { SectionWrapper } from "./section-wrapper";
import { Dropzone } from "@/components";

export function DropzoneSection() {
  const [files1, setFiles1] = useState<File[]>([]);
  const [files2, setFiles2] = useState<File[]>([]);

  return (
    <SectionWrapper
      id="dropzone"
      title="Dropzone"
      description="Drag-and-drop file upload area with multi-file support, previews, and validation."
    >
      <div className="space-y-8">
        <ComponentPreview
          title="Basic Dropzone"
          code={`import { useState } from "react";
import { Dropzone } from "@/components";

const [files, setFiles] = useState<File[]>([]);

<Dropzone
  accept="image/*,.pdf"
  maxSize={10 * 1024 * 1024}
  maxFiles={5}
  onFiles={(files) => setFiles(files)}
/>`}
        >
          <div className="max-w-lg">
            <Dropzone
              accept="image/*,.pdf"
              maxSize={10 * 1024 * 1024}
              maxFiles={5}
              onFiles={(files) => setFiles1(files)}
            />
            {files1.length > 0 && (
              <div className="mt-3 rounded-md border border-slate-200 p-3 dark:border-[#2D3640]">
                <p className="mb-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                  {files1.length} file{files1.length > 1 ? "s" : ""} selected:
                </p>
                <ul className="space-y-1">
                  {files1.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
                      {f.name}
                      <span className="text-xs text-slate-400">
                        ({(f.size / 1024).toFixed(1)} KB)
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </ComponentPreview>

        <ComponentPreview
          title="Images Only with Limit"
          code={`<Dropzone
  accept="image/png,image/jpeg,image/webp"
  maxSize={5 * 1024 * 1024}
  maxFiles={3}
  onFiles={(files) => setFiles(files)}
/>`}
        >
          <div className="max-w-lg">
            <Dropzone
              accept="image/png,image/jpeg,image/webp"
              maxSize={5 * 1024 * 1024}
              maxFiles={3}
              onFiles={(files) => setFiles2(files)}
            />
            {files2.length > 0 && (
              <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                ✓ {files2.length} image{files2.length > 1 ? "s" : ""} ready to upload
              </p>
            )}
          </div>
        </ComponentPreview>

        <ComponentPreview
          title="States: Disabled & Error"
          code={`{/* Disabled */}
<Dropzone disabled />

{/* With error */}
<Dropzone error="Maximum of 3 files allowed." />`}
        >
          <div className="grid max-w-2xl gap-6 md:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-medium text-slate-500 dark:text-slate-400">Disabled</p>
              <Dropzone disabled />
            </div>
            <div>
              <p className="mb-2 text-xs font-medium text-slate-500 dark:text-slate-400">With Error</p>
              <Dropzone error="Maximum of 3 files allowed." />
            </div>
          </div>
        </ComponentPreview>
      </div>
    </SectionWrapper>
  );
}
