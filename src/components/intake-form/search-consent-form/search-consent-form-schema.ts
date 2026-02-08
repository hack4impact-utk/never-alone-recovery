import { z } from "zod";

export const searchConsentFormSchema = z.object({
  signed: z.boolean(),
});

export type SearchConsentFormValues = z.infer<typeof searchConsentFormSchema>;

export const searchConsentFormDefaultValues: SearchConsentFormValues = {
  signed: false,
};
