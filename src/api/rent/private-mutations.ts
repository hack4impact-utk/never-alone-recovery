import db from "@/db";
import { rentTransactions } from "@/db/schema/rent-transaction";
import { Result } from "@/types/result";
import { NewRentTransaction } from "@/types/schema";
import handleError from "@/utils/handle-error";

export async function insertTransactions(
  transactions: NewRentTransaction[],
): Promise<Result<null>> {
  try {
    await db.insert(rentTransactions).values(transactions);
    return [null, null];
  } catch (error) {
    return [null, handleError(error)];
  }
}
