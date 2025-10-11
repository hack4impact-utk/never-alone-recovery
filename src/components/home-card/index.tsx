"use client";

import { Card, CardContent } from "@mui/material";
import { useSession } from "next-auth/react";
import { ReactNode } from "react";

import HomeCardContent from "./home-card-content";

export default function HomeCard(): ReactNode {
  const { data: session, status } = useSession();

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
        <HomeCardContent session={session} status={status} />
      </CardContent>
    </Card>
  );
}
