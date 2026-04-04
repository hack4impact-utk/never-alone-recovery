"use client";
import PDFDocument from "pdf-lib/cjs/api/PDFDocument";
import { createContext, ReactNode, useContext, useState } from "react";

import { FormNames } from "@/components/intake-form/schema";
import { convertPdfToUrl } from "@/utils/pdf/conversion";

export type PdfUrls = Record<FormNames, string>;

type IntakeFormContextType = {
  getPdfUrl: (formName: keyof PdfUrls) => string;
  savePdf: (formName: keyof PdfUrls, pdf: PDFDocument) => Promise<void>;
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
    transportationRelease: "",
  });

  const getPdfUrl = (formName: keyof PdfUrls): string => {
    return pdfUrls[formName];
  };

  const savePdf = async (
    formName: keyof PdfUrls,
    pdf: PDFDocument,
  ): Promise<void> => {
    const url = await convertPdfToUrl(pdf);

    setPdfUrls((prev) => ({
      ...prev,
      [formName]: url,
    }));
  };

  return (
    <IntakeFormContext.Provider
      value={{
        getPdfUrl,
        savePdf,
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
