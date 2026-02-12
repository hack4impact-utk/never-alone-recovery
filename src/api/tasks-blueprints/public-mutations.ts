"use server";

import { eq } from "drizzle-orm";

import db from "@/db";
import { taskBlueprints } from "@/db/schema";
import { Result } from "@/types/result";
import { TaskBlueprint } from "@/types/schema";
import handleError from "@/utils/handle-error";

export async function addOrUpdateTaskBlueprint(
  task: TaskBlueprint,
): Promise<Result<TaskBlueprint>> {
  try {
    //ensure that both 'staffId' and 'clientId' are provided
    if (!task.staffId || !task.clientId) {
      throw new Error(
        "Both 'staffId' and 'clientId' are required for task creation.",
      );
    }

    // If task has an ID, it's an update (otherwise new task to add)
    if (task.id) {
      const updatedTask = await db
        .update(taskBlueprints)
        .set({
          type: task.type,
          description: task.description,
          staffId: task.staffId,
        })
        .where(eq(taskBlueprints.id, task.id)) //update the task with the same ID
        .returning();

      return [updatedTask[0], null];
    } else {
      //insert a new task
      const [newTask] = await db
        .insert(taskBlueprints)
        .values({
          type: task.type,
          description: task.description,
          clientId: task.clientId,
          staffId: task.staffId,
        })
        .returning();

      return [newTask, null];
    }
  } catch (error) {
    handleError(error);
    return [null, "Error adding or updating task blueprint"];
  }
}
