import dayjs from "dayjs";
import { PDFDocument, PDFForm, PDFTextField } from "pdf-lib";

export const addTextToPdf = (
  form: PDFForm,
  fieldName: string,
  text: string | number,
): void => {
  const field = form.getTextField(fieldName);

  if (field) {
    field.setText(String(text));
  }
};

export const addDateToPdf = (form: PDFForm): void => {
  const date = dayjs().format("MM/DD/YYYY");
  const fields = form.getFields();

  for (const field of fields) {
    if (field.getName() === "date") {
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
  const fullName =
    `${firstName ?? ""} ${middleName ?? ""} ${lastName ?? ""}`.trim();

  for (const field of fields) {
    if (field.getName() === "fullName") {
      const textField = field as PDFTextField;

      textField.setText(fullName);
    }
  }
};

export const addFieldsToPdf = (
  form: PDFForm,
  fields: Record<string, unknown>,
): void => {
  const formFields = new Set(Object.keys(fields));
  const pdfFormFields = form.getFields();

  for (const field of pdfFormFields) {
    const fieldName = field.getName();

    if (!formFields.has(fieldName)) {
      continue;
    }

    const value = fields[fieldName];
    if (!value) {
      continue;
    }

    const textField = field as PDFTextField;
    textField.setText(String(value));
  }
};

export const addInitialsToPdf = (
  form: PDFForm,
  firstName: string,
  lastName: string,
): void => {
  const fields = form.getFields();
  const initials = `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase();

  for (const field of fields) {
    if (field.getName() === "initials") {
      const textField = field as PDFTextField;

      textField.setText(initials);
    }
  }
};

export const addSignatureToPdf = async (
  pdf: PDFDocument,
  signatureData: string,
  pageNumber: number,
  x: number,
  y: number,
  width: number,
  height: number,
): Promise<void> => {
  if (!signatureData) {
    return;
  }

  const pages = pdf.getPages();
  const page = pages[pageNumber];

  const signatureImage = await pdf.embedPng(signatureData);

  page.drawImage(signatureImage, {
    x,
    y,
    width,
    height,
  });
};

export const addCircleToPdf = (
  pdf: PDFDocument,
  pageNumber: number,
  x: number,
  y: number,
): void => {
  const pages = pdf.getPages();
  const page = pages[pageNumber];

  page.drawCircle({
    x,
    y,
    size: 8,
    borderWidth: 2.5,
    opacity: 0,
  });
};

export const addBoxToPdf = (
  pdf: PDFDocument,
  pageNumber: number,
  x: number,
  y: number,
  width: number,
  height: number,
): void => {
  const pages = pdf.getPages();
  const page = pages[pageNumber];

  page.drawRectangle({
    x,
    y,
    width,
    height,
    borderWidth: 2.5,
    opacity: 0,
  });
};
