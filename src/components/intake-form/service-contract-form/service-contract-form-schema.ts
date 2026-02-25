import { z } from "zod";

export const serviceContractFormSchema = z.object({
  signed: z.boolean(),
});

export type ServiceContractFormValues = z.infer<
  typeof serviceContractFormSchema
>;

export const serviceContractFormDefaultValues: ServiceContractFormValues = {
  signed: false,
};
