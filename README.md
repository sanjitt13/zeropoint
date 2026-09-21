This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

This project uses [pnpm](https://pnpm.io) as its package manager.

First, install dependencies and run the development server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Database

Postgres is hosted on [Neon](https://neon.com) and accessed through [Drizzle ORM](https://orm.drizzle.team).

Connection strings live in `.env.local` and are pulled from the linked Neon branch with `neon link` / `neon deploy`. The app reads the pooled `DATABASE_URL`; Drizzle Kit uses the direct `DATABASE_URL_UNPOOLED` for migrations.

| Path | Purpose |
| --- | --- |
| `lib/db/index.ts` | Drizzle client (`db`), server-only |
| `lib/db/schema/` | Table definitions, re-exported from `index.ts` |
| `lib/db/migrations/` | Generated SQL migrations — commit these |
| `drizzle.config.ts` | Drizzle Kit configuration |

Query from Server Components, Route Handlers, or Server Actions:

```ts
import { db, schema } from "@/lib/db";

const users = await db.select().from(schema.demoUsers);
```

After changing anything in `lib/db/schema/`, generate a migration and apply it:

```bash
pnpm db:generate
pnpm db:migrate
```

`pnpm db:studio` opens Drizzle Studio. `pnpm db:push` pushes the schema without a migration file — use it only against a throwaway Neon branch, never production.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
