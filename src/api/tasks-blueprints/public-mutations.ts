"use server";

import { Result } from "@/types/result";
import { TaskBlueprint } from "@/types/schema";
import getUserSession from "@/utils/auth/get-user-session";
import handleError from "@/utils/handle-error";

import {
  addTaskBlueprint,
  deleteTaskBlueprint,
  updateTaskBlueprint,
} from "./private-mutations";

export async function createTaskBlueprint({
  description,
  clientId,
}: {
  description: string;
  clientId: string;
}): Promise<Result<TaskBlueprint>> {
  const session = await getUserSession();

  if (!session?.user) {
    return [null, "Unauthorized"];
  }

  try {
    const [newTaskBlueprint, error] = await addTaskBlueprint({
      description,
      clientId,
      staffId: session?.user?.id,
    });

    if (!newTaskBlueprint || error) {
      return [null, "Failed to create Task Blueprint"];
    }

    return [newTaskBlueprint, null];
  } catch (error) {
    return [null, handleError(error)];
  }
}

export async function updateDescriptionOnTaskBlueprint(
  id: string,
  description: string,
): Promise<Result<TaskBlueprint>> {
  try {
    const [updatedTaskBlueprint, error] = await updateTaskBlueprint({
      id,
      description,
    });

    if (!updatedTaskBlueprint || error) {
      return [null, "Failed to update Task Blueprint"];
    }

    return [updatedTaskBlueprint, null];
  } catch (error) {
    return [null, handleError(error)];
  }
}

export async function removeTaskBlueprint(id: string): Promise<Result<null>> {
  try {
    return await deleteTaskBlueprint(id);
  } catch (error) {
    return [null, handleError(error)];
  }
}
