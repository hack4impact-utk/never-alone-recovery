"use client";

import { Box, Typography } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import DocumentDisplay from "@/components/common/document-display/document-display";
import ControlledCheckbox from "@/components/common/forms/controlled-checkbox";
import FormSection from "@/components/common/forms/form-section";
import { useIntakeFormContext } from "@/providers/intake-form-provider";

import { IntakeFormValues } from "../schema";

export default function ConfirmationForm(): ReactNode {
  const { control } = useFormContext<IntakeFormValues>();
  const { getMergedPdfUrl } = useIntakeFormContext();
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string>("");

  useEffect(() => {
    const loadMergedPdf = async (): Promise<void> => {
      const url = await getMergedPdfUrl();
      setMergedPdfUrl(url);
    };

    void loadMergedPdf();
  }, [getMergedPdfUrl]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        Confirmation
      </Typography>

      <DocumentDisplay pdfUrl={mergedPdfUrl} />

      <FormSection>
        <ControlledCheckbox
          name="confirmation.confirm"
          control={control}
          label="I confirm that all the information above is correct."
        />
      </FormSection>
    </Box>
  );
}
