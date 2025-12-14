"use server";

import { sql } from "drizzle-orm";

import db from "@/db";
import { tasks } from "@/db/schema";
import { Result } from "@/types/result";
import { Task } from "@/types/schema";
import handleError from "@/utils/handle-error";

export async function getClientTasks(
  clientId: string,
): Promise<Result<Task[]>> {
  try {
    const clientTasks = await db.query.tasks.findMany({
      where: sql`${tasks.clientId} = ${clientId}`, // SQL expression filter
      orderBy: [tasks.description],
    });
    return [clientTasks, null];
  } catch (error) {
    return [null, handleError(error)];
  }
}
