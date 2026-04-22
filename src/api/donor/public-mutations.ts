"use server";

import { Result } from "@/types/result";
import { Donor, NewDonation, NewDonor } from "@/types/schema";
import getUserSession from "@/utils/auth/get-user-session";

import { insertDonation, insertDonor } from "./private-mutations";

export async function createDonor(donor: NewDonor): Promise<Result<Donor>> {
  const session = await getUserSession();

  if (!session) {
    return [null, "Unauthorized"];
  }

  return await insertDonor(donor);
}

export async function addDonation(
  donation: NewDonation,
): Promise<Result<null>> {
  const session = await getUserSession();

  if (!session) {
    return [null, "Unauthorized"];
  }

  const [, donationError] = await insertDonation([donation]);

  if (donationError) {
    return [null, donationError];
  }

  return [null, null];
}
