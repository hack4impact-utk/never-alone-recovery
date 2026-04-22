import db from "@/db";
import { donations } from "@/db/schema";
import { donors } from "@/db/schema/donor";
import { Result } from "@/types/result";
import { Donor, NewDonation, NewDonor } from "@/types/schema";
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

export async function insertDonation(
  donation: NewDonation[],
): Promise<Result<null>> {
  try {
    await db.insert(donations).values(donation);
    return [null, null];
  } catch (error) {
    return [null, handleError(error)];
  }
}
