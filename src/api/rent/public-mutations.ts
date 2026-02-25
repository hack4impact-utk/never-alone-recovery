"use server";

import { Result } from "@/types/result";
import { NewRentTransaction } from "@/types/schema";
import getUserSession from "@/utils/auth/get-user-session";

import { addAudit } from "../audit/private-mutations";
import { insertTransactions } from "./private-mutations";

export async function chargeAllClients(
  transactions: NewRentTransaction[],
): Promise<Result<null>> {
  const session = await getUserSession();

  if (!session) {
    return [null, "Unauthorized"];
  }

  transactions = transactions.map((transaction) => ({
    ...transaction,
    staffId: session.user.id,
  }));

  const [, error] = await insertTransactions(transactions);

  if (!error) {
    await addAudit({
      staffId: transactions[0].staffId,
      clientId: null,
      type: "rent_charge",
      message: `Charged all clients $${transactions[0].amount} for rent`,
    });
  }

  return [null, error];
}

export async function addTransaction(
  transaction: NewRentTransaction,
): Promise<Result<null>> {
  const session = await getUserSession();

  if (!session) {
    return [null, "Unauthorized"];
  }

  transaction.staffId = session.user.id;

  const [, transactionError] = await insertTransactions([transaction]);

  if (transactionError) {
    return [null, transactionError];
  }

  const message =
    transaction.type === "charge"
      ? `Charged client $${transaction.amount} for rent`
      : `Recorded rent payment of $${transaction.amount} from client`;

  await addAudit({
    staffId: transaction.staffId,
    clientId: transaction.clientId,
    type: transaction.type === "charge" ? "rent_charge" : "rent_payment",
    message: message,
  });

  return [null, null];
}
