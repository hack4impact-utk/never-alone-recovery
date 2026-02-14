"use server";

import { Result } from "@/types/result";
import { Client } from "@/types/schema";

import { updateClient } from "./private-mutations";

export async function graduateClient(client: Client): Promise<Result<Client>> {
  return await updateClient({ ...client, status: "graduated" });
}

export async function dischargeClient(client: Client): Promise<Result<Client>> {
  return await updateClient({ ...client, status: "discharged" });
}
