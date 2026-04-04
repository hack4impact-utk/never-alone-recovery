"use client";
import { createContext, ReactNode, useContext, useState } from "react";

import { FormNames } from "@/components/intake-form/schema";

export type PdfUrls = Record<FormNames, string>;

type IntakeFormContextType = {
  getPdfUrl: (formName: keyof PdfUrls) => string;
  setPdfUrl: (formName: keyof PdfUrls, url: string) => void;
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

  const setPdfUrl = (formName: keyof PdfUrls, url: string): void => {
    setPdfUrls((prev) => ({
      ...prev,
      [formName]: url,
    }));
  };

  return (
    <IntakeFormContext.Provider
      value={{
        getPdfUrl,
        setPdfUrl,
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
