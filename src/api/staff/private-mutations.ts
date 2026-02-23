import { eq } from "drizzle-orm";

import db from "@/db";
import { users } from "@/db/schema";
import { Result } from "@/types/result";
import { User } from "@/types/schema";
import handleError from "@/utils/handle-error";

export async function updateStaff(task: User): Promise<Result<User>> {
  try {
    const updatedUsers = await db
      .update(users)
      .set(task)
      .where(eq(users.id, task.id))
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
