import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { withBaseColumns } from "./base-schema";

export const roleEnum = pgEnum("role", ["disabled", "staff", "admin"]);

export const users = pgTable(
  "user",
  withBaseColumns({
    name: text("name"),
    email: text("email").unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    role: roleEnum("role").default("disabled").notNull(),
  }),
);
