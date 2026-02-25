"use server";

import { asc, eq } from "drizzle-orm";

import db from "@/db";
import { taskBlueprints } from "@/db/schema";
import { Result } from "@/types/result";
import { TaskBlueprint } from "@/types/schema";
import getUserSession from "@/utils/auth/get-user-session";
import handleError from "@/utils/handle-error";

export async function getClientTasksBlueprints(
  clientId: string,
): Promise<Result<TaskBlueprint[]>> {
  const session = await getUserSession();

  if (!session) {
    return [null, "Unauthorized"];
  }

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
