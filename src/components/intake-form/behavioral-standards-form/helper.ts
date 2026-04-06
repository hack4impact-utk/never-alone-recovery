import { PDFDocument } from "pdf-lib";

import { addInitialsToPdf, addSignatureToPdf } from "@/utils/pdf/annotations";

import { IntakeFormValues } from "../schema";

export const annotateBehavioralStandardsPdf = async (
  pdf: PDFDocument,
  {
    behavioralStandards: { residentSignature, staffSignature },
    demographic: { firstName, lastName },
  }: IntakeFormValues,
): Promise<void> => {
  const form = pdf.getForm();

  addInitialsToPdf(form, firstName, lastName);
  await addSignatureToPdf(pdf, residentSignature, 3, 150, 160, 200, 50);
  await addSignatureToPdf(pdf, staffSignature, 3, 150, 120, 200, 50);
};
