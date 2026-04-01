"use server";

import { Result } from "@/types/result";
import { Donor, NewDonor } from "@/types/schema";
import getUserSession from "@/utils/auth/get-user-session";

import { insertDonor } from "./private-mutations";

export async function createDonor(
  donor: NewDonor,
): Promise<Result<Donor>> {
  const session = await getUserSession();

  if (!session) {
    return [null, "Unauthorized"];
  }

  return await insertDonor(donor);
}
