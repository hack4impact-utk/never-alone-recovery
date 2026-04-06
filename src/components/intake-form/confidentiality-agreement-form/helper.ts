import { PDFDocument } from "pdf-lib";

import { addSignatureToPdf } from "@/utils/pdf/annotations";

import { IntakeFormValues } from "../schema";

export const annotateConfidentialityAgreementPdf = async (
  pdf: PDFDocument,
  {
    confidentialityAgreement: { residentSignature, staffSignature },
  }: IntakeFormValues,
): Promise<void> => {
  await addSignatureToPdf(pdf, residentSignature, 0, 100, 180, 200, 50);

  await addSignatureToPdf(pdf, staffSignature, 0, 100, 135, 200, 50);
};
