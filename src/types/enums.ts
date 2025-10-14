import {
  auditTypeEnum,
  clientStatusEnum,
  staffRoleEnum,
  taskTypeEnum,
  transactionType,
} from "@/db/schema";

export const STAFF_ROLE_VALUES = staffRoleEnum.enumValues;
export type StaffRole = (typeof STAFF_ROLE_VALUES)[number];

export const CLIENT_STATUS_VALUES = clientStatusEnum.enumValues;
export type ClientStatus = (typeof CLIENT_STATUS_VALUES)[number];

export const TASK_TYPE_VALUES = taskTypeEnum.enumValues;
export type TaskType = (typeof TASK_TYPE_VALUES)[number];

export const TRANSACTION_TYPE_VALUES = transactionType.enumValues;
export type TransactionType = (typeof TRANSACTION_TYPE_VALUES)[number];

export const AUDIT_TYPE_VALUES = auditTypeEnum.enumValues;
export type AuditType = (typeof AUDIT_TYPE_VALUES)[number];
