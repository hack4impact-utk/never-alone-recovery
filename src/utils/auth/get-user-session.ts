import { getServerSession, Session } from "next-auth";

import authOptions from "@/app/api/auth/[...nextauth]/auth-options";

// get session in server components
export default async function getUserSession(): Promise<Session | null> {
  const session = await getServerSession(authOptions);

  return session;
}
