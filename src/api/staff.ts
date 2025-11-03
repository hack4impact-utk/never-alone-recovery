import { sql } from "drizzle-orm";
import db from "@/db";
import { users } from "@/db/schema";
import { Result } from "@/types/result";
import { User } from "@/types/schema";
import handleError from "@/utils/handle-error";

export async function getAllStaff(): Promise<Result<User[]>> {
  try {
    const staff = await db.query.users.findMany({
      orderBy: [sql`SPLIT_PART(${users.name}, ' ', -1)`],
    });
    return [staff, null];
  } catch (error) {
    return [null, handleError(error)];
  }
}