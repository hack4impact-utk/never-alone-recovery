"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button } from "@mui/material";
import { useSnackbar } from "notistack";
import { ReactNode, useState } from "react";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";

import DemographicForm from "./demographic-form";
import EmergencyContactForm from "./emergency-contact-form";
import {
  intakeFormDefaultValues,
  intakeFormSchema,
  IntakeFormValues,
} from "./intake-form-schema";

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
    name: "emergencyContact",
    form: <EmergencyContactForm />,
  },
];

export default function IntakeForm(): ReactNode {
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm<IntakeFormValues>({
    resolver: zodResolver(intakeFormSchema),
    defaultValues: intakeFormDefaultValues,
    mode: "onChange",
  });
  const { handleSubmit, trigger } = methods;
  const [step, setStep] = useState(intakeFormSteps[0]);

  const onSubmit = (data: IntakeFormValues): void => {
    // eslint-disable-next-line no-console
    console.log("Form Data:", data);

    const successMessage = `Submitted successfully!`;
    enqueueSnackbar(successMessage, {
      variant: "success",
    });
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
    <Box sx={{ width: "50%" }}>
      <FormProvider {...methods}>
        <Box>{step.form}</Box>

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
              onClick={() => handleSubmit(onSubmit, onError)()}
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
