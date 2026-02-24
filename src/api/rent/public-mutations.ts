"use server";

import { Result } from "@/types/result";
import { NewRentTransaction } from "@/types/schema";

import { insertTransactions } from "./private-mutations";

export async function chargeAllClients(
  transactions: NewRentTransaction[],
): Promise<Result<boolean>> {
  return await insertTransactions(transactions);
}
