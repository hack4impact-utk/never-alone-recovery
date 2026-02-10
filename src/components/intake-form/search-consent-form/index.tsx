"use client";

import { Box, Button } from "@mui/material";
import dayjs from "dayjs";
import { PDFDocument } from "pdf-lib";
import { ReactNode, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import DocumentDisplay from "@/components/common/document-display";
import SignaturePad from "@/components/common/forms/signature-pad";

import { IntakeFormValues } from "../intake-form-schema";

const PDF_URL = "neveralonerecovery.searchconsentform.pdf";

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

type AnnotationLocation = {
  x: number;
  y: number;
};

export const addTextToPdf = (
  pdf: PDFDocument | null,
  text: string,
  pageNumber: number,
  location: AnnotationLocation,
): void => {
  if (!pdf) {
    return;
  }

  const pages = pdf.getPages();
  const page = pages[pageNumber];

  page.drawText(text, {
    x: location.x,
    y: location.y,
    size: 12,
  });
};

export const addDateToPdf = (
  pdf: PDFDocument | null,
  pageNumber: number,
  location: AnnotationLocation,
): void => {
  const date = dayjs().format("MM/DD/YYYY");
  addTextToPdf(pdf, date, pageNumber, location);
};

type SignatureLocation = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const addSignatureToPdf = async (
  pdf: PDFDocument,
  signatureData: string,
  pageNumber: number,
  location: SignatureLocation,
): Promise<void> => {
  if (!signatureData) {
    return;
  }

  const pages = pdf.getPages();
  const page = pages[pageNumber];

  const signatureImage = await pdf.embedPng(signatureData);

  page.drawImage(signatureImage, {
    x: location.x,
    y: location.y,
    width: location.width,
    height: location.height,
  });
};

export default function SearchConsentForm(): ReactNode {
  const { getValues } = useFormContext<IntakeFormValues>();
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [residentSignature, setResidentSignature] = useState<string>("");
  const [staffSignature, setStaffSignature] = useState<string>("");

  const generatePdf = async (): Promise<void> => {
    const pdf = await fetchPdf(PDF_URL);

    const firstName = getValues("demographic").firstName;
    const lastName = getValues("demographic").lastName;
    const fullName = `${firstName} ${lastName}`;

    addTextToPdf(pdf, fullName, 0, {
      x: 100,
      y: 230,
    });

    addDateToPdf(pdf, 0, { x: 475, y: 115 });
    addDateToPdf(pdf, 0, { x: 475, y: 175 });

    await addSignatureToPdf(pdf, staffSignature, 0, {
      x: 150,
      y: 100,
      width: 200,
      height: 50,
    });

    await addSignatureToPdf(pdf, residentSignature, 0, {
      x: 150,
      y: 155,
      width: 200,
      height: 50,
    });

    const url = await convertPdfToUrl(pdf);
    setPdfUrl(url);
  };

  useEffect(() => {
    void generatePdf();
  }, [staffSignature, residentSignature]);

  const downloadPdf = async (): Promise<void> => {
    const pdf = await fetchPdf(pdfUrl);

    const pdfBytes = await pdf.save();

    const file = new Blob([new Uint8Array(pdfBytes)], {
      type: "application/pdf",
    });

    const fileURL = URL.createObjectURL(file);

    const firstName = getValues("demographic").firstName;
    const lastName = getValues("demographic").lastName;
    const fullName = `${firstName} ${lastName}`;

    const link = document.createElement("a");
    link.href = fileURL;
    link.download = `${fullName} - Search Consent Form.pdf`;

    document.body.append(link);
    link.click();

    link.remove();
    URL.revokeObjectURL(fileURL);
  };

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
        <Button
          variant="contained"
          onClick={downloadPdf}
          sx={{ alignSelf: "center" }}
        >
          Download
        </Button>
      </Box>
    </Box>
  );
}
