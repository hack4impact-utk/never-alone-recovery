import dayjs from "dayjs";
import { PDFDocument } from "pdf-lib";

export type AnnotationLocation = {
  x: number;
  y: number;
};

export const addTextToPdf = (
  pdf: PDFDocument | null,
  text: string,
  pageNumber: number,
  location: AnnotationLocation,
): void => {
  if (!pdf) {
    return;
  }

  const pages = pdf.getPages();
  const page = pages[pageNumber];

  page.drawText(text, {
    x: location.x,
    y: location.y,
    size: 12,
  });
};

export const addDateToPdf = (
  pdf: PDFDocument | null,
  pageNumber: number,
  location: AnnotationLocation,
): void => {
  const date = dayjs().format("MM/DD/YYYY");
  addTextToPdf(pdf, date, pageNumber, location);
};

export type SignatureLocation = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const addSignatureToPdf = async (
  pdf: PDFDocument,
  signatureData: string,
  pageNumber: number,
  location: SignatureLocation,
): Promise<void> => {
  if (!signatureData) {
    return;
  }

  const pages = pdf.getPages();
  const page = pages[pageNumber];

  const signatureImage = await pdf.embedPng(signatureData);

  page.drawImage(signatureImage, {
    x: location.x,
    y: location.y,
    width: location.width,
    height: location.height,
  });
};

export type Annotation = {
  type: "date" | "name";
  pageNumber: number;
  location: AnnotationLocation;
};
