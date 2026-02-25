"use client";

import { ReactNode } from "react";

import { useIntakeFormContext } from "@/providers/intake-form-provider";

import DocumentSignature from "../document-signature";

const PDF_PATH = "neveralonerecovery.temporaryresidencyform.pdf";

export default function TemporaryResidencyForm(): ReactNode {
  const { temporaryResidencyFormPdfUrl, setTemporaryResidencyFormPdfUrl } =
    useIntakeFormContext();

  return (
    <DocumentSignature
      pdfPath={PDF_PATH}
      formTitle="Temporary Residency Form"
      pdfUrl={temporaryResidencyFormPdfUrl}
      setPdfUrl={setTemporaryResidencyFormPdfUrl}
      staffSignatureLocation={{
        x: 150,
        y: 90,
        width: 200,
        height: 47,
      }}
      residentSignatureLocation={{
        x: 150,
        y: 128,
        width: 200,
        height: 47,
      }}
      signaturePage={0}
      annotations={[
        {
          type: "name",
          pageNumber: 0,
          location: {
            x: 120,
            y: 542,
          },
        },
        {
          type: "date",
          pageNumber: 0,
          location: { x: 460, y: 140 },
        },
        {
          type: "date",
          pageNumber: 0,
          location: { x: 460, y: 101 },
        },
      ]}
    />
  );
}
