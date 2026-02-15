/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { DefaultSession } from "next-auth";

import { User } from "@/types/schema";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: User;
  }
}
