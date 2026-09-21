import { parseEnv } from "@neon/env";
import { loadEnvConfig } from "@next/env";
import { defineConfig } from "drizzle-kit";

import config from "./neon";

// Drizzle Kit runs outside the Next.js runtime, so load .env.local the same
// way Next does rather than reaching for dotenv.
loadEnvConfig(process.cwd());

// Migrations must run over a direct (non-pooled) connection.
const { postgres } = parseEnv(config, ["DATABASE_URL_UNPOOLED"]);

export default defineConfig({
  schema: "./lib/db/schema",
  out: "./lib/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: postgres.databaseUrlUnpooled,
  },
  strict: true,
  verbose: true,
});
