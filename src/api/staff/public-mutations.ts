"use server";

import { updateStaff } from "@/api/staff/private-mutations";
import { StaffRole } from "@/types/enums";
import { Result } from "@/types/result";
import { User } from "@/types/schema";
import getUserSession from "@/utils/auth/get-user-session";

export async function updateStaffRole(
  user: User,
  role: StaffRole,
): Promise<Result<User>> {
  const session = await getUserSession();

  if (!session) {
    return [null, "Unauthorized"];
  }

  if (session.user.email === user.email) {
    return [null, "Forbidden"];
  }

  return await updateStaff({ ...user, role });
}
