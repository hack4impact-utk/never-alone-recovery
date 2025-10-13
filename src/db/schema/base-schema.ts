import { text, timestamp } from "drizzle-orm/pg-core";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withBaseColumns<T extends Record<string, any>>(
  customColumns: T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Record<string, any> {
  return {
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
    ...customColumns,
  };
}
