import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";

import { baseSchema } from "./base-schema";
import { clients } from "./client";
import { auditTypeEnum } from "./enum";
import { users } from "./user";

export const audits = pgTable("audit", {
  ...baseSchema,
  staffId: text("staff_id").references(() => users.id),
  clientId: text("client_id").references(() => clients.id),
  type: auditTypeEnum("type"),
  message: text("message"),
});

export const auditRelations = relations(audits, ({ one }) => ({
  staff: one(users, {
    fields: [audits.staffId],
    references: [users.id],
  }),
  client: one(clients, {
    fields: [audits.clientId],
    references: [clients.id],
  }),
}));
