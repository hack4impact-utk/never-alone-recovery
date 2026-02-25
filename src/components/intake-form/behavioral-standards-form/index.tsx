"use client";

import { ReactNode } from "react";

import { useIntakeFormContext } from "@/providers/intake-form-provider";

import DocumentSignature from "../document-signature";

const PDF_PATH = "neveralonerecovery.behavioralstandards.pdf";

export default function BehavioralStandardsForm(): ReactNode {
  const { behavioralStandardsFormPdfUrl, setBehavioralStandardsFormPdfUrl } =
    useIntakeFormContext();

  return (
    <DocumentSignature
      pdfPath={PDF_PATH}
      formTitle="Behavioral Standards Form"
      pdfUrl={behavioralStandardsFormPdfUrl}
      setPdfUrl={setBehavioralStandardsFormPdfUrl}
      staffSignatureLocation={{
        x: 150,
        y: 115,
        width: 200,
        height: 50,
      }}
      residentSignatureLocation={{
        x: 150,
        y: 160,
        width: 200,
        height: 50,
      }}
      signaturePage={3}
      annotations={[
        {
          type: "date",
          pageNumber: 3,
          location: { x: 450, y: 172 },
        },
        {
          type: "date",
          pageNumber: 3,
          location: { x: 450, y: 127 },
        },
      ]}
    />
  );
}
