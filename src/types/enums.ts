export const STAFF_ROLE_VALUES = ["disabled", "staff", "admin"] as const;
export type StaffRole = (typeof STAFF_ROLE_VALUES)[number];

export const CLIENT_STATUS_VALUES = [
  "discharged",
  "resident",
  "graduated",
] as const;
export type ClientStatus = (typeof CLIENT_STATUS_VALUES)[number];

export const TASK_TYPE_VALUES = ["drug_test", "meeting"] as const;
export type TaskType = (typeof TASK_TYPE_VALUES)[number];

export const TRANSACTION_TYPE_VALUES = ["charge", "payment"] as const;
export type TransactionType = (typeof TRANSACTION_TYPE_VALUES)[number];

export const AUDIT_TYPE_VALUES = [
  "rent_payment",
  "rent_charge",
  "client_discharge",
  "client_enrollment",
  "client_graduation",
  "client_staff_changed",
  "client_task_completed",
  "staff_role_changed",
] as const;
export type AuditType = (typeof AUDIT_TYPE_VALUES)[number];
