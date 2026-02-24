"use client";

import { ReactNode } from "react";

import DocumentSignature from "../document-signature";

const PDF_URL = "neveralonerecovery.searchconsentform.pdf";

export default function SearchConsentForm(): ReactNode {
  return (
    <DocumentSignature
      pdfPath={PDF_URL}
      formTitle="Search Consent Form"
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
