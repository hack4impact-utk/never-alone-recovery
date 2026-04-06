import { DefaultValues } from "react-hook-form";
import { z } from "zod";

import { requiredEmail, requiredText } from "@/utils/form/validations";

export const releaseOfInformationFormSchema = z.object({
  holdingAgency: requiredText("Holding agency is required"),
  address: requiredText("Address is required"),
  phoneNumber: requiredText("Phone number is required"),
  email: requiredEmail("A valid email is required"),
  residentSignature: requiredText("Resident signature is required"),
  staffSignature: requiredText("Staff signature is required"),
});

export type ReleaseOfInformationFormValues = z.infer<
  typeof releaseOfInformationFormSchema
>;

export const releaseOfInformationFormDefaultValues: DefaultValues<ReleaseOfInformationFormValues> =
  {
    residentSignature: "",
    staffSignature: "",
    holdingAgency: "",
    address: "",
    phoneNumber: "",
    email: "",
  };
