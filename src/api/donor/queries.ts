import { asc, eq, sql } from "drizzle-orm";

import db from "@/db";
import { donations, donors } from "@/db/schema";
import { DonorTotal } from "@/types/donor-total";
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
    const allDonors = await db.query.donors.findMany();
    return [allDonors, null];
  } catch (error) {
    return [null, handleError(error)];
  }
}

const calculateDonorTotal = sql<number>`
  COALESCE(SUM(${donations.amount}::numeric), 0)
`;

export async function getAllDonorTotals(): Promise<Result<DonorTotal[]>> {
  const session = await getUserSession();

  if (!session) {
    return [null, "Unauthorized"];
  }

  try {
    const totals = await db
      .select({
        donor: donors,
        total: calculateDonorTotal,
      })
      .from(donors)
      .leftJoin(donations, eq(donations.donorId, donors.id))
      .groupBy(donors.id)
      .orderBy(asc(donors.lastName));

    return [totals ?? [], null];
  } catch (error) {
    return [null, handleError(error)];
  }
}
