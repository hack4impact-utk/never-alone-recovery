"use client";

import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { ReactNode, useState } from "react";

import DocumentDisplay from "@/components/common/document-display/document-display";

type PdfDisplayModalProps = {
  pdfUrl: string;
};

export default function PdfDisplayModal({
  pdfUrl,
}: PdfDisplayModalProps): ReactNode {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (): void => {
    setIsOpen(true);
  };

  const handleClose = (): void => {
    setIsOpen(false);
  };

  const handleDownload = (): void => {
    if (!pdfUrl) {
      return;
    }

    const anchor = document.createElement("a");
    anchor.href = pdfUrl;
    anchor.download = "intake-form-confirmation.pdf";
    anchor.rel = "noopener noreferrer";
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
  };

  return (
    <>
      <Button variant="outlined" onClick={handleOpen} disabled={!pdfUrl}>
        View Completed Form
      </Button>

      <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogTitle variant="h5" sx={{ p: 2, textAlign: "center" }}>
          Completed Intake Form
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", right: 10, top: 10 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 0 }}>
          <DocumentDisplay pdfUrl={pdfUrl} />
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button
            variant="contained"
            onClick={handleDownload}
            fullWidth
            disabled={!pdfUrl}
          >
            Download PDF
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
