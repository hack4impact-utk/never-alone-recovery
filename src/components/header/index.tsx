"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ReactNode, useState, useEffect } from "react";

import ProfilePicture from "./profile-picture";

export default function Header(): ReactNode {
  const [validSession, setValidSession] = useState(false); 
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      setValidSession(false);
      return;
    } else {
      setValidSession(true);
    }
  }, [session]); // Dependency on session to update validSession

  return (
    <AppBar
      position="sticky"
      style={{ background: "white", width: "100%" }}
      sx={{
        boxShadow: 3,
      }}
    >
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            style={{ width: "100%" }}
          >
            <Link href="/">
              <Box
                component="img"
                src="/NeverAloneRecoveryLogo.svg"
                alt="NAR Logo"
                sx={{
                  height: 60,
                  width: 60,
                }}
              />
            </Link>
            {validSession && <ProfilePicture />}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
