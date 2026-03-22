"use server";

import { Result } from "@/types/result";
import { Task } from "@/types/schema";
import getUserSession from "@/utils/auth/get-user-session";

import { addAudit } from "../audit/private-mutations";
import { updateTask } from "./private-mutations";

export async function markTaskAsCompleted(task: Task): Promise<Result<Task>> {
  const session = await getUserSession();

  if (!session) {
    return [null, "Unauthorized"];
  }

  const [, error] = await updateTask({ ...task, completed: true });

  if (!error) {
    await addAudit({
      staffId: session.user.id,
      clientId: task.clientId,
      type: "client_task_completed",
      message: `${task.description} completed`,
    });
  }

  return await updateTask({ ...task, completed: true });
}

export async function markTaskAsIncomplete(task: Task): Promise<Result<Task>> {
  return await updateTask({ ...task, completed: false });
}
