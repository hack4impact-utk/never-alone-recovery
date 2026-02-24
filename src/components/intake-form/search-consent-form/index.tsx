"use client";

import { ReactNode } from "react";

import { useIntakeFormContext } from "@/providers/intake-form-provider";

import DocumentSignature from "../document-signature";

const PDF_PATH = "neveralonerecovery.searchconsentform.pdf";

export default function SearchConsentForm(): ReactNode {
  const { searchConsentFormPdfUrl, setSearchConsentFormPdfUrl } =
    useIntakeFormContext();

  return (
    <DocumentSignature
      pdfPath={PDF_PATH}
      formTitle="Search Consent Form"
      pdfUrl={searchConsentFormPdfUrl}
      setPdfUrl={setSearchConsentFormPdfUrl}
      staffSignatureLocation={{
        x: 150,
        y: 100,
        width: 200,
        height: 50,
      }}
      residentSignatureLocation={{
        x: 150,
        y: 155,
        width: 200,
        height: 50,
      }}
      annotations={[
        {
          type: "name",
          pageNumber: 0,
          location: {
            x: 100,
            y: 230,
          },
        },
        {
          type: "date",
          pageNumber: 0,
          location: { x: 475, y: 115 },
        },
        {
          type: "date",
          pageNumber: 0,
          location: { x: 475, y: 175 },
        },
      ]}
    />
  );
}
