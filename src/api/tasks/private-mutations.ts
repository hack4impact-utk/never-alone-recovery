import { eq } from "drizzle-orm";

import db from "@/db";
import { tasks } from "@/db/schema/task";
import { Result } from "@/types/result";
import { Task } from "@/types/schema";
import handleError from "@/utils/handle-error";

export async function updateTask(task: Task): Promise<Result<Task>> {
  try {
    const updatedTasks = await db
      .update(tasks)
      .set(task)
      .where(eq(tasks.id, task.id))
      .returning();

    const updatedTask = updatedTasks[0];

    if (!updatedTask) {
      return [null, "Task not found"];
    }

    return [updatedTask, null];
  } catch (error) {
    return [null, handleError(error)];
  }
}
