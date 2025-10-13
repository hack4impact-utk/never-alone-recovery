import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { baseSchema } from "./base-schema";

export const roleEnum = pgEnum("role", ["disabled", "staff", "admin"]);

export const users = pgTable("user", {
  ...baseSchema,
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  role: roleEnum("role").default("disabled").notNull(),
});
