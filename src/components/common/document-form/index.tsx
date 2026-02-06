"use client";

import { Box, Typography } from "@mui/material";
import React, { useState, JSX, useEffect } from "react";
import Signature from "../signature";
import { PDFDocument } from "pdf-lib";

type SignatureLocation = {
  x: number;
  y: number;
  width: number;
  height: number;
};

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

const addSignatureToPdf = async (
  pdf: PDFDocument,
  signatureData: string,
  page: number,
  location: SignatureLocation,
): Promise<PDFDocument> => {
  const pages = pdf.getPages();
  const firstPage = pages[page];

  const signatureImage = await pdf.embedPng(signatureData);

  firstPage.drawImage(signatureImage, {
    x: location.x,
    y: location.y,
    width: location.width,
    height: location.height,
  });

  return pdf;
};

export default function DocumentForm(): JSX.Element {
  const PDF_PATH = "/my-template.pdf";
  const [pdf, setPdf] = useState<PDFDocument | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        const pdfDoc = await fetchPdf(PDF_PATH);
        const url = await convertPdfToUrl(pdfDoc);

        setPdf(pdfDoc);
        setPdfUrl(url);
      } catch (error) {
        console.error("Error loading PDF:", error);
      }
    };

    loadPdf();
  }, []);

  const onSave = async (signatureData: string): Promise<void> => {
    try {
      if (!pdf) {
        return;
      }

      addSignatureToPdf(pdf, signatureData, 0, {
        x: 125,
        y: 315,
        width: 200,
        height: 100,
      });

      const url = await convertPdfToUrl(pdf);

      setPdfUrl(url);
    } catch (error) {
      console.error("Error loading or signing PDF:", error);
    }
  };

  return (
    <Box
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        width: "55vw",
        height: "100vh",
      }}
    >
      <Typography variant="h4">PDF Signer</Typography>

      {pdfUrl && (
        <Box
          sx={{
            mt: 4,
            width: "100%",
            height: "80%",
            border: "1px solid #ccc",
          }}
        >
          <iframe
            src={`${pdfUrl}#toolbar=0`}
            width="100%"
            height="100%"
            title="Signed PDF Preview"
          />
        </Box>
      )}

      <Signature
        title="Witness Signature"
        description="Witness Signature - Please Sign Below"
        onSave={onSave}
      />
    </Box>
  );
}
