import db from "@/db";
import { Result } from "@/types/result";
import { Client } from "@/types/schema";
import handleError from "@/utils/handle-error";

export async function getAllClients(): Promise<Result<Client[]>> {
  try {
    const clients = await db.query.clients.findMany();
    return [clients, null];
  } catch (error) {
    return [null, handleError(error)];
  }
}
