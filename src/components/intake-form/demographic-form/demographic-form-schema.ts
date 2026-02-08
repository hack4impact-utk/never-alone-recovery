import { z } from "zod";

export const demographicFormSchema = z.object({
  firstName: z.string().min(1, { message: "First Name is required" }),
  middleName: z.string().min(1, { message: "Middle Name is required" }),
  lastName: z.string().min(1, { message: "Last Name is required" }),
  ssn: z.string().length(9, { message: "SSN is required" }),
  dateOfBirth: z.coerce.date<Date>({ message: "Date of Birth is required" }),
  gender: z.enum(["male", "female"]),
  tomis: z
    .string()
    .regex(/^\d+$/, { message: "TOMIS must contain only digits" })
    .length(8, { message: "TOMIS must be 8 digits" }),
  email: z.email({ message: "Please enter a valid email address" }),
  lastKnownAddress: z.string().min(1, { message: "Address is required" }),
  cleanTime: z.string().min(1, { message: "This field is required" }),
  drugOfChoice: z.string().min(1, { message: "This field is required" }),
  priorRecoveryExperience: z
    .string()
    .min(1, { message: "This field is required" }),
});

export type DemographicFormValues = z.infer<typeof demographicFormSchema>;

export const demographicFormDefaultValues: DemographicFormValues = {
  firstName: "",
  middleName: "",
  lastName: "",
  ssn: "",
  dateOfBirth: new Date(),
  gender: "female",
  tomis: "",
  email: "",
  lastKnownAddress: "",
  cleanTime: "",
  drugOfChoice: "",
  priorRecoveryExperience: "",
};
