import { eq } from "drizzle-orm";

import db from "@/db";
import { clients } from "@/db/schema/client";
import { Result } from "@/types/result";
import { Client } from "@/types/schema";
import handleError from "@/utils/handle-error";


export async function updateClient(client:Client): Promise<Result<Client>>{
  try {
    const updatedClients = await db
      .update(clients)
      .set(client)
      .where(eq(clients.id, client.id))
      .returning();

    const updatedClient = updatedClients[0];

    if (!updatedClient) {
      return [null, "Client not found"];
    }

    return [updatedClient, null];
  } catch (error) {
    return [null, handleError(error)];
  }
}
