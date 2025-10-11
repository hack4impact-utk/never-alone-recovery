"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

type NextAuthProviderProps = {
  children: ReactNode;
};

export default function NextAuthProvider({
  children,
}: Readonly<NextAuthProviderProps>): ReactNode {
  return <SessionProvider>{children}</SessionProvider>;
}
