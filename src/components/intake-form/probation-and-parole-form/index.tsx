"use client";

import { ReactNode } from "react";

import { useIntakeFormContext } from "@/providers/intake-form-provider";

import DocumentSignature from "../document-signature";

const PDF_PATH = "neveralonerecovery.probationandparoleform.pdf";

export default function ProbationAndParoleForm(): ReactNode {
  const { probationAndParoleFormPdfUrl, setProbationAndParoleFormPdfUrl } =
    useIntakeFormContext();

  return (
    <DocumentSignature
      pdfPath={PDF_PATH}
      formTitle="Probation and Parole Form"
      pdfUrl={probationAndParoleFormPdfUrl}
      setPdfUrl={setProbationAndParoleFormPdfUrl}
      staffSignatureLocation={{
        x: 150,
        y: 100,
        width: 200,
        height: 50,
      }}
      residentSignatureLocation={{
        x: 150,
        y: 170,
        width: 200,
        height: 50,
      }}
      signaturePage={0}
      annotations={[
        {
          type: "date",
          pageNumber: 0,
          location: { x: 460, y: 185 },
        },
        {
          type: "date",
          pageNumber: 0,
          location: { x: 460, y: 115 },
        },
      ]}
    />
  );
}
