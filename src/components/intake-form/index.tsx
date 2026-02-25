"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/dist/client/components/navigation";
import { useSnackbar } from "notistack";
import { ReactNode, useState } from "react";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";

import { useIntakeFormContext } from "@/providers/intake-form-provider";

import BehavioralStandardsForm from "./behavioral-standards-form";
import ConfidentialityAgreementForm from "./confidentiality-agreement-form";
import DemographicForm from "./demographic-form";
import EmergencyContactForm from "./emergency-contact-form";
import FinancialResponsibilityForm from "./financial-responsibility-form";
import {
  intakeFormDefaultValues,
  intakeFormSchema,
  IntakeFormValues,
} from "./intake-form-schema";
import ProbationAndParoleForm from "./probation-and-parole-form";
import ReleaseOfInformationForm from "./release-of-information-form";
import SearchConsentForm from "./search-consent-form";
import ServiceContractForm from "./service-contract-form";
import TemporaryResidencyForm from "./temporary-residency-form";
import TransportationReleaseForm from "./transportation-release-form";

type FormNames = keyof IntakeFormValues;

type IntakeFormStep = {
  name: FormNames;
  form: ReactNode;
};

const intakeFormSteps: IntakeFormStep[] = [
  {
    name: "demographic",
    form: <DemographicForm />,
  },
  {
    name: "transportationRelease",
    form: <TransportationReleaseForm />,
  },
  {
    name: "searchConsent",
    form: <SearchConsentForm />,
  },
  {
    name: "probationAndParole",
    form: <ProbationAndParoleForm />,
  },
  {
    name: "behavioralStandards",
    form: <BehavioralStandardsForm />,
  },
  {
    name: "confidentialityAgreement",
    form: <ConfidentialityAgreementForm />,
  },
  {
    name: "financialResponsibility",
    form: <FinancialResponsibilityForm />,
  },
  {
    name: "releaseOfInformation",
    form: <ReleaseOfInformationForm />,
  },
  {
    name: "serviceContract",
    form: <ServiceContractForm />,
  },
  {
    name: "temporaryResidency",
    form: <TemporaryResidencyForm />,
  },
  {
    name: "emergencyContact",
    form: <EmergencyContactForm />,
  },
];

export default function IntakeForm(): ReactNode {
  const { getIntakeFormPdfUrl } = useIntakeFormContext();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm<IntakeFormValues>({
    resolver: zodResolver(intakeFormSchema),
    defaultValues: intakeFormDefaultValues,
    mode: "onChange",
  });
  const { handleSubmit, trigger } = methods;
  const [step, setStep] = useState(intakeFormSteps[0]);

  const onSubmit = async (data: IntakeFormValues): Promise<void> => {
    // eslint-disable-next-line no-console
    console.log("Form Data:", data);

    const successMessage = `Submitted successfully!`;
    enqueueSnackbar(successMessage, {
      variant: "success",
    });

    const pdfUrl = await getIntakeFormPdfUrl();

    if (pdfUrl) {
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "intake-form.pdf";
      link.click();
    }

    router.push("/");
  };

  const onError = (errors: FieldErrors<IntakeFormValues>): void => {
    // eslint-disable-next-line no-console
    console.log("Validation Errors:", errors);
    enqueueSnackbar("Please fix the errors in the form.", {
      variant: "error",
    });
  };

  const showBackButton = step !== intakeFormSteps[0];
  const showNextButton = step !== intakeFormSteps.at(-1);

  const handleBack = (): void => {
    const currentIndex = intakeFormSteps.findIndex((s) => s.name === step.name);
    setStep(intakeFormSteps[currentIndex - 1]);
  };

  const handleNext = async (): Promise<void> => {
    const isValid = await trigger(step.name);

    if (!isValid) {
      return;
    }

    const currentIndex = intakeFormSteps.findIndex((s) => s.name === step.name);
    setStep(intakeFormSteps[currentIndex + 1]);
  };

  return (
    <Box sx={{ width: "50%", padding: 4 }}>
      <FormProvider {...methods}>
        <Box sx={{ padding: 2 }}>{step.form}</Box>

        <Box sx={{ display: "flex", width: "100%" }}>
          {showBackButton && (
            <Button type="button" variant="outlined" onClick={handleBack}>
              Back
            </Button>
          )}

          {showNextButton ? (
            <Button
              type="button"
              variant="outlined"
              onClick={handleNext}
              sx={{ marginLeft: "auto" }}
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              variant="contained"
              onClick={handleSubmit(onSubmit, onError)}
              sx={{ marginLeft: "auto" }}
            >
              Submit
            </Button>
          )}
        </Box>
      </FormProvider>
    </Box>
  );
}
