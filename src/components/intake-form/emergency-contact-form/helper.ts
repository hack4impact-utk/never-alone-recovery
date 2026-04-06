import { PDFDocument } from "pdf-lib";

import { addFieldsToPdf } from "@/utils/pdf/annotations";

import { IntakeFormValues } from "../schema";

export const annotateEmergencyContactPdf = (
  pdf: PDFDocument,
  { emergencyContact }: IntakeFormValues,
): void => {
  const form = pdf.getForm();

  addFieldsToPdf(form, emergencyContact);
};
