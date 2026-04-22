"use client";

import {
  Alert,
  Button,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useState } from "react";

import { auditIncompleteTasks, generateWeeklyTasks } from "../tasks/actions";

export default function QuickTestPage(): React.ReactNode {
  const { data: session, status: authStatus } = useSession();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    msg: string;
    type: "success" | "error";
  } | null>(null);

  const handleRun = async (): Promise<void> => {
    // 1. Ensure we have a user session
    if (!session?.user?.id) {
      setResult({
        msg: "You must be logged in to assign tasks to yourself.",
        type: "error",
      });
      return;
    }

    setLoading(true);
    setResult(null);

    // 2. Pass the logged-in user's ID as the staffId
    const [count, error] = await generateWeeklyTasks(session.user.id);

    if (error === null) {
      setResult({
        msg: `Success! ${count} tasks generated and assigned to you.`,
        type: "success",
      });
    } else {
      setResult({ msg: error, type: "error" });
    }
    setLoading(false);
  };

  if (authStatus === "loading") return <CircularProgress sx={{ m: 5 }} />;

  return (
    <Container maxWidth="sm" sx={{ py: 10 }}>
      <Paper elevation={4} sx={{ p: 4 }}>
        <Stack spacing={3}>
          <Typography variant="h5" textAlign="center" fontWeight="bold">
            Task Generator Test
          </Typography>

          {session ? (
            <Typography variant="body2" textAlign="center">
              Logged in as: <strong>{session.user.email}</strong>
            </Typography>
          ) : (
            <Alert severity="warning">
              Please log in first to test this feature.
            </Alert>
          )}

          <Button
            variant="contained"
            onClick={handleRun}
            disabled={loading || !session}
            size="large"
          >
            {loading ? "Generating..." : "Generate Weekly Tasks"}
          </Button>

          {result && <Alert severity={result.type}>{result.msg}</Alert>}
        </Stack>
      </Paper>
    </Container>
  );
}
