import { DefaultValues } from "react-hook-form";
import { z } from "zod";

import { requiredTrue } from "@/utils/form/validations";

export const confirmationFormSchema = z.object({
  confirm: requiredTrue(
    "You must confirm that all the information provided is accurate.",
  ),
});

export type ConfirmationFormValues = z.infer<typeof confirmationFormSchema>;

export const confirmationFormDefaultValues: DefaultValues<ConfirmationFormValues> =
  {
    confirm: false,
  };
