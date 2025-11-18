"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Link from "next/link";
import { ReactNode } from "react";

import ProfilePicture from "./profile-picture";

export default function ResponsiveAppBar(): ReactNode {
  return (
    <AppBar
      position="static"
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
            <ProfilePicture />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
