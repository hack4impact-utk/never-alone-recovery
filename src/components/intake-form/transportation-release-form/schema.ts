import { DefaultValues } from "react-hook-form";
import { z } from "zod";

import { requiredText } from "@/utils/form/validations";

export const transportationReleaseFormSchema = z.object({
  residentSignature: requiredText("Resident signature is required"),
  staffSignature: requiredText("Staff signature is required"),
});

export type TransportationReleaseFormValues = z.infer<
  typeof transportationReleaseFormSchema
>;

export const transportationReleaseFormDefaultValues: DefaultValues<TransportationReleaseFormValues> =
  {
    residentSignature: "",
    staffSignature: "",
  };
