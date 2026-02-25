import db from "@/db";
import { audits } from "@/db/schema/audit";
import { Result } from "@/types/result";
import { NewAudit } from "@/types/schema";
import handleError from "@/utils/handle-error";

export async function addAudit(audit: NewAudit): Promise<Result<null>> {
  try {
    await db.insert(audits).values(audit);
    return [null, null];
  } catch (error) {
    return [null, handleError(error)];
  }
}
