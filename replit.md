# Versatile Services HR & Payroll Management System

A full-stack HR & Payroll Management System for Versatile Services — a facility management company in Pune, India. Includes a public website, admin dashboard, employee portal, and full payroll processing with payslip generation.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/versatile-hr run dev` — run the frontend (Vite)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/scripts run seed` — seed DB with admin user + sample data
- Required env: `DATABASE_URL` — Postgres connection string, `SESSION_SECRET` — JWT signing secret

## Login Credentials

- **Admin**: admin@versatile.com / admin123
- **Employee**: employee@versatile.com / emp123

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Wouter + TanStack Query + shadcn/ui
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Auth: JWT (stored in localStorage), bcryptjs for hashing
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/versatile-hr/` — React+Vite frontend (public site + admin + employee portal)
- `artifacts/api-server/` — Express 5 REST API server
- `lib/db/` — Drizzle ORM schema + migrations (7 tables)
- `lib/api-spec/` — OpenAPI spec (source of truth for API contract)
- `lib/api-client-react/` — Generated React Query hooks + Zod schemas (from Orval)
- `scripts/src/seed.ts` — Database seed script

## Architecture decisions

- JWT stored in `localStorage` as `versatile_token`; auto-attached in `custom-fetch.ts` for all API calls
- Drizzle numeric columns returned as strings from PG — routes parse with `parseFloat()` before returning
- Admin routes protected by `requireAdmin` middleware; employee routes by `requireAuth`
- Payroll processing generates payslips for all active employees with assigned salary structures
- All forms make direct `fetch()` calls with the Bearer token for simplicity

## Product

- **Public Website**: Home, About, Services (5 service pages), Clients, Contact, Request Quote, Careers
- **Admin Portal**: Dashboard with stats/charts, Employee management (CRUD), Salary Structures, Payroll Runs (process → generate payslips), View all payslips, Inquiries/Quotes/Applications inbox
- **Employee Portal**: Personal profile, Payslips list, Print-ready payslip view

## User preferences

- Blue + orange branding (primary = navy blue, accent = orange)
- Company: Versatile Services, MIDC Phase 2, Chakan, Pune
- Phones: 8390445534 / 7276245323
- Email: vfspl12@gmail.com

## Gotchas

- Run `pnpm --filter @workspace/db run push` after any schema changes
- Run `pnpm --filter @workspace/api-spec run codegen` after any OpenAPI spec changes
- Do NOT run `pnpm dev` at workspace root — use individual artifact workflows
- The `SESSION_SECRET` env var is used as JWT signing key (falls back to hardcoded string for dev)

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
