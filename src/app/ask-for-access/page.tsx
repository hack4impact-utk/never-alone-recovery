import { Box, Card, CardContent, Typography } from "@mui/material";
import Image from "next/image";
import { ReactNode } from "react";

export default function AskForAccessPage(): ReactNode {
  return (
    <Box
      sx={{
        height: "calc(100vh - 76px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ boxShadow: 3, borderRadius: 4, maxWidth: 560, width: "90%" }}>
        <CardContent
          sx={{
            p: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Box
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
              p: 2,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Image
              src="/LargeNeverAloneRecoveryLogo.svg"
              alt="Never Alone Recovery Logo"
              width={300}
              height={200}
              style={{ height: "auto" }}
              priority
            />
          </Box>
          <Typography variant="body1" textAlign="center">
            Thank you for logging into Never Alone Recovery!
          </Typography>
          <Typography variant="body1" textAlign="center">
            To gain full access to the app, please contact Elisabeth Parsley at{" "}
            <Box component="span" fontWeight={500}>
              neveralonetransitional@gmail.com
            </Box>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
