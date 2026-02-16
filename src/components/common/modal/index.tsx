import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import React, { ReactNode, useState } from "react";

type ButtonModalProps = {
  buttonTitle: string;
  modalTitle: string;
  onOpen?: () => void;
  onClose?: () => void;
  hasCloseButton?: boolean;
  children?: ReactNode;
};

export default function ButtonModal({
  buttonTitle,
  modalTitle,
  onOpen,
  onClose,
  hasCloseButton = false,
  children,
}: ButtonModalProps): ReactNode {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (): void => {
    setIsOpen(true);
    onOpen?.();
  };

  const handleClose = (): void => {
    setIsOpen(false);
    onClose?.();
  };

  return (
    <>
      <Button variant="outlined" size="small" onClick={handleOpen}>
        {buttonTitle}
      </Button>
      <Dialog open={isOpen} fullWidth>
        <DialogTitle variant="h5" sx={{ p: 2, textAlign: "center" }}>
          {modalTitle}
          {hasCloseButton && (
            <IconButton
              onClick={handleClose}
              sx={{ position: "absolute", right: 10, top: 10 }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </>
  );
}
