"use client";

import { cn } from "@/lib/utils";

export interface InputGroupProps {
  children: React.ReactNode;
  prepend?: React.ReactNode;
  append?: React.ReactNode;
  className?: string;
}

export function InputGroup({ children, prepend, append, className }: InputGroupProps) {
  return (
    <div className={cn("flex items-stretch", className)}>
      {prepend && (
        <span
          className={cn(
            "inline-flex items-center rounded-l-md border border-r-0 px-3 text-sm",
            "bg-zinc-50 text-zinc-500 border-zinc-300",
            "dark:bg-[#2A3441] dark:text-[#9FAEC1] dark:border-[#3D4A5C]"
          )}
        >
          {prepend}
        </span>
      )}
      <div
        className={cn(
          "flex-1 [&>*]:rounded-none",
          prepend && !append ? "[&>*]:rounded-r-md" : false,
          append && !prepend ? "[&>*]:rounded-l-md" : false,
          !prepend && !append ? "[&>*]:rounded-md" : false
        )}
      >
        {children}
      </div>
      {append && (
        <span
          className={cn(
            "inline-flex items-center rounded-r-md border border-l-0 px-3 text-sm",
            "bg-zinc-50 text-zinc-500 border-zinc-300",
            "dark:bg-[#2A3441] dark:text-[#9FAEC1] dark:border-[#3D4A5C]"
          )}
        >
          {append}
        </span>
      )}
    </div>
  );
}
