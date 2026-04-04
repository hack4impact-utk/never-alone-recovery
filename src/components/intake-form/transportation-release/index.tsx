"use client";

import { Grid, Typography } from "@mui/material";
import { ReactNode, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import DocumentDisplay from "@/components/common/document-display/document-display";
import ControlledSignaturePad from "@/components/common/forms/controlled-signature-pad";
import { useIntakeFormContext } from "@/providers/intake-form-provider";
import { addSignatureToPdf } from "@/utils/pdf/annotations";
import { convertPdfToUrl, convertUrlToPdf } from "@/utils/pdf/conversion";

import { IntakeFormValues } from "../schema";

const TRANSPORTATION_RELEASE_PDF_URL =
  "neveralonerecovery.transportationreleaseform.pdf";

export default function TransportationReleaseForm(): ReactNode {
  const { getPdfUrl, setPdfUrl } = useIntakeFormContext();
  const { control } = useFormContext<IntakeFormValues>();

  const residentSignature = useWatch({
    control,
    name: "transportationRelease.residentSignature",
  });
  const staffSignature = useWatch({
    control,
    name: "transportationRelease.staffSignature",
  });

  const generatePdf = async (): Promise<void> => {
    const pdf = await convertUrlToPdf(TRANSPORTATION_RELEASE_PDF_URL);

    await addSignatureToPdf(pdf, residentSignature, 0, {
      x: 150,
      y: 390,
      width: 200,
      height: 50,
    });

    await addSignatureToPdf(pdf, staffSignature, 0, {
      x: 150,
      y: 325,
      width: 200,
      height: 50,
    });

    const url = await convertPdfToUrl(pdf);
    setPdfUrl("transportationRelease", url);
  };

  useEffect(() => {
    void generatePdf();
  }, [residentSignature, staffSignature]);

  return (
    <Grid container spacing={3}>
      <Grid size={12}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Transportation Release Form
        </Typography>
      </Grid>

      <DocumentDisplay pdfUrl={getPdfUrl("transportationRelease")} />

      <ControlledSignaturePad
        name="transportationRelease.residentSignature"
        control={control}
        label="Resident Signature"
        gridProps={{ size: 6 }}
      />

      <ControlledSignaturePad
        name="transportationRelease.staffSignature"
        control={control}
        label="Staff Signature"
        gridProps={{ size: 6 }}
      />
    </Grid>
  );
}
