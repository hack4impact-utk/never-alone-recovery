import { PDFDocument } from "pdf-lib";

import { addFieldsToPdf } from "@/utils/pdf/annotations";

import { IntakeFormValues } from "../schema";

export const annotateDemographicPdf = (
  pdf: PDFDocument,
  { demographic }: IntakeFormValues,
): void => {
  const form = pdf.getForm();

  addFieldsToPdf(form, demographic);
};
