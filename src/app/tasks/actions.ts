"use server";

import { eq, ne, sql } from "drizzle-orm";

import db from "@/db";
import { audits } from "@/db/schema/audit";
import { clients } from "@/db/schema/client";
import { tasks } from "@/db/schema/task";
import { taskBlueprints } from "@/db/schema/task-blueprint";
import { users } from "@/db/schema/user";

export async function generateWeeklyTasks(
  staffId: string,
): Promise<[number, null] | [null, string]> {
  try {
    const blueprints = await db
      .select({
        description: taskBlueprints.description,
        clientId: taskBlueprints.clientId,
      })
      .from(taskBlueprints)
      .innerJoin(clients, eq(taskBlueprints.clientId, clients.id))
      .where(ne(clients.status, "discharged"));

    if (blueprints.length === 0) {
      return [0, null];
    }

    const newEntries = blueprints.map((bp) => ({
      description: bp.description,
      clientId: bp.clientId,
      staffId: staffId,
      completed: false,
    }));

    const insertedRows = await db.insert(tasks).values(newEntries).returning();

    return [insertedRows.length, null];
  } catch (error) {
    console.error("Task Generation Error:", error);
    return [null, "Failed to generate tasks due to a database error."];
  }
}

/**
 * Identifies staff with incomplete tasks and logs a summary message to the audit table.
 */
export async function auditIncompleteTasks(): Promise<
  [number, null] | [null, string]
> {
  try {
    // 1. QUERY THE DATABASE
    const incompleteResults = await db
      .select({
        staffId: tasks.staffId,
        staffName: users.name,
        uncompletedCount: sql<number>`count(${tasks.id})`.mapWith(Number),
      })
      .from(tasks)
      .innerJoin(users, eq(tasks.staffId, users.id))
      .where(eq(tasks.completed, false))
      .groupBy(tasks.staffId, users.name);

    // 2. CHECK IF DATA EXISTS
    if (incompleteResults.length === 0) {
      return [0, null];
    }

    // 3. TRANSFORM DATA FOR AUDIT LOG
    const auditEntries = incompleteResults.map((res) => ({
      staffId: res.staffId,
      type: "incomplete_tasks" as const,
      message: `${res.staffName} has not completed ${res.uncompletedCount} tasks this week.`,
    }));

    // 4. INSERT INTO AUDIT TABLE
    const result = await db.insert(audits).values(auditEntries).returning();

    return [result.length, null];
  } catch (error) {
    console.error("Incomplete Task Audit Error:", error);
    return [null, "Failed to create audit logs."];
  }
}
