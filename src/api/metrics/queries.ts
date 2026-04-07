import { between, sql } from "drizzle-orm";

import db from "@/db";
import { audits } from "@/db/schema/audit";
import { Metrics } from "@/types/metrics";
import { Result } from "@/types/result";
import getUserSession from "@/utils/auth/get-user-session";
import handleError from "@/utils/handle-error";

// Given a start and end date
// Return the number of enrollments, discharges, and graduates within that time period.
export async function getFilteredMetrics(
  startDate: Date,
  endDate: Date,
): Promise<Result<Metrics>> {
  const session = await getUserSession();

  if (!session) {
    return [null, "Unauthorized"];
  }

  try {
    const metrics = (await db
      .select({
        totalEnrollments: sql<number>`count(*) filter (where ${audits.type} = 'client_enrollment')`,
        totalDischarges: sql<number>`count(*) filter (where ${audits.type} = 'client_discharge')`,
        totalGraduates: sql<number>`count(*) filter (where ${audits.type} = 'client_graduation')`,
      })
      .from(audits)
      .where(
        between(audits.createdDate, startDate, endDate),
      )) as unknown as Metrics;

    return [metrics ?? [], null];
  } catch (error) {
    return [null, handleError(error)];
  }
}

// Return the total number of enrollments, discharges, and graduates.
export async function getAllMetrics(): Promise<Result<Metrics>> {
  try {
    const metrics = (await db
      .select({
        totalEnrollments: sql<number>`count(*) filter (where ${audits.type} = 'client_enrollment')`,
        totalDischarges: sql<number>`count(*) filter (where ${audits.type} = 'client_discharge')`,
        totalGraduates: sql<number>`count(*) filter (where ${audits.type} = 'client_graduation')`,
      })
      .from(audits)) as unknown as Metrics;

    return [metrics ?? [], null];
  } catch (error) {
    return [null, handleError(error)];
  }
}
