"use client";

import { Card, CardContent } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";

import LoginCardContent from "./login-card-content";

export default function LoginCard(): ReactNode {
  const searchParams = useSearchParams();
  const { status } = useSession();
  const router = useRouter();

  const callbackUrl = searchParams.get("callbackUrl");

  useEffect(() => {
    if (status === "authenticated") {
      router.replace(callbackUrl ?? "/");
    }
  }, [status, callbackUrl, router]);

  return (
    <Card
      sx={{
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <CardContent sx={{ p: 4, textAlign: "center" }}>
        <LoginCardContent status={status} callbackUrl={callbackUrl} />
      </CardContent>
    </Card>
  );
}
