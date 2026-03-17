"use client";

import { ReactNode } from "react";

import DocumentSignature from "../document-signature";

const PDF_PATH = "neveralonerecovery.financialresponsibility.pdf";

export default function FinancialResponsibilityForm(): ReactNode {
  return (
    <DocumentSignature
      pdfPath={PDF_PATH}
      formTitle="Financial Responsibility Form"
      form="financialResponsibilityForm"
      staffSignatureLocation={{
        x: 150,
        y: 145,
        width: 200,
        height: 50,
      }}
      residentSignatureLocation={{
        x: 150,
        y: 185,
        width: 200,
        height: 50,
      }}
      signaturePage={0}
      annotations={[
        {
          type: "name",
          pageNumber: 0,
          location: {
            x: 170,
            y: 565,
          },
        },
        {
          type: "date",
          pageNumber: 0,
          location: { x: 430, y: 197 },
        },
        {
          type: "date",
          pageNumber: 0,
          location: { x: 430, y: 155 },
        },
      ]}
    />
  );
}
