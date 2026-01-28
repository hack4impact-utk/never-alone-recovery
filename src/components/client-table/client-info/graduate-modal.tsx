"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { ReactNode, useState } from "react";

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
            onClick={handleClose}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
