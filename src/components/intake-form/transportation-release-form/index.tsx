"use client";

import { ReactNode } from "react";

import { useIntakeFormContext } from "@/providers/intake-form-provider";

import DocumentSignature from "../document-signature";

const PDF_PATH = "neveralonerecovery.transportationreleaseform.pdf";

export default function TransportationReleaseForm(): ReactNode {
  const {
    transformationReleaseFormPdfUrl,
    setTransformationReleaseFormPdfUrl,
  } = useIntakeFormContext();

  return (
    <DocumentSignature
      pdfPath={PDF_PATH}
      formTitle="Transportation Release Form"
      pdfUrl={transformationReleaseFormPdfUrl}
      setPdfUrl={setTransformationReleaseFormPdfUrl}
      staffSignatureLocation={{
        x: 150,
        y: 325,
        width: 200,
        height: 50,
      }}
      residentSignatureLocation={{
        x: 150,
        y: 390,
        width: 200,
        height: 50,
      }}
      annotations={[
        {
          type: "name",
          pageNumber: 0,
          location: {
            x: 100,
            y: 550,
          },
        },
        {
          type: "date",
          pageNumber: 0,
          location: { x: 400, y: 340 },
        },
        {
          type: "date",
          pageNumber: 0,
          location: { x: 400, y: 410 },
        },
      ]}
    />
  );
}
