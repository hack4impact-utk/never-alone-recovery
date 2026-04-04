import { PDFDocument } from "pdf-lib";

import { FormNames } from "@/components/intake-form/schema";
import { INTAKE_FORM_PDF_FILE_NAMES } from "@/constants/intake-form-file-names";

export const convertPdfToUrl = async (pdf: PDFDocument): Promise<string> => {
  const pdfBytes = await pdf.save();

  const blob = new Blob([new Uint8Array(pdfBytes)], {
    type: "application/pdf",
  });

  return URL.createObjectURL(blob);
};

export const fetchPdf = async (formName: FormNames): Promise<PDFDocument> => {
  const url = INTAKE_FORM_PDF_FILE_NAMES[formName];
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  return await PDFDocument.load(arrayBuffer);
};
