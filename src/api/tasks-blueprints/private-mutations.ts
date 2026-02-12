"use server";

import { eq } from "drizzle-orm";

import db from "@/db";
import { taskBlueprints } from "@/db/schema";
import { Result } from "@/types/result"; // Import Result type
import handleError from "@/utils/handle-error";

export async function deleteTaskBlueprint(
  taskId: string,
): Promise<Result<null>> {
  try {
    await db.delete(taskBlueprints).where(eq(taskBlueprints.id, taskId));

    return [null, null];
  } catch (error) {
    handleError(error);
    return [null, "Error deleting task blueprint"];
  }
}
