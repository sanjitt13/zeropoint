import "server-only";

import { neon } from "@neondatabase/serverless";
import { parseEnv } from "@neon/env";
import { drizzle } from "drizzle-orm/neon-http";

import config from "@/neon";
import * as schema from "./schema";

// Pooled connection: the right choice for request-scoped queries. Drizzle Kit
// uses DATABASE_URL_UNPOOLED for migrations instead (see drizzle.config.ts).
const { postgres } = parseEnv(config, ["DATABASE_URL"]);

export const db = drizzle({ client: neon(postgres.databaseUrl), schema });

export { schema };
