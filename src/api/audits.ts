import { desc } from "drizzle-orm";

import db from "@/db";
import { audits } from "@/db/schema";
import { AuditWithClientAndStaff } from "@/types/audit-with-client-and-staff";
import { Result } from "@/types/result";
import handleError from "@/utils/handle-error";

export async function getAllAudits(): Promise<
  Result<AuditWithClientAndStaff[]>
> {
  try {
    const res = await db.query.audits.findMany({
      with: {
        staff: true,
        client: true,
      },
      orderBy: [desc(audits.createdDate)],
    });
    return [res, null];
  } catch (error) {
    return [null, handleError(error)];
  }
}
