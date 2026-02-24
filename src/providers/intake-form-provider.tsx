"use client";
import { PDFDocument } from "pdf-lib";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

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

type IntakeFormContextType = {
  transformationReleaseFormPdfUrl: string;
  setTransformationReleaseFormPdfUrl: Dispatch<SetStateAction<string>>;
  searchConsentFormPdfUrl: string;
  setSearchConsentFormPdfUrl: Dispatch<SetStateAction<string>>;
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
  const [transformationReleaseFormPdfUrl, setTransformationReleaseFormPdfUrl] =
    useState<string>("");
  const [searchConsentFormPdfUrl, setSearchConsentFormPdfUrl] =
    useState<string>("");

  const getIntakeFormPdfUrl = async (): Promise<string> => {
    return await mergePdfs([
      transformationReleaseFormPdfUrl,
      searchConsentFormPdfUrl,
    ]);
  };

  return (
    <IntakeFormContext.Provider
      value={{
        transformationReleaseFormPdfUrl,
        setTransformationReleaseFormPdfUrl,
        searchConsentFormPdfUrl,
        setSearchConsentFormPdfUrl,
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
