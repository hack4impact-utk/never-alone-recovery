"use client";

import { ReactNode } from "react";

import { useIntakeFormContext } from "@/providers/intake-form-provider";

import DocumentSignature from "../document-signature";

const PDF_PATH = "neveralonerecovery.servicecontract.pdf";

export default function ServiceContractForm(): ReactNode {
  const { serviceContractFormPdfUrl, setServiceContractFormPdfUrl } =
    useIntakeFormContext();

  return (
    <DocumentSignature
      pdfPath={PDF_PATH}
      formTitle="Service Contract Form"
      pdfUrl={serviceContractFormPdfUrl}
      setPdfUrl={setServiceContractFormPdfUrl}
      staffSignatureLocation={{
        x: 150,
        y: 387,
        width: 200,
        height: 50,
      }}
      residentSignatureLocation={{
        x: 150,
        y: 473,
        width: 200,
        height: 50,
      }}
      signaturePage={6}
      annotations={[
        {
          type: "name",
          pageNumber: 0,
          location: {
            x: 100,
            y: 512,
          },
        },
        {
          type: "date",
          pageNumber: 6,
          location: { x: 410, y: 485 },
        },
        {
          type: "date",
          pageNumber: 6,
          location: { x: 410, y: 400 },
        },
      ]}
    />
  );
}
