"use server";

import { Result } from "@/types/result";
import { TaskBlueprint } from "@/types/schema";
import handleError from "@/utils/handle-error";

import { updateTaskBlueprint } from "./private-mutations";

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

export async function deleteTaskBlueprint(id: string): Promise<Result<null>> {
  try {
    return await deleteTaskBlueprint(id);
  } catch (error) {
    return [null, handleError(error)];
  }
}
