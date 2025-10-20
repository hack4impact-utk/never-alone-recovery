"use client";

import { Card, CardContent } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { ReactNode } from "react";

import LoginCardContent from "./login-card-content";

export default function LoginCard(): ReactNode {
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

  const callbackUrl = searchParams.get("callbackUrl");

  return (
    <Card
      sx={{
        maxWidth: 400,
        width: "90%",
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <CardContent sx={{ p: 4, textAlign: "center" }}>
        <LoginCardContent
          session={session}
          status={status}
          callbackUrl={callbackUrl}
        />
      </CardContent>
    </Card>
  );
}
