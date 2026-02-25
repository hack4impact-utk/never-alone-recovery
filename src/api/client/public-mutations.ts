"use server";

import { Result } from "@/types/result";
import { Client } from "@/types/schema";
import getUserSession from "@/utils/auth/get-user-session";

import { addAudit } from "../audit/private-mutations";
import { updateClient } from "./private-mutations";

export async function graduateClient(client: Client): Promise<Result<Client>> {
  const session = await getUserSession();

  if (!session) {
    return [null, "Unauthorized"];
  }

  const [updatedClient, error] = await updateClient({
    ...client,
    status: "graduated",
  });

  if (!updatedClient || error) {
    return [null, error];
  }

  await addAudit({
    staffId: session.user.id,
    clientId: client.id,
    type: "client_graduation",
    message: `Graduated client ${client.firstName} ${client.lastName}`,
  });

  return [updatedClient, null];
}

export async function dischargeClient(client: Client): Promise<Result<Client>> {
  const session = await getUserSession();

  if (!session) {
    return [null, "Unauthorized"];
  }

  const [updatedClient, error] = await updateClient({
    ...client,
    status: "discharged",
  });

  if (!updatedClient || error) {
    return [null, error];
  }

  await addAudit({
    staffId: session.user.id,
    clientId: client.id,
    type: "client_discharge",
    message: `Discharged client ${client.firstName} ${client.lastName}`,
  });

  return [updatedClient, null];
}
