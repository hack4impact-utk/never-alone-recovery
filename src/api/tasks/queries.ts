import db from "@/db";
import { ClientTasks } from "@/types/client-tasks";
import { Result } from "@/types/result";
import getUserSession from "@/utils/auth/get-user-session";
import handleError from "@/utils/handle-error";

export async function getAllClientTasks(): Promise<Result<ClientTasks[]>> {
  const session = await getUserSession();

  if (!session) {
    return [null, "Unauthorized"];
  }

  try {
    const clients = await db.query.clients.findMany({
      with: { tasks: true },
    });
    return [clients, null];
  } catch (error) {
    return [null, handleError(error)];
  }
}
