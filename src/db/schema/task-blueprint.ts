import { pgTable, text } from "drizzle-orm/pg-core";

import { baseSchema } from "./base-schema";
import { clients } from "./client";
import { users } from "./user";

export const taskBlueprints = pgTable("task_blueprint", {
  ...baseSchema,
  staffId: text("staff_id")
    .references(() => users.id)
    .notNull(),
  clientId: text("client_id")
    .references(() => clients.id)
    .notNull(),
  description: text("description"),
});
