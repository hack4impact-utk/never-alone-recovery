"use server";

import { eq, ne } from "drizzle-orm";

import db from "@/db";
import { clients } from "@/db/schema/client";
import { tasks } from "@/db/schema/task";
import { taskBlueprints } from "@/db/schema/task-blueprint";

export async function generateWeeklyTasks(
  staffId: string,
): Promise<[number, null] | [null, string]> {
  try {
    // 1. Fetch blueprints for active clients
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

    // 2. Map to 'tasks' schema
    // Note: completed defaults to false, and baseSchema usually handles id/timestamps
    const newEntries = blueprints.map((bp) => ({
      description: bp.description,
      clientId: bp.clientId,
      staffId: staffId, // Assigned to the staff member running the generator
      completed: false,
    }));

    // 3. Insert
    const insertedRows = await db.insert(tasks).values(newEntries).returning();

    return [insertedRows.length, null];
  } catch (error) {
    console.error("Task Generation Error:", error);
    return [null, "Failed to generate tasks due to a database error."];
  }
}
