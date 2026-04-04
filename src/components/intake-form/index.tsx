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

import DemographicForm from "./demographic-form";
import {
  intakeFormDefaultValues,
  intakeFormSchema,
  IntakeFormValues,
} from "./schema";

type FormNames = keyof IntakeFormValues;

type IntakeFormStep = {
  name: FormNames;
  label: string;
  form: ReactNode;
};

const intakeFormSteps: IntakeFormStep[] = [
  {
    name: "demographic",
    label: "Demographic",
    form: <DemographicForm />,
  },
];

export default function IntakeForm(): ReactNode {
  const { enqueueSnackbar } = useSnackbar();
  const [step, setStep] = useState(intakeFormSteps[0]);
  const currentIndex = intakeFormSteps.findIndex((s) => s.name === step.name);
  const methods = useForm<IntakeFormValues>({
    resolver: zodResolver(intakeFormSchema),
    defaultValues: intakeFormDefaultValues,
  });
  const { trigger, watch, setValue, handleSubmit } = methods;

  const showBackButton = step !== intakeFormSteps[0];
  const showNextButton = step !== intakeFormSteps.at(-1);

  const handleBack = (): void => {
    setStep(intakeFormSteps[currentIndex - 1]);
  };

  const handleNext = async (): Promise<void> => {
    const isValid = await trigger(step.name);

    if (!isValid) {
      return;
    }

    setStep(intakeFormSteps[currentIndex + 1]);
  };

  useFormPersist("intakeForm", {
    watch,
    setValue,
    storage: globalThis.localStorage,
  });

  const onError = (): void => {
    enqueueSnackbar("Please fix the errors in the form.", {
      variant: "error",
    });
  };

  const onSubmit = (data: IntakeFormValues): void => {
    enqueueSnackbar("Form submitted successfully!", {
      variant: "success",
    });

    void data;
  };

  return (
    <FormProvider {...methods}>
      <Box component="form" sx={{ maxWidth: 1100, mt: 4, mx: "auto" }}>
        <Paper
          elevation={2}
          sx={{
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
            </Box>

            <Box sx={{ flex: 1, px: { xs: 2, sm: 3 }, py: 3 }}>
              <Box>{step.form}</Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  pt: 3,
                }}
              >
                <Button
                  type="button"
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
                    type="submit"
                    variant="contained"
                    onClick={handleSubmit(onSubmit, onError)}
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
