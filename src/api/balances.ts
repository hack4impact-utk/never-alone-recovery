import { asc, eq, sql } from "drizzle-orm";

import db from "@/db";
import { clients, rentTransactions } from "@/db/schema";
import { Balance } from "@/types/balance";
import { Result } from "@/types/result";
import handleError from "@/utils/handle-error";

const calculateClientBalance = sql<number>`
  COALESCE(SUM(
    CASE 
      WHEN ${rentTransactions.type} = 'charge' THEN ${rentTransactions.amount}::numeric
      WHEN ${rentTransactions.type} = 'payment' THEN -1 * ${rentTransactions.amount}::numeric
      ELSE 0 
    END
  ), 0)
`;

export async function getAllClientBalances(): Promise<Result<Balance[]>> {
  try {
    const balances = await db
      .select({
        client: clients,
        total: calculateClientBalance,
      })
      .from(rentTransactions)
      .innerJoin(clients, eq(rentTransactions.clientId, clients.id))
      .groupBy(clients.id)
      .orderBy(asc(clients.lastName));

    console.log(balances);

    return [balances, null];
  } catch (error) {
    return [null, handleError(error)];
  }
}
