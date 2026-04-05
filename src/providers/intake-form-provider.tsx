"use client";
import PDFDocument from "pdf-lib/cjs/api/PDFDocument";
import { createContext, ReactNode, useContext, useState } from "react";

import { FormNames } from "@/components/intake-form/schema";
import { INTAKE_FORM_PDF_FILE_NAMES } from "@/constants/intake-form-file-names";
import { convertPdfToUrl, convertUrlToPdf } from "@/utils/pdf/conversion";

export type PdfUrls = Record<FormNames, string>;

type IntakeFormContextType = {
  getOriginalPdf: (formName: keyof PdfUrls) => Promise<PDFDocument>;
  getAnnotatedPdfUrl: (formName: keyof PdfUrls) => string;
  saveAnnotatedPdf: (
    formName: keyof PdfUrls,
    pdf: PDFDocument,
  ) => Promise<void>;
};

const IntakeFormContext = createContext<IntakeFormContextType | undefined>(
  undefined,
);

type IntakeFormProviderProps = {
  children: ReactNode;
};

export default function IntakeFormProvider({
  children,
}: IntakeFormProviderProps): ReactNode {
  const [pdfUrls, setPdfUrls] = useState<PdfUrls>({
    demographic: "",
    emergencyContact: "",
    serviceContract: "",
    transportationRelease: "",
  });

  const getOriginalPdf = async (
    formName: keyof PdfUrls,
  ): Promise<PDFDocument> => {
    return await convertUrlToPdf(INTAKE_FORM_PDF_FILE_NAMES[formName]);
  };

  const getAnnotatedPdfUrl = (formName: keyof PdfUrls): string => {
    return pdfUrls[formName];
  };

  const saveAnnotatedPdf = async (
    formName: keyof PdfUrls,
    pdf: PDFDocument,
  ): Promise<void> => {
    const url = await convertPdfToUrl(pdf);
    setPdfUrls((prev) => ({ ...prev, [formName]: url }));
  };

  return (
    <IntakeFormContext.Provider
      value={{
        getOriginalPdf,
        getAnnotatedPdfUrl,
        saveAnnotatedPdf,
      }}
    >
      {children}
    </IntakeFormContext.Provider>
  );
}

export const useIntakeFormContext = (): IntakeFormContextType => {
  const context = useContext(IntakeFormContext);
  if (!context) {
    throw new Error(
      "useIntakeFormContext must be used within a IntakeFormProvider",
    );
  }
  return context;
};
