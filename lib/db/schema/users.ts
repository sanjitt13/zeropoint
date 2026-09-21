import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const demoUsers = pgTable("demo_users", {
  id: serial("id").primaryKey(),
  name: text("name"),
});

export type DemoUser = typeof demoUsers.$inferSelect;
export type NewDemoUser = typeof demoUsers.$inferInsert;
