import { DefaultValues } from "react-hook-form";
import { z } from "zod";

export const serviceContractFormSchema = z.object({
  entryDate: z.string().min(1, "Entry date is required"),
  residentSignature: z.string().min(1, "Resident signature is required"),
  staffSignature: z.string().min(1, "Staff signature is required"),
});

export type ServiceContractFormValues = z.infer<
  typeof serviceContractFormSchema
>;

export const serviceContractFormDefaultValues: DefaultValues<ServiceContractFormValues> =
  {
    entryDate: "",
    residentSignature: "",
    staffSignature: "",
  };
