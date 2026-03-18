import { pgTable, text } from "drizzle-orm/pg-core";

import { baseSchema } from "./base-schema";

export const donors = pgTable("donor", {
  ...baseSchema,
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  phoneNumber: text("phone_number").notNull(),
});
