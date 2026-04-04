import dayjs from "dayjs";
import { PDFDocument, PDFForm, PDFTextField } from "pdf-lib";

export const addTextToPdf = (
  form: PDFForm,
  fieldName: string,
  text: string,
): void => {
  const field = form.getTextField(fieldName);

  if (field) {
    field.setText(text);
  }
};

export const addDateToPdf = (form: PDFForm): void => {
  const date = dayjs().format("MM/DD/YYYY");
  const fields = form.getFields();

  for (const field of fields) {
    if (field.getName().toLowerCase().includes("date")) {
      const textField = field as PDFTextField;

      textField.setText(date);
    }
  }
};

export const addNameToPdf = (
  form: PDFForm,
  firstName: string | undefined,
  middleName: string | undefined,
  lastName: string | undefined,
): void => {
  const fields = form.getFields();
  const fullName = [firstName, middleName, lastName].filter(Boolean).join(" ");

  for (const field of fields) {
    if (field.getName().toLowerCase().includes("fullName")) {
      const textField = field as PDFTextField;

      textField.setText(fullName);
    }
  }
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
