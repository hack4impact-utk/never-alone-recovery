import { z } from "zod";

export const confirmationFormSchema = z.object({
  residentConfirmation: z.boolean().refine((val) => val === true, {
    message: "Must confirm pdf is accurate",
  }),
});

export type ConfirmationFormValues = z.infer<typeof confirmationFormSchema>;

export const confirmationFormDefaultValues: ConfirmationFormValues = {
  residentConfirmation: false,
};
