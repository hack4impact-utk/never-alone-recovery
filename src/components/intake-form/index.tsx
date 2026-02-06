"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button } from "@mui/material";
import { ReactNode, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

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
  const methods = useForm<IntakeFormValues>({
    resolver: zodResolver(intakeFormSchema),
    defaultValues: intakeFormDefaultValues,
  });
  const [step, setStep] = useState(intakeFormSteps[0]);

  const goToNextStep = async (): Promise<void> => {
    const isValid = await methods.trigger(step.name);

    if (!isValid) {
      return;
    }

    const currentIndex = intakeFormSteps.indexOf(step);
    if (currentIndex < intakeFormSteps.length - 1) {
      setStep(intakeFormSteps[currentIndex + 1]);
    }
  };

  const goToPreviousStep = (): void => {
    const currentIndex = intakeFormSteps.indexOf(step);
    if (currentIndex > 0) {
      setStep(intakeFormSteps[currentIndex - 1]);
    }
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 2, width: "50%" }}
    >
      <FormProvider {...methods}>
        <Box>{step.form}</Box>
      </FormProvider>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="outlined" onClick={goToPreviousStep}>
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={goToNextStep}>
          Next
        </Button>
      </Box>
    </Box>
  );
}
