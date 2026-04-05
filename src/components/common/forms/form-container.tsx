"use client";

import { Box, Typography } from "@mui/material";
import PDFDocument from "pdf-lib/cjs/api/PDFDocument";
import { ReactNode, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import DocumentDisplay from "@/components/common/document-display/document-display";
import { FormNames, IntakeFormValues } from "@/components/intake-form/schema";
import { useIntakeFormContext } from "@/providers/intake-form-provider";
import { addDateToPdf, addNameToPdf } from "@/utils/pdf/annotations";

type EmergencyContactFormProps = {
  formName: FormNames;
  formTitle: string;
  children: ReactNode;
  annotatePdf?: (
    pdf: PDFDocument,
    formValues: IntakeFormValues,
  ) => Promise<void> | void;
  showPdf?: boolean;
};

export default function FormContainer({
  formName,
  formTitle,
  children,
  annotatePdf,
  showPdf = true,
}: EmergencyContactFormProps): ReactNode {
  const { getOriginalPdf, getAnnotatedPdfUrl, saveAnnotatedPdf } =
    useIntakeFormContext();
  const { getValues } = useFormContext<IntakeFormValues>();
  const watch = useWatch({ name: formName });

  const updatePdf = async (): Promise<void> => {
    const pdf = await getOriginalPdf(formName);
    const form = pdf.getForm();

    const {
      demographic: { firstName, middleName, lastName },
    } = getValues();

    addDateToPdf(form);
    addNameToPdf(form, firstName, middleName, lastName);

    await annotatePdf?.(pdf, getValues());

    await saveAnnotatedPdf(formName, pdf);
  };

  useEffect(() => {
    void updatePdf();
  }, [watch]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        {formTitle}
      </Typography>

      {showPdf && <DocumentDisplay pdfUrl={getAnnotatedPdfUrl(formName)} />}

      {children}
    </Box>
  );
}
