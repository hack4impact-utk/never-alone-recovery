import { text, timestamp } from "drizzle-orm/pg-core";

export const baseSchema = {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  createdDate: timestamp("created_date").defaultNow().notNull(),
  createdById: text("created_by"),
  editedDate: timestamp("edited_date")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  editedById: text("edited_by"),
};
