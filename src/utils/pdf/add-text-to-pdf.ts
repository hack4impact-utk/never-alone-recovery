import { PDFDocument } from "pdf-lib";

type AnnotationLocation = {
  x: number;
  y: number;
};

export const addTextToPdf = async (
  pdf: PDFDocument | null,
  text: string,
  pageNumber: number,
  location: AnnotationLocation,
) => {
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
