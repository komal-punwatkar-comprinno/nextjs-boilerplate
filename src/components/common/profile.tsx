export type ProfileStatus = "active" | "away" | "busy" | "offline";

export interface ProfileProps {
  name: string;
  email?: string;
  role?: string;
  status?: ProfileStatus;
  avatarUrl?: string;
  className?: string;
}

const statusMap: Record<ProfileStatus, { dot: string; label: string }> = {
  active:  { dot: "bg-emerald-500", label: "Online"  },
  away:    { dot: "bg-amber-400",   label: "Away"    },
  busy:    { dot: "bg-red-500",     label: "Busy"    },
  offline: { dot: "bg-zinc-400",    label: "Offline" },
};

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0]!.charAt(0).toUpperCase();
  return parts[0]!.charAt(0).toUpperCase() + parts[parts.length - 1]!.charAt(0).toUpperCase();
}

/**
 * User profile card with avatar, name, role and status.
 *
 * @example
 * <Profile
 *   name="Sarah Chen"
 *   email="sarah@company.com"
 *   role="Designer"
 *   status="active"
 *   avatarUrl="https://i.pravatar.cc/150?img=5"
 * />
 */
export function Profile({ name, email, role, status, avatarUrl, className = "" }: ProfileProps) {
  const s = status ? statusMap[status] : null;

  return (
    <div
      className={[
        "flex items-center gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-3",
        "dark:border-[#2D3640] dark:bg-[#242B33]",
        className,
      ].join(" ")}
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={avatarUrl} alt={name} className="h-10 w-10 rounded-full object-cover" />
        ) : (
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-200 text-sm font-semibold text-zinc-700 dark:bg-[#353B46] dark:text-[#9FAEC1]">
            {getInitials(name)}
          </span>
        )}
        {s && (
          <span
            className={[
              "absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full ring-2 ring-white dark:ring-[#242B33]",
              s.dot,
            ].join(" ")}
            title={s.label}
          />
        )}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-zinc-900 dark:text-[#E2E8F0]">{name}</p>
        {email && <p className="truncate text-xs text-zinc-400 dark:text-[#64748B]">{email}</p>}
        {role && <p className="truncate text-xs text-zinc-500 dark:text-[#9FAEC1]">{role}</p>}
      </div>

      {/* Status pill */}
      {s && (
        <span className={`shrink-0 text-xs font-medium text-zinc-500 dark:text-[#9FAEC1]`}>
          {s.label}
        </span>
      )}
    </div>
  );
}
