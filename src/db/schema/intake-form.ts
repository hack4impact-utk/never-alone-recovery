import { date, pgTable, text } from "drizzle-orm/pg-core";

import { baseSchema } from "./base-schema";

export const intakeForms = pgTable("intake_form", {
  ...baseSchema,
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  dateOfBirth: date("date_of_birth").notNull(),
});
