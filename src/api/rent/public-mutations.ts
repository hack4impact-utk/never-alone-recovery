"use server";

import { Result } from "@/types/result";
import { NewRentTransaction } from "@/types/schema";

import { insertTransactions } from "./private-mutations";

export async function chargeAllClients(
  transactions: NewRentTransaction[],
): Promise<Result<null>> {
  return await insertTransactions(transactions);
}

export async function addTransaction(
  transaction: NewRentTransaction,
): Promise<Result<null>> {
  return await insertTransactions([transaction]);
}
