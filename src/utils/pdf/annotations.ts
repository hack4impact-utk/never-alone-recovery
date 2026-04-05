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

    const value = String(fields[fieldName]);
    const textField = field as PDFTextField;
    textField.setText(value);
  }
};

type SignatureLocation = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const addSignatureToPdf = async (
  pdf: PDFDocument,
  signatureData: string,
  pageNumber: number,
  { x, y, width, height }: SignatureLocation,
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

type circleLocation = {
  x: number;
  y: number;
};

export const addCircleToPdf = (
  pdf: PDFDocument,
  pageNumber: number,
  { x, y }: circleLocation,
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
