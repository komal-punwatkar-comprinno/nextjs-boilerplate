"use client";

import { useState } from "react";
import { ComponentPreview } from "../_components/component-preview";
import { SectionWrapper } from "./section-wrapper";
import { FileUpload } from "@/components";

export function FileUploadSection() {
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);

  const simulateUpload = (file: File | null) => {
    setFile2(file);
    if (file) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 300);
    }
  };

  return (
    <SectionWrapper
      id="file-upload"
      title="File Upload"
      description="Single file upload with click-to-browse, validation, and progress indication."
    >
      <div className="space-y-8">
        <ComponentPreview
          title="Basic File Upload"
          code={`import { FileUpload } from "@/components";

<FileUpload
  accept="image/*,.pdf,.doc,.docx"
  maxSize={5 * 1024 * 1024}
  onFile={(file) => console.log("Selected:", file?.name)}
/>`}
        >
          <div className="max-w-md">
            <FileUpload
              accept="image/*,.pdf,.doc,.docx"
              maxSize={5 * 1024 * 1024}
              onFile={(file) => setFile1(file)}
            />
            {file1 && (
              <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                ✓ Selected: {file1.name}
              </p>
            )}
          </div>
        </ComponentPreview>

        <ComponentPreview
          title="With Upload Progress"
          code={`import { useState } from "react";
import { FileUpload } from "@/components";

const [progress, setProgress] = useState(0);

<FileUpload
  accept="image/*"
  maxSize={10 * 1024 * 1024}
  progress={progress}
  onFile={(file) => {
    if (file) simulateUpload(file);
  }}
/>`}
        >
          <div className="max-w-md">
            <FileUpload
              accept="image/*"
              maxSize={10 * 1024 * 1024}
              progress={progress}
              onFile={simulateUpload}
            />
            {file2 && progress === 100 && (
              <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                ✓ Upload complete: {file2.name}
              </p>
            )}
          </div>
        </ComponentPreview>

        <ComponentPreview
          title="States: Disabled & Error"
          code={`{/* Disabled */}
<FileUpload disabled />

{/* With error */}
<FileUpload error="File type not supported. Please upload an image or PDF." />`}
        >
          <div className="grid max-w-2xl gap-6 md:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-medium text-slate-500 dark:text-slate-400">Disabled</p>
              <FileUpload disabled />
            </div>
            <div>
              <p className="mb-2 text-xs font-medium text-slate-500 dark:text-slate-400">With Error</p>
              <FileUpload error="File type not supported. Please upload an image or PDF." />
            </div>
          </div>
        </ComponentPreview>
      </div>
    </SectionWrapper>
  );
}
