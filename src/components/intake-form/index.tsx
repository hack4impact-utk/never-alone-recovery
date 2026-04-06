"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { ReactNode, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";

import ConfirmationForm from "./confirmation-form";
import DemographicForm from "./demographic-form";
import EmergencyContactForm from "./emergency-contact-form";
import ResetButton from "./reset-button";
import {
  FormNames,
  intakeFormDefaultValues,
  intakeFormSchema,
  IntakeFormValues,
} from "./schema";
import ServiceContractForm from "./service-contract-form";
import TransportationReleaseForm from "./transportation-release-form";

const INTAKE_FORM_STORAGE_KEY = "intakeForm";

type IntakeFormStep = {
  name: FormNames | "confirmation";
  label: string;
  form: ReactNode;
};

export const intakeFormSteps: IntakeFormStep[] = [
  {
    name: "demographic",
    label: "Demographic",
    form: <DemographicForm />,
  },
  {
    name: "serviceContract",
    label: "Service Contract",
    form: <ServiceContractForm />,
  },
  {
    name: "transportationRelease",
    label: "Transportation Release",
    form: <TransportationReleaseForm />,
  },
  {
    name: "emergencyContact",
    label: "Emergency Contact",
    form: <EmergencyContactForm />,
  },
  {
    name: "confirmation",
    label: "Confirmation",
    form: <ConfirmationForm />,
  },
];

export default function IntakeForm(): ReactNode {
  const { enqueueSnackbar } = useSnackbar();
  const [step, setStep] = useState(intakeFormSteps[0]);
  const currentIndex = intakeFormSteps.findIndex((s) => s.name === step.name);
  const methods = useForm<IntakeFormValues>({
    resolver: zodResolver(intakeFormSchema),
    defaultValues: intakeFormDefaultValues,
    mode: "onChange",
  });
  const {
    trigger,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const showBackButton = step !== intakeFormSteps[0];
  const showNextButton = step !== intakeFormSteps.at(-1);

  useFormPersist(INTAKE_FORM_STORAGE_KEY, {
    watch,
    setValue,
    storage: globalThis.localStorage,
  });

  const handleBack = (): void => {
    setStep(intakeFormSteps[currentIndex - 1]);
  };

  const handleNext = async (): Promise<void> => {
    const isValid = await trigger(step.name);

    if (isValid) {
      setStep(intakeFormSteps[currentIndex + 1]);
      window.scrollTo(0, 0);
      return;
    }

    const errorCount = Object.keys(errors[step.name] || {}).length;
    enqueueSnackbar(
      `Please fix ${errorCount} validation error(s) before proceeding.`,
      {
        variant: "error",
      },
    );
  };

  const handleReset = (): void => {
    reset();
    globalThis.localStorage.removeItem(INTAKE_FORM_STORAGE_KEY);
    setStep(intakeFormSteps[0]);
  };

  const onSubmit = (_data: IntakeFormValues): void => {
    void _data;

    enqueueSnackbar("Form submitted successfully!", {
      variant: "success",
    });
  };

  return (
    <FormProvider {...methods}>
      <Box component="form" sx={{ width: "100%", my: 4, mx: "auto" }}>
        <Paper
          elevation={2}
          sx={{
            width: "100%",
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "stretch",
            }}
          >
            <Box
              sx={{
                width: { xs: "100%", sm: 225 },
                px: { xs: 2, sm: 3 },
                py: 3,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                Intake Form
              </Typography>
              <Stepper activeStep={currentIndex} orientation="vertical">
                {intakeFormSteps.map((formStep) => (
                  <Step key={formStep.name}>
                    <StepLabel>{formStep.label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Step {currentIndex + 1} of {intakeFormSteps.length}
              </Typography>
              <Box sx={{ mt: 3 }}>
                <ResetButton onConfirmReset={handleReset} />
              </Box>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                minWidth: 0,
                p: 3,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box sx={{ width: "100%" }}>{step.form}</Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  pt: 3,
                }}
              >
                <Button
                  variant="outlined"
                  onClick={handleBack}
                  disabled={!showBackButton}
                >
                  Back
                </Button>

                {showNextButton ? (
                  <Button
                    type="button"
                    variant="contained"
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="contained"
                    onClick={handleSubmit(onSubmit)}
                  >
                    Submit
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </FormProvider>
  );
}
