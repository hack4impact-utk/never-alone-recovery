import { PDFDocument } from "pdf-lib";

import { addFieldsToPdf, addSignatureToPdf } from "@/utils/pdf/annotations";

import { IntakeFormValues } from "../schema";

export const annotateFinancialResponsibilityPdf = async (
  pdf: PDFDocument,
  { financialResponsibility }: IntakeFormValues,
): Promise<void> => {
  const form = pdf.getForm();

  addFieldsToPdf(form, financialResponsibility);

  const { residentSignature, staffSignature } = financialResponsibility;
  await addSignatureToPdf(pdf, residentSignature, 0, 150, 190, 200, 50);
  await addSignatureToPdf(pdf, staffSignature, 0, 150, 145, 200, 50);
};
