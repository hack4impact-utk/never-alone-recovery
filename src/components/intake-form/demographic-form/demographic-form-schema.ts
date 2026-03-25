import { z } from "zod";

export const demographicFormSchema = z.object({
  firstName: z.string().min(1, { message: "First Name is required" }),
  middleName: z.string().min(1, { message: "Middle Name is required" }),
  lastName: z.string().min(1, { message: "Last Name is required" }),
  ssn: z
    .string()
    .regex(/^\d+$/, { message: "SSN must contain only digits" })
    .length(9, { message: "SSN must be 9 digits" })
    .refine((val) => {
      const area = val.slice(0, 3); // AAA
      const group = val.slice(3, 5); // GG
      const serial = val.slice(5, 9); // SSSS

      const areaNum = Number(area);
      const groupNum = Number(group);
      const serialNum = Number(serial);

      // Disallowed conditions
      if (area === "000") return false;
      if (group === "00") return false;
      if (serial === "0000") return false;

      if (area === "666") return false;
      if (areaNum >= 900 && areaNum <= 999) return false;

      // Valid ranges
      if (groupNum < 1 || groupNum > 99) return false;
      if (serialNum < 1 || serialNum > 9999) return false;

      return true;
    }, "Invalid SSN"),
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
