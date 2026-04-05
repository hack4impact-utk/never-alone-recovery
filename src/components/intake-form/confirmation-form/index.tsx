"use client";

import { Grid, Typography } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import DocumentDisplay from "@/components/common/document-display/document-display";
import ControlledCheckbox from "@/components/common/forms/controlled-checkbox";
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
    <Grid container spacing={3}>
      <Grid size={12}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Confirmation
        </Typography>
      </Grid>

      <DocumentDisplay pdfUrl={mergedPdfUrl} />

      <ControlledCheckbox
        name="confirmation.confirm"
        control={control}
        label="I confirm that all the information above is correct."
        gridProps={{ size: 12 }}
      />
    </Grid>
  );
}
