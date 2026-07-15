# Next.js SaaS Boilerplate

A production-ready frontend foundation for enterprise SaaS applications built on **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

---

## Tech Stack

| | |
|---|---|
| Framework | Next.js 16.2 (App Router) |
| UI | React 19 |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS v4 |
| Forms | React Hook Form 7 + Zod 3 |
| Fonts | Geist Sans / Geist Mono |
| Compiler | React Compiler |
| Linting | ESLint 9 |

---

## Getting Started

```bash
npm install
npm run dev
```

| URL | Page |
|---|---|
| http://localhost:3000 | Landing page |
| http://localhost:3000/login | Login form |
| http://localhost:3000/dashboard | Dashboard |
| http://localhost:3000/dashboard/components | Component showcase |

---

## Project Structure

```
src/
├── app/                  # Pages & layouts (App Router)
│   ├── login/            # Login page with real form
│   └── dashboard/
│       ├── analytics/    # Stub — implement your feature here
│       ├── users/        # Stub
│       ├── projects/     # Stub
│       ├── messages/     # Stub
│       ├── settings/     # Stub
│       ├── _components/  # Shell, ComingSoon placeholder
│       └── components/   # Full UI component showcase
├── components/           # Shared UI — Button, Input, Card, Icon, Modal…
├── features/             # Feature modules (add yours here)
├── hooks/                # useAuth, useZodForm, useModal, usePagination…
├── services/             # API service layer
├── lib/                  # apiClient, BaseService, Zod schemas
├── providers/            # AuthProvider
├── contexts/             # AuthContext
├── types/                # AuthUser, ApiResponse, ApiError…
├── constants/            # ROLES, STORAGE_KEYS, env, auth
├── config/               # routes.ts, site.ts, navigation.ts
├── utils/                # date, string, storage, cookie helpers
└── proxy.ts              # Middleware — route protection (disabled by default)
```

---

## Key Features

### Authentication (infrastructure-ready)
Full auth flow is wired. Only the provider integration is pending.

```ts
// 1. Implement AuthService in src/services/auth-service.ts
// 2. Call it in the onSubmit handler in src/app/login/page.tsx
// 3. Enable route protection in src/proxy.ts (uncomment the guard logic)
```

### API Layer
Never call `fetch` directly from a page. Use the service layer.

```ts
// Extend BaseService for any resource
class UsersService extends BaseService {
  constructor() { super("/users"); }
  list() { return this.getList<User>(); }
  getById(id: string) { return this.getOne<User>(`/${id}`); }
}
export const usersService = new UsersService();
```

### Component Library
Import from the barrel — never from individual files.

```tsx
import { Button, Input, Badge, Card, Modal, Icon, Spinner, Avatar, Pagination } from "@/components";
```

### Icon System
40 Heroicons outline icons, no external dependency.

```tsx
<Icon name="trash" size="sm" className="text-red-600" />

// Add a new icon in src/components/icons.ts — one line, available everywhere:
myIcon: "M12 4v16m8-8H4",
```

### Forms
React Hook Form + Zod wired through `useZodForm`.

```tsx
const form = useZodForm(loginSchema, { defaultValues: { email: "", password: "" } });

<Input label="Email" error={form.formState.errors.email?.message} {...form.register("email")} />
<Button type="submit" isLoading={form.formState.isSubmitting}>Sign in</Button>
```

Pre-built schemas in `src/lib/schemas.ts`: `emailSchema`, `passwordSchema`, `loginSchema`, `requiredStringSchema`.

---

## Adding a Feature

```
src/features/your-feature/
├── index.ts          # Public barrel
├── types.ts          # Feature types
├── your-service.ts   # Extends BaseService
├── use-your-hook.ts  # Feature hook
└── components/       # Feature UI
```

Then:
1. Add route to `src/config/routes.ts`
2. Add page at `src/app/dashboard/your-feature/page.tsx`
3. Add sidebar link in `src/components/sidebar.tsx`

---

## Hooks

| Hook | Purpose |
|---|---|
| `useAuth()` | `user`, `isAuthenticated`, `logout` |
| `useZodForm(schema)` | RHF + Zod resolver |
| `useModal()` | `isOpen`, `open`, `close`, `toggle` |
| `usePagination({ totalItems })` | `page`, `totalPages`, `setPage`, `startIndex`, `endIndex` |
| `useSearch()` | `query`, `debouncedQuery`, `setQuery` |
| `usePermissions()` | `can(roles[])`, `isAdmin` |
| `useDebounce(value, delay)` | Debounce any value |
| `useScrollSpy(ids[])` | Active section for scroll-based nav |

---

## Environment Variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_API_BASE_URL=https://api.your-domain.com
NEXT_PUBLIC_APP_ENV=development
```

---

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint
```

---

## Architecture Rules

- **No direct `fetch` in pages** — always use the service layer.
- **Server Components by default** — `"use client"` only for state, events, or browser APIs.
- **One feature per directory** — each owns its types, service, hook, and components.
- **All routes in `routes.ts`** — never hardcode path strings.
- **All imports from `@/components`** — use the barrel, not individual file paths.
