import { PDFDocument } from "pdf-lib";

import { addSignatureToPdf } from "@/utils/pdf/annotations";

import { IntakeFormValues } from "../schema";

export const annotateTransportationReleasePdf = async (
  pdf: PDFDocument,
  {
    transportationRelease: { residentSignature, staffSignature },
  }: IntakeFormValues,
): Promise<void> => {
  await addSignatureToPdf(pdf, residentSignature, 0, 150, 390, 200, 50);

  await addSignatureToPdf(pdf, staffSignature, 0, 150, 325, 200, 50);
};
