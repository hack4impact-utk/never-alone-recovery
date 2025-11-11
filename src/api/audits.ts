import { desc, eq, sql } from "drizzle-orm";

import db from "@/db";
import { audits, clients, users } from "@/db/schema";
import { Audit } from "@/types/audit";
import { Result } from "@/types/result";
import handleError from "@/utils/handle-error";

export async function getAllAudits(): Promise<Result<Audit[]>> {
  try {
    const res = await db
      .select({
        id: audits.id,
        createdDate: audits.createdDate,
        staffName: users.name,
        clientName: sql<
          string | null
        >`${clients.firstName} || ' ' || ${clients.lastName}`,
        type: audits.type,
        message: audits.message,
      })
      .from(audits)
      .leftJoin(clients, eq(audits.clientId, clients.id))
      .leftJoin(users, eq(audits.staffId, users.id))
      .orderBy(desc(audits.createdDate));
    return [res, null];
  } catch (error) {
    return [null, handleError(error)];
  }
}
