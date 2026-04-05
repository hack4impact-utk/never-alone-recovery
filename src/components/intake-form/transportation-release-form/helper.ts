import { PDFDocument } from "pdf-lib";

import { addSignatureToPdf } from "@/utils/pdf/annotations";

import { IntakeFormValues } from "../schema";

export const annotateTransportationReleasePdf = async (
  pdf: PDFDocument,
  {
    transportationRelease: { residentSignature, staffSignature },
  }: IntakeFormValues,
): Promise<void> => {
  await addSignatureToPdf(pdf, residentSignature, 0, {
    x: 150,
    y: 390,
    width: 200,
    height: 50,
  });

  await addSignatureToPdf(pdf, staffSignature, 0, {
    x: 150,
    y: 325,
    width: 200,
    height: 50,
  });
};
