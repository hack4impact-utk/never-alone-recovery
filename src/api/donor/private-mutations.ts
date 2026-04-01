import db from "@/db";
import { donors } from "@/db/schema/donor";
import { Result } from "@/types/result";
import { Donor, NewDonor } from "@/types/schema";
import handleError from "@/utils/handle-error";

export async function insertDonor(donor: NewDonor): Promise<Result<Donor>> {
  try {
    const inserted = await db.insert(donors).values(donor).returning();
    const newDonor = inserted[0];

    if (!newDonor) {
      return [null, "Failed to insert donor"];
    }

    return [newDonor, null];
  } catch (error) {
    return [null, handleError(error)];
  }
}
