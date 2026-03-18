import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { audits } from "./audit";
import { baseSchema } from "./base-schema";
import { staffRoleEnum } from "./enum";

export const users = pgTable("user", {
  ...baseSchema,
  name: text("name").notNull(),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image").notNull(),
  role: staffRoleEnum("role").default("disabled").notNull(),
  lastCompletedDrugTest: timestamp("last_completed_drug_test", {
    mode: "date",
  }),
});
export const userRelations = relations(users, ({ many }) => ({
  audits: many(audits),
}));
