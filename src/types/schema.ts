import { InferInsertModel, InferSelectModel } from "drizzle-orm";

import { users } from "@/db/schema";

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;
