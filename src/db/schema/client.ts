import { pgTable, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm/relations";

import { baseSchema } from "./base-schema";
import { clientStatusEnum } from "./enum";
import { intakeForms } from "./intake-form";
import { tasks } from "./task";
import { users } from "./user";

export const clients = pgTable("client", {
  ...baseSchema,
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  status: clientStatusEnum("status").default("resident").notNull(),
  staffId: text("staff_id")
    .references(() => users.id)
    .notNull(),
  intakeFormId: text("intake_form")
    .references(() => intakeForms.id)
    .notNull(),
});

export const clientRelations = relations(clients, ({ one, many }) => ({
  staff: one(users, {
    fields: [clients.staffId],
    references: [users.id],
  }),
  intakeForm: one(intakeForms, {
    fields: [clients.intakeFormId],
    references: [intakeForms.id],
  }),
  tasks: many(tasks),
}));
