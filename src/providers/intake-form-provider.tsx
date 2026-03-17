"use client";
import { PDFDocument } from "pdf-lib";
import { createContext, ReactNode, useContext, useState } from "react";

import { Forms } from "@/types/forms";
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

export type PdfUrls = Record<Forms, string>;

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
    transformationReleaseForm: "",
    searchConsentForm: "",
    confidentialityAgreementForm: "",
    financialResponsibilityForm: "",
    behavioralStandardsForm: "",
    probationAndParoleForm: "",
    releaseOfInformationForm: "",
    serviceContractForm: "",
    temporaryResidencyForm: "",
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
      pdfUrls.transformationReleaseForm,
      pdfUrls.searchConsentForm,
      pdfUrls.probationAndParoleForm,
      pdfUrls.behavioralStandardsForm,
      pdfUrls.confidentialityAgreementForm,
      pdfUrls.financialResponsibilityForm,
      pdfUrls.releaseOfInformationForm,
      pdfUrls.serviceContractForm,
      pdfUrls.temporaryResidencyForm,
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
