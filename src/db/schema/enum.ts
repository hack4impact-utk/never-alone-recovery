import { pgEnum } from "drizzle-orm/pg-core";

import {
  AUDIT_TYPE_VALUES,
  CLIENT_STATUS_VALUES,
  STAFF_ROLE_VALUES,
  TASK_TYPE_VALUES,
  TRANSACTION_TYPE_VALUES,
} from "@/types/enums";

export const staffRoleEnum = pgEnum("staff_role", STAFF_ROLE_VALUES);

export const clientStatusEnum = pgEnum("client_status", CLIENT_STATUS_VALUES);

export const taskTypeEnum = pgEnum("task_type", TASK_TYPE_VALUES);

export const auditTypeEnum = pgEnum("audit_type", AUDIT_TYPE_VALUES);

export const transactionType = pgEnum(
  "transaction_type",
  TRANSACTION_TYPE_VALUES,
);
