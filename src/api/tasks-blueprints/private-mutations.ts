import { eq } from "drizzle-orm";

import db from "@/db";
import { taskBlueprints } from "@/db/schema";
import { Result } from "@/types/result"; // Import Result type
import { TaskBlueprint } from "@/types/schema";
import handleError from "@/utils/handle-error";

export async function addTaskBlueprint(
  task: Omit<
    TaskBlueprint,
    "id" | "createdDate" | "createdById" | "editedDate" | "editedById"
  >,
): Promise<Result<TaskBlueprint>> {
  if (!task.staffId || !task.clientId) {
    return [
      null,
      "Both 'staffId' and 'clientId' are required for task creation.",
    ];
  }

  try {
    const [newTask] = await db
      .insert(taskBlueprints)
      .values({
        description: task.description,
        clientId: task.clientId,
        staffId: task.staffId,
      })
      .returning();

    return [newTask, null];
  } catch (error) {
    return [null, handleError(error)];
  }
}

export async function updateTaskBlueprint(
  task: Partial<TaskBlueprint> & Pick<TaskBlueprint, "id">,
): Promise<Result<TaskBlueprint>> {
  try {
    const updatedTaskBlueprints = await db
      .update(taskBlueprints)
      .set(task)
      .where(eq(taskBlueprints.id, task.id))
      .returning();

    const updatedTaskBlueprint = updatedTaskBlueprints[0];

    if (!updatedTaskBlueprint) {
      return [null, "Task Blueprint not found"];
    }

    return [updatedTaskBlueprint, null];
  } catch (error) {
    return [null, handleError(error)];
  }
}

export async function deleteTaskBlueprint(
  taskId: string,
): Promise<Result<null>> {
  try {
    await db.delete(taskBlueprints).where(eq(taskBlueprints.id, taskId));

    return [null, null];
  } catch (error) {
    return [null, handleError(error)];
  }
}
