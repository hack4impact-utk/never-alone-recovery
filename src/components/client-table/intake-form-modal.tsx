"use client";

import { Close } from "@mui/icons-material";
import DescriptionIcon from "@mui/icons-material/Description";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
} from "@mui/material";
import dayjs from "dayjs";
import { ReactNode, useEffect, useState } from "react";

import { Client } from "@/types/schema";
import { convertPdfToUrl, convertUrlToPdf } from "@/utils/pdf/conversion";

import DocumentDisplay from "../common/document-display/document-display";

type IntakeFormModalProps = {
  client: Client;
};

export default function IntakeFormModal({
  client,
}: IntakeFormModalProps): ReactNode {
  const [isOpen, setIsOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleOpen = (): void => {
    setIsOpen(true);
  };

  const handleClose = (): void => {
    setIsOpen(false);
  };

  const getFileName = (): string => {
    return `${client.firstName} ${client.lastName} - Intake Form - ${dayjs().format("YYYY-MM-DD")}.pdf`;
  };

  const handleDownload = (): void => {
    if (!pdfUrl) {
      return;
    }

    const anchor = document.createElement("a");
    anchor.href = pdfUrl;
    anchor.download = getFileName();
    anchor.rel = "noopener noreferrer";
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
  };

  useEffect(() => {
    const fetchPdfUrl = async (): Promise<void> => {
      const url = await convertPdfToUrl(
        await convertUrlToPdf("neveralonerecovery.applicantdemographics.pdf"),
      );
      setPdfUrl(url);
    };

    void fetchPdfUrl();
  }, []);

  return (
    <>
      <MenuItem onClick={handleOpen} sx={{ width: "100%" }}>
        <DescriptionIcon fontSize="small" sx={{ mr: 1 }} />
        Intake Form
      </MenuItem>

      <Dialog open={isOpen} fullWidth onClose={handleClose} maxWidth="md">
        <DialogTitle variant="h5" sx={{ p: 2, textAlign: "center" }}>
          {client.firstName} {client.lastName}'s Intake Form
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", right: 10, top: 10 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {pdfUrl ? (
            <DocumentDisplay pdfUrl={pdfUrl} />
          ) : (
            <CircularProgress aria-label="Loading…" />
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleDownload}
            fullWidth
            disabled={!pdfUrl}
            sx={{ mt: 2 }}
          >
            Download PDF
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
