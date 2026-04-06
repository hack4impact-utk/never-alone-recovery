import { PDFDocument } from "pdf-lib";

import {
  addFieldsToPdf,
  addSignatureToPdf,
  addTextToPdf,
} from "@/utils/pdf/annotations";

import { IntakeFormValues } from "../schema";

export const annotateReleaseOfInformationPdf = async (
  pdf: PDFDocument,
  { releaseOfInformation, demographic }: IntakeFormValues,
): Promise<void> => {
  const form = pdf.getForm();

  addFieldsToPdf(form, releaseOfInformation);

  addTextToPdf(form, "dateOfBirth", demographic.dateOfBirth);

  const { residentSignature, staffSignature } = releaseOfInformation;

  await addSignatureToPdf(pdf, residentSignature, 0, 75, 135, 200, 50);
  await addSignatureToPdf(pdf, staffSignature, 0, 75, 90, 200, 50);
};
