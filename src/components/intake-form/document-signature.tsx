"use client";

import { Box, Button } from "@mui/material";
import { PDFDocument } from "pdf-lib";
import { ReactNode, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import DocumentDisplay from "@/components/common/document-display";
import SignaturePad from "@/components/common/forms/signature-pad";
import {
  addDateToPdf,
  addSignatureToPdf,
  addTextToPdf,
  Annotation,
  SignatureLocation,
} from "@/utils/pdf/annotations";

import { IntakeFormValues } from "./intake-form-schema";

const convertPdfToUrl = async (pdf: PDFDocument): Promise<string> => {
  const pdfBytes = await pdf.save();

  const blob = new Blob([new Uint8Array(pdfBytes)], {
    type: "application/pdf",
  });

  return URL.createObjectURL(blob);
};

const fetchPdf = async (path: string): Promise<PDFDocument> => {
  const response = await fetch(path);
  const arrayBuffer = await response.arrayBuffer();
  return await PDFDocument.load(arrayBuffer);
};

type DocumentSignatureProps = {
  pdfPath: string;
  formTitle: string;
  staffSignatureLocation: SignatureLocation;
  residentSignatureLocation: SignatureLocation;
  annotations?: Annotation[];
};

export default function DocumentSignature({
  pdfPath,
  formTitle,
  staffSignatureLocation,
  residentSignatureLocation,
  annotations: annotationLocations = [],
}: DocumentSignatureProps): ReactNode {
  const { getValues } = useFormContext<IntakeFormValues>();
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [residentSignature, setResidentSignature] = useState<string>("");
  const [staffSignature, setStaffSignature] = useState<string>("");
  const firstName = getValues("demographic").firstName;
  const lastName = getValues("demographic").lastName;
  const fullName = `${firstName} ${lastName}`;

  const generatePdf = async (): Promise<void> => {
    const pdf = await fetchPdf(pdfPath);

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

    await addSignatureToPdf(pdf, staffSignature, 0, staffSignatureLocation);

    await addSignatureToPdf(
      pdf,
      residentSignature,
      0,
      residentSignatureLocation,
    );

    const url = await convertPdfToUrl(pdf);
    setPdfUrl(url);
  };

  useEffect(() => {
    void generatePdf();
  }, [staffSignature, residentSignature]);

  return (
    <Box sx={{ width: "100%", height: "750px", padding: 4 }}>
      <DocumentDisplay pdfUrl={pdfUrl} />
      <Box
        sx={{
          marginY: 4,
          display: "flex",
          gap: 2,
          justifyContent: "center",
          width: "100%",
        }}
      >
        <SignaturePad
          onSign={setResidentSignature}
          title="Resident Signature"
          description="Resident: Please provide your signature below:"
        />
        <SignaturePad
          onSign={setStaffSignature}
          title="Staff Signature"
          description="Staff Member: Please provide your signature below:"
        />
        <a href={pdfUrl} download={`${fullName} - ${formTitle}.pdf`}>
          <Button variant="contained" sx={{ alignSelf: "center" }}>
            Download
          </Button>
        </a>
      </Box>
    </Box>
  );
}
