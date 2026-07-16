import { Avatar } from "@/components/avatar";
import { SectionWrapper } from "./section-wrapper";

export function AvatarSection() {
  return (
    <SectionWrapper id="avatars" title="7. Avatars">
      <div className="space-y-8">
        {/* Sizes with image */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Sizes — With Image
          </p>
          <div className="flex items-end gap-5">
            {(["xs", "sm", "md", "lg", "xl"] as const).map((size, i) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <Avatar src={`https://i.pravatar.cc/150?img=${i + 1}`} name="User" size={size} />
                <span className="text-xs text-slate-500 dark:text-slate-400">{size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sizes with initials */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Sizes — Initials Fallback
          </p>
          <div className="flex items-end gap-5">
            {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <Avatar name="Jane Smith" size={size} />
                <span className="text-xs text-slate-500 dark:text-slate-400">{size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mixed initials */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Various Names
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            {["Alice Brown", "Bob K", "Carol Lee", "Dave M", "Eve Thompson"].map((name) => (
              <div key={name} className="flex flex-col items-center gap-1.5">
                <Avatar name={name} size="md" />
                <span className="text-xs text-slate-500 dark:text-slate-400">{name.split(" ")[0]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Avatar group */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Avatar Group (Overlapping)
          </p>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((n) => (
                <Avatar
                  key={n}
                  src={`https://i.pravatar.cc/150?img=${n}`}
                  name={`User ${n}`}
                  size="md"
                  className="ring-2 ring-white dark:ring-slate-800"
                />
              ))}
              {/* +N overflow badge */}
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-600 ring-2 ring-white dark:bg-slate-700 dark:text-slate-200 dark:ring-slate-800">
                +4
              </span>
            </div>
            <span className="text-sm text-slate-500 dark:text-slate-400">9 team members</span>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

