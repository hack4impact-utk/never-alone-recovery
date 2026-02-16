"use server";

import { updateStaffRole } from "@/api/staff/private-mutations";
import { StaffRole } from "@/types/enums";
import { Result } from "@/types/result";
import { User } from "@/types/schema";
import getUserSession from "@/utils/auth/get-user-session";

export async function updateStaff(
  userId: string,
  role: StaffRole,
): Promise<Result<User>> {
  const session = await getUserSession();

  if (!session?.user?.email) {
    return [null, "Unauthorized"];
  }

  // fetches the user being updated to check their email
  const { default: db } = await import("@/db");
  const { eq } = await import("drizzle-orm");
  const { users } = await import("@/db/schema");

  const targetUsers = await db.query.users.findMany({
    where: eq(users.id, userId),
  });

  const targetUser = targetUsers[0];

  if (!targetUser) {
    return [null, "Staff member not found"];
  }

  // Prevent changing own role
  if (targetUser.email === session.user.email) {
    return [null, "You cannot change your own role"];
  }

  return await updateStaffRole(userId, role);
}
