"use client";

export interface DeviceFrameProps {
  type: "phone" | "tablet" | "laptop" | "desktop";
  children: React.ReactNode;
  className?: string;
}

/**
 * Device frame mockups — pure CSS/SVG frames wrapping arbitrary content.
 */
export function DeviceFrame({ type, children, className = "" }: DeviceFrameProps) {
  switch (type) {
    case "phone":
      return <PhoneFrame className={className}>{children}</PhoneFrame>;
    case "tablet":
      return <TabletFrame className={className}>{children}</TabletFrame>;
    case "laptop":
      return <LaptopFrame className={className}>{children}</LaptopFrame>;
    case "desktop":
      return <DesktopFrame className={className}>{children}</DesktopFrame>;
    default:
      return <PhoneFrame className={className}>{children}</PhoneFrame>;
  }
}

function PhoneFrame({ children, className }: { children: React.ReactNode; className: string }) {
  return (
    <div className={["inline-block", className].join(" ")}>
      <div className="relative mx-auto w-[260px] rounded-[2.5rem] border-[10px] border-zinc-800 bg-zinc-800 shadow-xl dark:border-zinc-700">
        {/* Notch */}
        <div className="absolute left-1/2 top-0 z-10 h-5 w-24 -translate-x-1/2 rounded-b-xl bg-zinc-800 dark:bg-zinc-700" />
        {/* Screen */}
        <div className="relative h-[520px] w-full overflow-hidden rounded-[1.8rem] bg-white dark:bg-[#242B33]">
          {children}
        </div>
        {/* Home indicator */}
        <div className="mx-auto mt-1 h-1 w-24 rounded-full bg-zinc-600" />
      </div>
    </div>
  );
}

function TabletFrame({ children, className }: { children: React.ReactNode; className: string }) {
  return (
    <div className={["inline-block", className].join(" ")}>
      <div className="relative mx-auto w-[500px] rounded-[1.5rem] border-[12px] border-zinc-800 bg-zinc-800 shadow-xl dark:border-zinc-700">
        {/* Camera dot */}
        <div className="absolute left-1/2 top-1.5 h-2 w-2 -translate-x-1/2 rounded-full bg-zinc-600" />
        {/* Screen */}
        <div className="relative h-[360px] w-full overflow-hidden rounded-xl bg-white dark:bg-[#242B33]">
          {children}
        </div>
      </div>
    </div>
  );
}

function LaptopFrame({ children, className }: { children: React.ReactNode; className: string }) {
  return (
    <div className={["inline-block", className].join(" ")}>
      {/* Screen */}
      <div className="relative mx-auto w-[580px] rounded-t-xl border-[8px] border-zinc-700 bg-zinc-700 shadow-lg dark:border-zinc-600">
        {/* Camera */}
        <div className="absolute left-1/2 top-1 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-zinc-500" />
        <div className="h-[340px] w-full overflow-hidden rounded-t-lg bg-white dark:bg-[#242B33]">
          {children}
        </div>
      </div>
      {/* Base/keyboard */}
      <div className="relative mx-auto h-3 w-[640px] rounded-b-xl bg-zinc-600 dark:bg-zinc-500">
        <div className="absolute left-1/2 top-0 h-1 w-16 -translate-x-1/2 rounded-b bg-zinc-500 dark:bg-zinc-400" />
      </div>
    </div>
  );
}

function DesktopFrame({ children, className }: { children: React.ReactNode; className: string }) {
  return (
    <div className={["inline-flex flex-col items-center", className].join(" ")}>
      {/* Monitor */}
      <div className="relative w-[620px] rounded-xl border-[8px] border-zinc-800 bg-zinc-800 shadow-xl dark:border-zinc-700">
        <div className="h-[380px] w-full overflow-hidden rounded-lg bg-white dark:bg-[#242B33]">
          {children}
        </div>
      </div>
      {/* Stand */}
      <div className="h-14 w-3 bg-zinc-600 dark:bg-zinc-500" />
      <div className="h-2 w-28 rounded-t-sm bg-zinc-600 dark:bg-zinc-500" />
    </div>
  );
}
