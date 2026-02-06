import { eq } from "drizzle-orm";

import db from "@/db";
import { users } from "@/db/schema";
import { StaffRole } from "@/types/enums";
import { Result } from "@/types/result";
import { User } from "@/types/schema";
import handleError from "@/utils/handle-error";

export async function updateStaffRole(
  userId: string,
  role: StaffRole,
): Promise<Result<User>> {
  try {
    const updatedUsers = await db
      .update(users)
      .set({ role })
      .where(eq(users.id, userId))
      .returning();

    const updatedUser = updatedUsers[0];

    if (!updatedUser) {
      return [null, "Staff member not found"];
    }

    return [updatedUser, null];
  } catch (error) {
    return [null, handleError(error)];
  }
}
