import { DefaultValues } from "react-hook-form";
import { z } from "zod";

export const confirmationFormSchema = z.object({
  confirm: z.boolean().refine((val) => val === true, {
    message:
      "You must confirm that the above emergency contact information is accurate.",
  }),
});

export type ConfirmationFormValues = z.infer<typeof confirmationFormSchema>;

export const confirmationFormDefaultValues: DefaultValues<ConfirmationFormValues> =
  {
    confirm: false,
  };
