"use client";

import { TextFieldProps } from "@mui/material";
import { ReactNode } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

import ControlledPatternField from "./controlled-pattern-field";

type ControlledDateFieldProps<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  showField?: boolean;
  helperText?: TextFieldProps["helperText"];
  placeholder?: string;
};

export default function ControlledDateField<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  showField = true,
  helperText,
  placeholder,
}: ControlledDateFieldProps<TFieldValues>): ReactNode {
  return (
    <ControlledPatternField
      name={name}
      control={control}
      label={label}
      showField={showField}
      format="##/##/####"
      mask="_"
      placeholder={placeholder ?? "MM/DD/YYYY"}
      helperText={helperText}
      type="tel"
      inputMode="numeric"
    />
  );
}
