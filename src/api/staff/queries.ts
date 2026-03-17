import { ne, sql } from "drizzle-orm";

import db from "@/db";
import { users } from "@/db/schema";
import type { HousingManager } from "@/types/housing-manager";
import { Result } from "@/types/result";
import { User } from "@/types/schema";
import getUserSession from "@/utils/auth/get-user-session";
import handleError from "@/utils/handle-error";

export async function getAllStaff(): Promise<Result<User[]>> {
  const session = await getUserSession();

  if (!session) {
    return [null, "Unauthorized"];
  }

  try {
    const staff = await db.query.users.findMany({
      orderBy: [sql`SPLIT_PART(${users.name}, ' ', -1)`],
    });
    return [staff, null];
  } catch (error) {
    return [null, handleError(error)];
  }
}

export async function getValidHousingManagers(): Promise<
  Result<HousingManager[]>
> {
  const session = await getUserSession();

  if (!session) {
    return [null, "Unauthorized"];
  }

  try {
    const staff = await db
      .select({
        id: users.id,
        name: users.name,
      })
      .from(users)
      .where(ne(users.role, "disabled"));

    return [staff, null];
  } catch (error) {
    return [null, handleError(error)];
  }
}
