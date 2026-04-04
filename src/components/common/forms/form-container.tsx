"use client";

import { Grid, Typography } from "@mui/material";
import PDFDocument from "pdf-lib/cjs/api/PDFDocument";
import { ReactNode, useEffect, useRef } from "react";

import DocumentDisplay from "@/components/common/document-display/document-display";
import { FormNames } from "@/components/intake-form/schema";
import { useIntakeFormContext } from "@/providers/intake-form-provider";
import { fetchPdf } from "@/utils/pdf/conversion";

type EmergencyContactFormProps = {
  formName: FormNames;
  children: ReactNode;
  generatePdf: (pdf: PDFDocument) => void;
  showPdf?: boolean;
};

export default function FormContainer({
  formName,
  children,
  generatePdf,
  showPdf = true,
}: EmergencyContactFormProps): ReactNode {
  const { getPdfUrl, savePdf } = useIntakeFormContext();
  const hasUnsavedInputRef = useRef<boolean>(false);

  const updatePdf = async (): Promise<void> => {
    const pdf = await fetchPdf(formName);

    generatePdf(pdf);

    await savePdf(formName, pdf);
  };

  useEffect(() => {
    void updatePdf();
  }, []);

  const handleChangeCapture = (): void => {
    hasUnsavedInputRef.current = true;
  };

  const handleBlurCapture = (): void => {
    if (!hasUnsavedInputRef.current) {
      return;
    }

    hasUnsavedInputRef.current = false;
    void updatePdf();
  };

  return (
    <Grid
      container
      spacing={3}
      onChangeCapture={handleChangeCapture}
      onBlurCapture={handleBlurCapture}
    >
      <Grid size={12}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Emergency Contact Information
        </Typography>
      </Grid>

      {showPdf && <DocumentDisplay pdfUrl={getPdfUrl(formName)} />}

      {children}
    </Grid>
  );
}
