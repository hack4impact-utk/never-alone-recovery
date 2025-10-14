import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { baseSchema } from "./base-schema";
import { staffRoleEnum } from "./enum";

export const users = pgTable("user", {
  ...baseSchema,
  name: text("name").notNull(),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image").notNull(),
  role: staffRoleEnum("role").default("disabled").notNull(),
});
