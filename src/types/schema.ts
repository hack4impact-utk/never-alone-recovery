import { InferInsertModel, InferSelectModel } from "drizzle-orm";

import {
  audits,
  rentTransactions,
  tasks,
  users,
  taskBlueprints,
} from "@/db/schema";
import { clients } from "@/db/schema/client";
import { intakeForms } from "@/db/schema/intake-form";

export type Audit = InferSelectModel<typeof audits>;
export type NewAudit = InferInsertModel<typeof audits>;

export type Client = InferSelectModel<typeof clients>;
export type NewClient = InferInsertModel<typeof clients>;

export type IntakeForm = InferSelectModel<typeof intakeForms>;
export type NewIntakeForm = InferInsertModel<typeof intakeForms>;

export type RentTransaction = InferSelectModel<typeof rentTransactions>;
export type NewRentTransaction = InferInsertModel<typeof rentTransactions>;

export type Task = InferSelectModel<typeof tasks>;
export type NewTask = InferInsertModel<typeof tasks>;

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

export type TaskBlueprint = InferSelectModel<typeof taskBlueprints>;
export type NewTaskBlueprint = InferInsertModel<typeof taskBlueprints>;
