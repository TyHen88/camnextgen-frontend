Installation Guide
==================

Prerequisites
-------------
- Node.js 18+ (required by Next.js 14).
- pnpm 9.12.2 (see `package.json` -> `packageManager`).

Setup
-----
1) Install dependencies:
   pnpm install
2) Ensure environment files exist (copy if missing):
   - apps/admin-app/.env.local
   - apps/student-app/.env.local
   Use `.env.example` as the template.

Development
-----------
- Run both apps:
  pnpm dev
- Run admin app only:
  pnpm dev:admin
- Run student app only:
  pnpm dev:student

Notes
-----
- The frontend expects the API at `NEXT_PUBLIC_API_URL` (default: http://localhost:8181).
