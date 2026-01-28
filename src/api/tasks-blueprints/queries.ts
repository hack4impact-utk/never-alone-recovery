"use server";

import { asc, eq } from "drizzle-orm";

import db from "@/db";
import { taskBlueprints } from "@/db/schema";
import { Result } from "@/types/result";
import handleError from "@/utils/handle-error";
import { TaskBlueprint } from "@/types/schema";

export async function getClientTasksBlueprints(
  clientId: string,
): Promise<Result<TaskBlueprint[]>> {
  try {
    const clientTasks = await db.query.taskBlueprints.findMany({
      where: eq(taskBlueprints.clientId, clientId),
      orderBy: [asc(taskBlueprints.description)],
    });

    return [clientTasks, null];
  } catch (error) {
    return [null, handleError(error)];
  }
}
