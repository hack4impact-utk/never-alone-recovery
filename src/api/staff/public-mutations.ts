"use server";

import { updateStaff } from "@/api/staff/private-mutations";
import { StaffRole } from "@/types/enums";
import { Result } from "@/types/result";
import { User } from "@/types/schema";
import getUserSession from "@/utils/auth/get-user-session";

import { addAudit } from "../audit/private-mutations";

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
 
  const [, updateStaffError] = await updateStaff({ ...user, role: role });

  if (!updateStaffError){
    return [null, "Error updating role"];
  }

  await addAudit({
    staffId: session.user.id,
    clientId: null,
    type: "staff_role_changed",
    message: `Staff role updated to ${role}`,
  });

  return await updateStaff({ ...user, role });
}
