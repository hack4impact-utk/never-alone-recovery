import { pgTable, text } from "drizzle-orm/pg-core";

import { baseSchema } from "./base-schema";
import { clientStatusEnum } from "./enum";
import { intakeForms } from "./intake-form";
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
