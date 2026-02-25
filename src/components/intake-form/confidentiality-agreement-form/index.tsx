"use client";

import { ReactNode } from "react";

import { useIntakeFormContext } from "@/providers/intake-form-provider";

import DocumentSignature from "../document-signature";

const PDF_PATH = "neveralonerecovery.confidentialityagreement.pdf";

export default function ConfidentialityAgreementForm(): ReactNode {
  const {
    confidentialityAgreementFormPdfUrl,
    setConfidentialityAgreementFormPdfUrl,
  } = useIntakeFormContext();

  return (
    <DocumentSignature
      pdfPath={PDF_PATH}
      formTitle="Confidentiality Agreement Form"
      pdfUrl={confidentialityAgreementFormPdfUrl}
      setPdfUrl={setConfidentialityAgreementFormPdfUrl}
      staffSignatureLocation={{
        x: 150,
        y: 130,
        width: 200,
        height: 50,
      }}
      residentSignatureLocation={{
        x: 150,
        y: 180,
        width: 200,
        height: 50,
      }}
      signaturePage={0}
      annotations={[
        {
          type: "name",
          pageNumber: 0,
          location: {
            x: 100,
            y: 315,
          },
        },
        {
          type: "date",
          pageNumber: 0,
          location: { x: 370, y: 195 },
        },
        {
          type: "date",
          pageNumber: 0,
          location: { x: 370, y: 145 },
        },
      ]}
    />
  );
}
