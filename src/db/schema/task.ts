import { relations } from "drizzle-orm";
import { boolean, pgTable, text } from "drizzle-orm/pg-core";

import { baseSchema } from "./base-schema";
import { clients } from "./client";
import { users } from "./user";

export const tasks = pgTable("task", {
  ...baseSchema,
  staffId: text("staff_id")
    .references(() => users.id)
    .notNull(),
  clientId: text("client_id")
    .references(() => clients.id)
    .notNull(),
  description: text("description"),
  completed: boolean("completed").notNull().default(false),
});

export const taskRelations = relations(tasks, ({ one }) => ({
  staff: one(users, {
    fields: [tasks.staffId],
    references: [users.id],
  }),
  client: one(clients, {
    fields: [tasks.clientId],
    references: [clients.id],
  }),
}));
