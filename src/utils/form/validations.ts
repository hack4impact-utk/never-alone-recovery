import { z } from "zod";

export const PHONE_NUMBER_REGEX = /^\(\d{3}\) \d{3}-\d{4}$/;
export const SSN_REGEX = /^\d{3}-\d{2}-\d{4}$/;

export const requiredText = (message: string): z.ZodString =>
  z.string().min(1, message);

export const optionalText = z.string().optional();

export const yesNo = z.enum(["Yes", "No"]).optional();

export type YesNo = z.infer<typeof yesNo>;

export const requiredPhone = (requiredMessage: string): z.ZodString =>
  z
    .string()
    .min(1, requiredMessage)
    .regex(PHONE_NUMBER_REGEX, "Enter a valid phone number");

export const requiredSsn = (requiredMessage: string): z.ZodString =>
  z
    .string()
    .min(1, requiredMessage)
    .regex(SSN_REGEX, "Enter a valid social security number");

export const requiredEmail = (requiredMessage: string): z.ZodEmail =>
  z.email({ message: requiredMessage });

export const requiredTrue = (message: string): z.ZodBoolean =>
  z.boolean().refine((val) => val === true, { message });
