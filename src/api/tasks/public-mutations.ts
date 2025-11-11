"use server";

import { Result } from "@/types/result";
import { Task } from "@/types/schema";

import { updateTask } from "./private-mutations";

export async function markTaskAsCompleted(task: Task): Promise<Result<Task>> {
  return await updateTask({ ...task, completed: true });
}

export async function markTaskAsIncomplete(task: Task): Promise<Result<Task>> {
  return await updateTask({ ...task, completed: false });
}
