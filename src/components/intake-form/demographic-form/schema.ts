import { DefaultValues } from "react-hook-form";
import { z } from "zod";

export const demographicFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  socialSecurityNumber: z.string().min(1, "Social security number is required"),
  ethnicity: z.enum(
    [
      "White",
      "Black or African American",
      "American Indian or Alaska Native",
      "Asian",
      "Native Hawaiian or Other Pacific Islander",
      "Other",
    ],
    "Ethnicity is required",
  ),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  tomis: z.string().min(1, "TOMIS is required"),
  email: z.email("Invalid email address").min(1, "Email is required"),
});

export type DemographicFormValues = z.infer<typeof demographicFormSchema>;

export const demographicFormDefaultValues: DefaultValues<DemographicFormValues> =
  {
    firstName: "",
    middleName: "",
    lastName: "",
    socialSecurityNumber: "",
    dateOfBirth: "",
    ethnicity: undefined,
    phoneNumber: "",
    tomis: "",
    email: "",
  };
