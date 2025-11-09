import db from "@/db";
import { Result } from "@/types/result";
import { Audit } from "@/types/schema";
import handleError from "@/utils/handle-error";

export async function getAllAudits(): Promise<Result<Audit[]>> {
  try {
    const audits = await db.query.audits.findMany();
    return [audits, null];
  } catch (error) {
    return [null, handleError(error)];
  }
}
