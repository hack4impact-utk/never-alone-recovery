"use client";

import { TextFieldProps } from "@mui/material";
import { ReactNode } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

import ControlledPatternField from "./controlled-pattern-field";

type ControlledPhoneNumberFieldProps<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  showField?: boolean;
  format?: string;
  mask?: string;
  helperText?: TextFieldProps["helperText"];
};

export default function ControlledPhoneNumberField<
  TFieldValues extends FieldValues,
>({
  name,
  control,
  label,
  showField = true,
  format = "(###) ###-####",
  mask = "_",
  helperText,
}: ControlledPhoneNumberFieldProps<TFieldValues>): ReactNode {
  return (
    <ControlledPatternField
      name={name}
      control={control}
      label={label}
      showField={showField}
      format={format}
      mask={mask}
      placeholder={"(123) 456-7890"}
      helperText={helperText}
      type="tel"
      inputMode="tel"
    />
  );
}
