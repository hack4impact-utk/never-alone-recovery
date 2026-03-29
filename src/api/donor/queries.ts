import db from "@/db";
import { Result } from "@/types/result";
import { Donor } from "@/types/schema";
import getUserSession from "@/utils/auth/get-user-session";
import handleError from "@/utils/handle-error";

export async function getAllDonors(): Promise<Result<Donor[]>> {
  const session = await getUserSession();

  if (!session) {
    return [null, "Unauthorized"];
  }

  try {
    const donors = await db.query.donors.findMany();
    return [donors, null];
  } catch (error) {
    return [null, handleError(error)];
  }
}
