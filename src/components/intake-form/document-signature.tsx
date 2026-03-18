"use client";

import { Box, Typography } from "@mui/material";
import { ReactNode, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

import DocumentDisplay from "@/components/common/document-display";
import SignaturePad from "@/components/common/forms/signature-pad";
import { useIntakeFormContext } from "@/providers/intake-form-provider";
import {
  addDateToPdf,
  addSignatureToPdf,
  addTextToPdf,
  Annotation,
  SignatureLocation,
} from "@/utils/pdf/annotations";
import { convertPdfToUrl, covertUrlToPdf } from "@/utils/pdf/conversion";

import { IntakeFormValues, IntakeSignatureForms } from "./intake-form-schema";

type DocumentSignatureProps = {
  pdfPath: string;
  formTitle: string;
  form: IntakeSignatureForms;
  staffSignatureLocation: SignatureLocation;
  residentSignatureLocation: SignatureLocation;
  signaturePage: number;
  annotations?: Annotation[];
};

export default function DocumentSignature({
  pdfPath,
  formTitle,
  form,
  staffSignatureLocation,
  residentSignatureLocation,
  signaturePage,
  annotations: annotationLocations = [],
}: DocumentSignatureProps): ReactNode {
  const {
    control,
    formState: { errors },
  } = useFormContext<IntakeFormValues>();
  const { getPdfUrl, setPdfUrl } = useIntakeFormContext();
  const { getValues } = useFormContext<IntakeFormValues>();
  const firstName = getValues("demographic").firstName;
  const lastName = getValues("demographic").lastName;
  const fullName = `${firstName} ${lastName}`;

  const generatePdf = async (): Promise<void> => {
    const pdf = await covertUrlToPdf(pdfPath);

    for (const annotation of annotationLocations) {
      switch (annotation.type) {
        case "date": {
          addDateToPdf(pdf, annotation.pageNumber, annotation.location);

          break;
        }
        case "name": {
          addTextToPdf(
            pdf,
            fullName,
            annotation.pageNumber,
            annotation.location,
          );

          break;
        }
      }
    }

    await addSignatureToPdf(
      pdf,
      getValues(`${form}.staffSignature`),
      signaturePage,
      staffSignatureLocation,
    );

    await addSignatureToPdf(
      pdf,
      getValues(`${form}.residentSignature`),
      signaturePage,
      residentSignatureLocation,
    );

    const url = await convertPdfToUrl(pdf);
    setPdfUrl(form, url);
  };

  useEffect(() => {
    void generatePdf();
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
        {formTitle}
      </Typography>

      <DocumentDisplay pdfUrl={getPdfUrl(form)} />
      <Box
        sx={{
          marginY: 4,
          display: "flex",
          gap: 2,
          flexDirection: "column",
          alignItems: "start",
          width: "100%",
        }}
      >
        <Controller
          control={control}
          name={`${form}.residentSignature`}
          render={({ field }) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <SignaturePad
                onSign={(signatureData) => {
                  field.onChange(signatureData);
                  void generatePdf();
                }}
                title="Resident Signature"
                description="Resident: Please provide your signature below:"
              />
              {errors[form]?.residentSignature && (
                <Box sx={{ color: "error.main", mt: 1, fontSize: "0.875rem" }}>
                  {errors[form]?.residentSignature?.message}
                </Box>
              )}
            </Box>
          )}
        />
        <Controller
          control={control}
          name={`${form}.staffSignature`}
          render={({ field }) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <SignaturePad
                onSign={(signatureData) => {
                  field.onChange(signatureData);
                  void generatePdf();
                }}
                title="Staff Signature"
                description="Staff Member: Please provide your signature below:"
              />
              {errors[form]?.staffSignature && (
                <Box sx={{ color: "error.main", mt: 1, fontSize: "0.875rem" }}>
                  {errors[form]?.staffSignature?.message}
                </Box>
              )}
            </Box>
          )}
        />
      </Box>
    </Box>
  );
}
