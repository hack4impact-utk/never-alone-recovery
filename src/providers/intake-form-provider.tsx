"use client";
import { PDFDocument } from "pdf-lib";
import { createContext, ReactNode, useContext, useState } from "react";

import { IntakeSignatureForms } from "@/components/intake-form/intake-form-schema";
import { convertPdfToUrl, covertUrlToPdf } from "@/utils/pdf/conversion";

const mergePdfs = async (pdfUrls: string[]): Promise<string> => {
  const mergedPdf = await PDFDocument.create();

  for (const url of pdfUrls) {
    const pdf = await covertUrlToPdf(url);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    for (const page of copiedPages) {
      mergedPdf.addPage(page);
    }
  }

  return await convertPdfToUrl(mergedPdf);
};

export type PdfUrls = Record<IntakeSignatureForms, string>;

type IntakeFormContextType = {
  getPdfUrl: (formName: keyof PdfUrls) => string;
  setPdfUrl: (formName: keyof PdfUrls, url: string) => void;
  getIntakeFormPdfUrl: () => Promise<string>;
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
    transportationRelease: "",
    searchConsent: "",
    confidentialityAgreement: "",
    financialResponsibility: "",
    behavioralStandards: "",
    probationAndParole: "",
    releaseOfInformation: "",
    serviceContract: "",
    temporaryResidency: "",
  });

  const getPdfUrl = (formName: keyof PdfUrls): string => {
    return pdfUrls[formName];
  };

  const setPdfUrl = (formName: keyof PdfUrls, url: string): void => {
    setPdfUrls((prev) => ({
      ...prev,
      [formName]: url,
    }));
  };

  const getIntakeFormPdfUrl = async (): Promise<string> => {
    return await mergePdfs([
      pdfUrls.transportationRelease,
      pdfUrls.searchConsent,
      pdfUrls.probationAndParole,
      pdfUrls.behavioralStandards,
      pdfUrls.confidentialityAgreement,
      pdfUrls.financialResponsibility,
      pdfUrls.releaseOfInformation,
      pdfUrls.serviceContract,
      pdfUrls.temporaryResidency,
    ]);
  };

  return (
    <IntakeFormContext.Provider
      value={{
        getPdfUrl,
        setPdfUrl,
        getIntakeFormPdfUrl,
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
