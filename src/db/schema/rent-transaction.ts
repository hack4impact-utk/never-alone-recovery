import { numeric, pgTable, text } from "drizzle-orm/pg-core";
import { InferSelectModel } from "drizzle-orm/table";

import { baseSchema } from "./base-schema";
import { clients } from "./client";
import { transactionType } from "./enum";
import { users } from "./user";

export const rentTransactions = pgTable("rent_transaction", {
  ...baseSchema,
  staffId: text("staff_id")
    .references(() => users.id)
    .notNull(),
  clientId: text("client_id")
    .references(() => clients.id)
    .notNull(),
  type: transactionType("type").notNull(),
  amount: numeric("amount", { precision: 19, scale: 4 }).notNull(),
});

export type RentTransaction = InferSelectModel<typeof rentTransactions>;
