import { text, timestamp } from "drizzle-orm/pg-core";

export const baseSchema = {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  createdDate: timestamp("createdDate").defaultNow().notNull(),
  createdBy: text("createdBy"),
  editedDate: timestamp("editedDate")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  editedBy: text("editedBy"),
};
