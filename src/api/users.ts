import db from "@/db";
import { Result } from "@/types/result";
import { User } from "@/types/schema";
import handleError from "@/utils/handle-error";

export async function getAllUsers(): Promise<Result<User[]>> {
  try {
    const users = await db.query.users.findMany();
    return [users, null];
  } catch (error) {
    return [null, handleError(error)];
  }
}

/**
 *
 * These three functions are examples of how to use the db object to perform CRUD operations.
 * The create, update, and delete functions are server actions (as indicated by the "use server" directive
 * and can be called from the client side.
 * In the future, make sure these functions are protected by authentication.
 */

// export async function createUser(user: NewUser): Promise<User> {
//   "use server";
//   const newUser = await db.insert(users).values(user).returning();
//   return newUser[0];
// }

// export async function updateUser(user: User): Promise<User> {
//   "use server";
//   const updatedUser = await db
//     .update(users)
//     .set(user)
//     .where(eq(users.id, user.id))
//     .returning();
//   return updatedUser[0];
// }

// export async function deleteUser(id: string): Promise<void> {
//   "use server";
//   await db.delete(users).where(eq(users.id, id));
// }
