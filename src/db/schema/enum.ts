import { pgEnum } from "drizzle-orm/pg-core";

export const staffRoleEnum = pgEnum("staff_role", [
  "disabled",
  "staff",
  "admin",
]);

export const clientStatusEnum = pgEnum("client_status", [
  "discharged",
  "resident",
  "graduated",
]);

export const taskTypeEnum = pgEnum("task_type", ["drug_test", "meeting"]);

export const auditTypeEnum = pgEnum("audit_type", [
  "rent_payment",
  "rent_charge",
  "client_discharge",
  "client_enrollment",
  "client_graduation",
  "client_staff_changed",
  "client_task_completed",
  "staff_role_changed",
]);

export const transactionType = pgEnum("transaction_type", [
  "charge",
  "payment",
]);
