import db from "@/db";
import { ClientTasks } from "@/types/client-tasks";
import { Result } from "@/types/result";
import handleError from "@/utils/handle-error";

export async function getAllClientTasks(): Promise<Result<ClientTasks[]>> {
  try {
    const clients = await db.query.clients.findMany({
      with: { tasks: true },
    });
    return [clients, null];
  } catch (error) {
    return [null, handleError(error)];
  }
}
