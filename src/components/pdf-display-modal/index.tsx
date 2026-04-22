"use client";

import { Button } from "@mui/material";
import { ReactNode } from "react";

import DocumentDisplay from "@/components/common/document-display/document-display";
import ButtonModal from "@/components/common/modal";

type PdfDisplayModalProps = {
  pdfUrl: string;
  buttonTitle: string;
  modalTitle: string;
  onOpen?: () => void;
  onClose?: () => void;
};

export default function PdfDisplayModal({
  pdfUrl,
  buttonTitle,
  modalTitle,
  onOpen,
  onClose,
}: PdfDisplayModalProps): ReactNode {
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
    <ButtonModal
      buttonTitle={buttonTitle}
      modalTitle={modalTitle}
      onOpen={onOpen}
      onClose={onClose}
      hasCloseButton
    >
      <DocumentDisplay pdfUrl={pdfUrl} />

      <Button
        variant="contained"
        onClick={handleDownload}
        fullWidth
        disabled={!pdfUrl}
        sx={{ mt: 2 }}
      >
        Download PDF
      </Button>
    </ButtonModal>
  );
}
