import { z } from "zod";

export const PHONE_NUMBER_REGEX = /^\(\d{3}\) \d{3}-\d{4}$/;

export const requiredText = (message: string): z.ZodString =>
  z.string().min(1, message);

export const optionalText = z.string().optional();

export const yesNo = z.enum(["Yes", "No"]).optional();

export const requiredPhone = (requiredMessage: string): z.ZodString =>
  z
    .string()
    .min(1, requiredMessage)
    .regex(PHONE_NUMBER_REGEX, "Enter a valid phone number");

export const requiredEmail = (
  requiredMessage: string,
  invalidMessage = "Invalid email address",
): z.ZodString => z.string().min(1, requiredMessage).email(invalidMessage);

export const requiredTrue = (message: string): z.ZodType<boolean> =>
  z.boolean().refine((val) => val === true, { message });
