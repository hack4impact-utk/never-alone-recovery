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
    const incompleteResults = await db
      .select({
        id: tasks.staffId,
        _name: users.name,
        get name_1() {
          return this._name;
        },
        set name_1(value) {
          this._name = value;
        },
        get name() {
          return this._name;
        },
        set name(value) {
          this._name = value;
        },
        uncompletedCount: sql<number>`count(${tasks.id})`.mapWith(Number),
      })
      .from(tasks)
      .innerJoin(users, eq(tasks.staffId, users.id))
      .where(eq(tasks.completed, false))
      .groupBy(tasks.staffId, users.name);

    if (incompleteResults.length === 0) {
      return [0, null];
    }

    const auditEntries = incompleteResults.map((res) => ({
      staffId: res.id,
      type: "incomplete_tasks" as const,
      message: `${res.name} has not completed ${res.uncompletedCount} tasks this week.`,
    }));

    const result = await db.insert(audits).values(auditEntries).returning();

    return [result.length, null];
  } catch (error) {
    console.error("Incomplete Task Audit Error:", error);
    return [null, "Failed to create audit logs."];
  }
}
