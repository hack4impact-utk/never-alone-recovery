"use client";

import { Box, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ReactNode, useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

import DocumentDisplay from "@/components/common/document-display";
import { useIntakeFormContext } from "@/providers/intake-form-provider";

import { IntakeFormValues } from "../intake-form-schema";

export default function ConfirmationForm(): ReactNode {
  const { getIntakeFormPdfUrl } = useIntakeFormContext();
  const [confirmationPdfUrl, setConfirmationPdfUrl] = useState("");
  useEffect(() => {
    // const fetchPdf = async () => {
    async function fetchPdf(): Promise<void> {
      try {
        const url = await getIntakeFormPdfUrl(); // The first promise
        setConfirmationPdfUrl(url);
      } catch (error) {
        console.error("Failed to get PDF URL:", error);
      }
    }

    void fetchPdf();
  }, [getIntakeFormPdfUrl]);
  const {
    control,
    formState: { errors },
  } = useFormContext<IntakeFormValues>();
  // const pdfUrl = getIntakeFormPdfUrl().then();
  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
        Confirm Details
      </Typography>
      <DocumentDisplay pdfUrl={confirmationPdfUrl} />
      <Controller
        control={control}
        name={"confirmation.residentConfirmation"}
        render={({ field }) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              }
              label="I have reviewed the following document and I agree to all the information provided"
            />
            {errors["confirmation"]?.residentConfirmation && (
              <Box sx={{ color: "error.main", mt: 1, fontSize: "0.875rem" }}>
                {errors.confirmation?.residentConfirmation.message}
              </Box>
            )}
          </Box>
        )}
      />
    </Box>
  );
}
