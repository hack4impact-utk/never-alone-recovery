import { DefaultValues } from "react-hook-form";
import { z } from "zod";

import {
  demographicFormDefaultValues,
  demographicFormSchema,
} from "./demographic-form/schema";

export const intakeFormSchema = z.object({
  demographic: demographicFormSchema,
});

export type IntakeFormValues = z.infer<typeof intakeFormSchema>;

export const intakeFormDefaultValues: DefaultValues<IntakeFormValues> = {
  demographic: demographicFormDefaultValues,
};
