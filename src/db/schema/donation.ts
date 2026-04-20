import { numeric, pgTable, text } from "drizzle-orm/pg-core";

import { baseSchema } from "./base-schema";
import { donors } from "./donor";

export const donations = pgTable("donation", {
  ...baseSchema,
  donorId: text("donor_id")
    .references(() => donors.id)
    .notNull(),
  amount: numeric("amount", { precision: 19, scale: 4 }).notNull(),
});
