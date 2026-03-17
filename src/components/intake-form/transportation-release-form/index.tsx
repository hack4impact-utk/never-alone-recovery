"use client";

import { ReactNode } from "react";

import DocumentSignature from "../document-signature";

const PDF_PATH = "neveralonerecovery.transportationreleaseform.pdf";

export default function TransportationReleaseForm(): ReactNode {
  return (
    <DocumentSignature
      pdfPath={PDF_PATH}
      formTitle="Transportation Release Form"
      form="transformationReleaseForm"
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
      signaturePage={0}
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
