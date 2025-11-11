import { Audit, Client, User } from "./schema";

export type AuditWithClientAndStaff = Audit & {
  staff: User | null;
  client: Client | null;
};
