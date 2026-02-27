# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js 16 application with TypeScript, Tailwind CSS v4, and PostgreSQL (Supabase) backend. Uses pnpm as the package manager.

## Commands

```bash
pnpm dev              # Start dev server (localhost:3000)
pnpm build            # Production build
pnpm start            # Start production server
pnpm lint             # ESLint

pnpm db:generate      # Generate Drizzle schema migrations
pnpm db:migrate       # Run database migrations
pnpm db:studio        # Open Drizzle Studio (database GUI)
```

## Architecture

### Routing & Layout

- **App Router** with route groups: `src/app/(main)/` for public pages, `src/app/admin/` reserved for admin
- Dynamic routes use `[param]` convention (e.g., `[blogId]`, `[postId]`, `[pingId]`)
- API routes live under `src/app/api/` using `route.tsx` files

### Server/Client Component Pattern

Components follow a split-file convention:
- `component.tsx` — Server Component (default, no directive)
- `component.client.tsx` — Client Component (has `"use client"` directive)

This pattern is used throughout `src/features/` for blog, portfolio, and post components.

### Directory Structure

- `src/app/` — Pages, layouts, and API routes
- `src/features/` — Feature modules (blog, portfolio, posts), each with their own `components/` subdirectory
- `src/components/ui/` — shadcn/ui component library (56 components, style: new-york)
- `src/components/common/` — Shared components (logo)
- `src/components/layouts/` — Layout components (header, nav)
- `src/hooks/` — Custom hooks
- `src/lib/db/schema.ts` — Drizzle ORM schema (all tables defined here)
- `src/lib/http/response.ts` — Standardized API response helpers (`response.ok()`, `response.fail()`)
- `src/lib/utils.ts` — `cn()` utility for Tailwind class merging
- `drizzle/` — Generated SQL migrations and metadata

### Database (Drizzle ORM + Supabase PostgreSQL)

Schema namespace: `my-next-app-schema`. Tables: `sample_table`, `users`, `posts`, `post_likes`, `post_comments`. Config at `drizzle.config.ts`, schema at `src/lib/db/schema.ts`.

### API Response Convention

All API routes return standardized responses via `src/lib/http/response.ts`:
```typescript
response.ok(data)                    // { success: true, data }
response.fail(message, status, details)  // { success: false, error: { message, details } }
```

## Key Tech Stack

- **Next.js 16** with React Compiler enabled (`reactCompiler: true` in next.config.ts)
- **React 19** with async params in route handlers
- **Tailwind CSS v4** with CSS custom properties for theming
- **shadcn/ui** — add components via `pnpm dlx shadcn@latest add <component>`
- **Drizzle ORM** for type-safe database queries
- **React Hook Form + Zod** for form handling and validation
- **TanStack React Query** for client-side data fetching
- **Lucide React** for icons

## Path Aliases

`@/*` maps to `./src/*` (configured in tsconfig.json and components.json).
