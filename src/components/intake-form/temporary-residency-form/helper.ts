import { PDFDocument } from "pdf-lib";

import { addInitialsToPdf, addSignatureToPdf } from "@/utils/pdf/annotations";

import { IntakeFormValues } from "../schema";

export const annotateTemporaryResidencyPdf = async (
  pdf: PDFDocument,
  {
    temporaryResidency: { residentSignature, staffSignature },
    demographic: { firstName, lastName },
  }: IntakeFormValues,
): Promise<void> => {
  const form = pdf.getForm();

  addInitialsToPdf(form, firstName, lastName);

  await addSignatureToPdf(pdf, residentSignature, 0, 150, 130, 200, 50);
  await addSignatureToPdf(pdf, staffSignature, 0, 150, 90, 200, 50);
};
