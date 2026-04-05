import dayjs from "dayjs";
import { PDFDocument } from "pdf-lib";

import { addSignatureToPdf, addTextToPdf } from "@/utils/pdf/annotations";

import { IntakeFormValues } from "../schema";

export const annotateServiceContractPdf = async (
  pdf: PDFDocument,
  {
    serviceContract: { entryDate, residentSignature, staffSignature },
  }: IntakeFormValues,
): Promise<void> => {
  const form = pdf.getForm();

  const signDate = dayjs();

  addTextToPdf(form, "signDay", signDate.format("DD"));
  addTextToPdf(form, "signMonth", signDate.format("MMMM"));
  addTextToPdf(form, "signYear", signDate.format("YY"));

  if (entryDate) {
    const entryDateJs = dayjs(entryDate);

    addTextToPdf(form, "entryDay", entryDateJs.format("DD"));
    addTextToPdf(form, "entryMonth", entryDateJs.format("MMMM"));
    addTextToPdf(form, "entryYear", entryDateJs.format("YY"));
  }

  await addSignatureToPdf(pdf, residentSignature, 6, {
    x: 50,
    y: 475,
    width: 200,
    height: 50,
  });

  await addSignatureToPdf(pdf, staffSignature, 6, {
    x: 50,
    y: 390,
    width: 200,
    height: 50,
  });
};
