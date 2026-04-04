"use client";

import { Grid, Typography } from "@mui/material";
import PDFDocument from "pdf-lib/cjs/api/PDFDocument";
import { ReactNode, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import DocumentDisplay from "@/components/common/document-display/document-display";
import { FormNames, IntakeFormValues } from "@/components/intake-form/schema";
import { useIntakeFormContext } from "@/providers/intake-form-provider";
import { addDateToPdf, addNameToPdf } from "@/utils/pdf/annotations";
import { fetchPdf } from "@/utils/pdf/conversion";

type EmergencyContactFormProps = {
  formName: FormNames;
  formTitle: string;
  children: ReactNode;
  generatePdf: (pdf: PDFDocument) => Promise<void> | void;
  showPdf?: boolean;
};

export default function FormContainer({
  formName,
  formTitle,
  children,
  generatePdf,
  showPdf = true,
}: EmergencyContactFormProps): ReactNode {
  const { getPdfUrl, savePdf } = useIntakeFormContext();
  const { getValues } = useFormContext<IntakeFormValues>();
  const watch = useWatch({ name: formName });

  const updatePdf = async (): Promise<void> => {
    const pdf = await fetchPdf(formName);
    const form = pdf.getForm();

    const {
      demographic: { firstName, middleName, lastName },
    } = getValues();

    addDateToPdf(form);
    addNameToPdf(form, firstName, middleName, lastName);

    await generatePdf(pdf);

    await savePdf(formName, pdf);
  };

  useEffect(() => {
    void updatePdf();
  }, [watch]);

  return (
    <Grid container spacing={3}>
      <Grid size={12}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {formTitle}
        </Typography>
      </Grid>

      {showPdf && <DocumentDisplay pdfUrl={getPdfUrl(formName)} />}

      {children}
    </Grid>
  );
}
