"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { ReactNode, useState } from "react";

type ResetButtonProps = {
  disabled?: boolean;
  onConfirmReset: () => void;
};

export default function ResetButton({
  disabled = false,
  onConfirmReset,
}: ResetButtonProps): ReactNode {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = (): void => {
    setIsOpen(false);
  };

  const handleConfirm = (): void => {
    onConfirmReset();
    handleClose();
  };

  return (
    <>
      <Button
        type="button"
        variant="outlined"
        onClick={() => setIsOpen(true)}
        disabled={disabled}
        fullWidth
      >
        Reset
      </Button>

      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Reset form?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will clear all fields and remove the saved draft for this
            intake form.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ pb: 3, pr: 3 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm} variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
