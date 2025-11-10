"use server";

import { eq } from "drizzle-orm";

import db from "@/db";
import { tasks } from "@/db/schema/task";
import { ClientTasks } from "@/types/client-tasks";
import { Result } from "@/types/result";
import { Task } from "@/types/schema";
import handleError from "@/utils/handle-error";

export async function getAllClientTasks(): Promise<Result<ClientTasks[]>> {
  try {
    const clients = await db.query.clients.findMany({
      with: { tasks: true },
    });
    return [clients, null];
  } catch (error) {
    return [null, handleError(error)];
  }
}

async function updateTask(task: Task): Promise<Result<Task>> {
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

export async function markTaskAsCompleted(task: Task): Promise<Result<Task>> {
  return updateTask({ ...task, completed: true });
}

export async function markTaskAsIncomplete(task: Task): Promise<Result<Task>> {
  return updateTask({ ...task, completed: false });
}
