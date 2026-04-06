import { PDFDocument } from "pdf-lib";

import { addFieldsToPdf, addSignatureToPdf } from "@/utils/pdf/annotations";

import { IntakeFormValues } from "../schema";

export const annotateBehavioralStandardsAgreementPdf = async (
  pdf: PDFDocument,
  { behavioralStandardsAgreement }: IntakeFormValues,
): Promise<void> => {
  const form = pdf.getForm();

  addFieldsToPdf(form, behavioralStandardsAgreement);

  const { residentSignature, staffSignature } = behavioralStandardsAgreement;

  await addSignatureToPdf(pdf, residentSignature, 0, 100, 390, 200, 50);
  await addSignatureToPdf(pdf, staffSignature, 0, 100, 340, 200, 50);
};
