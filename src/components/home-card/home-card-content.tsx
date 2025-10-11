import { Avatar, Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { ReactNode } from "react";

type HomeCardContentProps = {
  session: Session | null;
  status: "loading" | "authenticated" | "unauthenticated";
};

const handleSignIn = (): void => {
  void signIn("google");
};

const handleSignOut = (): void => {
  void signOut();
};

export default function HomeCardContent({
  session,
  status,
}: HomeCardContentProps): ReactNode {
  if (status === "loading") {
    return (
      <Typography variant="h6" color="text.secondary">
        Loading...
      </Typography>
    );
  }

  if (session) {
    return (
      <>
        <Avatar
          src={session.user?.image || undefined}
          alt={session.user?.name || "User"}
          sx={{
            width: 80,
            height: 80,
            mx: "auto",
            mb: 2,
            border: 2,
            borderColor: "primary.main",
          }}
        />
        <Typography variant="h5">Welcome, {session.user?.name}!</Typography>
        <Typography color="text.secondary">{session.user?.email}</Typography>
        <Typography variant="body2" color="text.secondary">
          Session expires:{" "}
          {session.expires
            ? new Date(session.expires).toLocaleDateString()
            : "Unknown"}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <Button variant="outlined" color="error" onClick={handleSignOut}>
            Sign Out
          </Button>
          <Link href="/example-table">
            <Button variant="outlined" sx={{ width: "100%" }}>
              Example Table
            </Button>
          </Link>
          <Link href="/example-form">
            <Button variant="outlined" sx={{ width: "100%" }}>
              Example Form
            </Button>
          </Link>
        </Box>
      </>
    );
  }

  return (
    <>
      <Typography variant="h5">Please Sign In</Typography>
      <Typography color="text.secondary" mb={2}>
        Sign in to access your account information
      </Typography>
      <Button variant="contained" size="large" onClick={handleSignIn}>
        Sign In with Google
      </Button>
    </>
  );
}
