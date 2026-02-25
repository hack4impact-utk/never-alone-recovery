"use client";

import { ReactNode } from "react";

import { useIntakeFormContext } from "@/providers/intake-form-provider";

import DocumentSignature from "../document-signature";

const PDF_PATH = "neveralonerecovery.releaseofinformation.pdf";

export default function ReleaseOfInformationForm(): ReactNode {
  const { releaseOfInformationFormPdfUrl, setReleaseOfInformationFormPdfUrl } =
    useIntakeFormContext();

  return (
    <DocumentSignature
      pdfPath={PDF_PATH}
      formTitle="Release of Information Form"
      pdfUrl={releaseOfInformationFormPdfUrl}
      setPdfUrl={setReleaseOfInformationFormPdfUrl}
      staffSignatureLocation={{
        x: 150,
        y: 90,
        width: 200,
        height: 50,
      }}
      residentSignatureLocation={{
        x: 150,
        y: 137,
        width: 200,
        height: 30,
      }}
      signaturePage={0}
      annotations={[
        {
          type: "name",
          pageNumber: 0,
          location: {
            x: 130,
            y: 550,
          },
        },
        {
          type: "date",
          pageNumber: 0,
          location: { x: 370, y: 145 },
        },
        {
          type: "date",
          pageNumber: 0,
          location: { x: 370, y: 101 },
        },
      ]}
    />
  );
}
