import { DefaultValues } from "react-hook-form";
import { z } from "zod";

import { requiredPhone, requiredText } from "@/utils/form/validations";

export const emergencyContactFormSchema = z.object({
  contact1Name: requiredText("Contact 1 name is required"),
  contact1Relationship: requiredText("Contact 1 relationship is required"),
  contact1PhoneNumber: requiredPhone("Contact 1 phone number is required"),
  contact1Address: requiredText("Contact 1 address is required"),
  contact2Name: requiredText("Contact 2 name is required"),
  contact2Relationship: requiredText("Contact 2 relationship is required"),
  contact2PhoneNumber: requiredPhone("Contact 2 phone number is required"),
  contact2Address: requiredText("Contact 2 address is required"),
});

export type EmergencyContactFormValues = z.infer<
  typeof emergencyContactFormSchema
>;

export const emergencyContactFormDefaultValues: DefaultValues<EmergencyContactFormValues> =
  {
    contact1Name: "",
    contact1Relationship: "",
    contact1PhoneNumber: "",
    contact1Address: "",
    contact2Name: "",
    contact2Relationship: "",
    contact2PhoneNumber: "",
    contact2Address: "",
  };
