"use client";
import { PDFDocument } from "pdf-lib";
import { createContext, ReactNode, useContext, useState } from "react";

import { intakeFormSteps } from "@/components/intake-form";
import { FormNames } from "@/components/intake-form/schema";
import { INTAKE_FORM_PDF_FILE_NAMES } from "@/constants/intake-form-file-names";
import { convertPdfToUrl, convertUrlToPdf } from "@/utils/pdf/conversion";

const mergePdfs = async (pdfUrls: string[]): Promise<string> => {
  const mergedPdf = await PDFDocument.create();

  for (const url of pdfUrls) {
    const pdf = await convertUrlToPdf(url);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    for (const page of copiedPages) {
      mergedPdf.addPage(page);
    }
  }

  return await convertPdfToUrl(mergedPdf);
};

type PdfUrls = Record<FormNames, string>;

type IntakeFormContextType = {
  getOriginalPdf: (formName: keyof PdfUrls) => Promise<PDFDocument>;
  getAnnotatedPdfUrl: (formName: keyof PdfUrls) => string;
  saveAnnotatedPdf: (
    formName: keyof PdfUrls,
    pdf: PDFDocument,
  ) => Promise<void>;
  getMergedPdfUrl: () => Promise<string>;
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
    financialResponsibility: "",
    releaseOfInformation: "",
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

  const getMergedPdfUrl = async (): Promise<string> => {
    const pdfs = intakeFormSteps
      .filter((step) => step.name !== "confirmation")
      .map((step) => pdfUrls[step.name as keyof PdfUrls])
      .filter((url) => url !== "") as string[];

    return await mergePdfs(pdfs);
  };

  return (
    <IntakeFormContext.Provider
      value={{
        getOriginalPdf,
        getAnnotatedPdfUrl,
        saveAnnotatedPdf,
        getMergedPdfUrl,
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
