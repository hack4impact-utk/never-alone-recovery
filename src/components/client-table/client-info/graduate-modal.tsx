"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { ReactNode, useState } from "react";

import { graduateClient } from "@/api/client/public-mutations";
import { Client } from "@/types/schema";

type GraduateProps = {
  client: Client;
};

export default function Graduate({ client }: GraduateProps): ReactNode {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (): void => {
    setIsOpen(true);
  };

  const handleClose = (): void => {
    setIsOpen(false);
  };

  const handleSubmit = async (): Promise<void> => {
    const [updatedClient, error] = await graduateClient(client);

    if (error || !updatedClient) {
      enqueueSnackbar(
        `Failed to graduate "${client.firstName} ${client.lastName}". Please try again.`,
        {
          variant: "error",
        },
      );
      return;
    }

    const successMessage = `"${updatedClient.firstName} ${updatedClient.lastName}" marked as graduated.`;

    enqueueSnackbar(successMessage, {
      variant: "success",
    });
    handleClose();
  };

  return (
    <>
      <Button variant="outlined" onClick={handleOpen} sx={{ width: "100%" }}>
        Graduate
      </Button>
      <Dialog open={isOpen} fullWidth maxWidth="sm">
        <DialogTitle variant="h5" sx={{ p: 2, textAlign: "center" }}>
          Client Graduation Form
        </DialogTitle>
        <DialogContent sx={{ py: 0, px: 2 }}>
          <Typography>
            Are you sure that you want to graduate {client?.firstName}{" "}
            {client?.lastName}?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{ width: "50%" }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ width: "50%" }}
            onClick={handleSubmit}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
