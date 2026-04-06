"use client";

import { TextFieldProps } from "@mui/material";
import { ReactNode } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

import ControlledPatternField from "./controlled-pattern-field";

type ControlledSocialSecurityFieldProps<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  showField?: boolean;
  mask?: string;
  placeholder?: string;
  helperText?: TextFieldProps["helperText"];
};

export default function ControlledSocialSecurityField<
  TFieldValues extends FieldValues,
>({
  name,
  control,
  label,
  showField = true,
  mask = "_",
  placeholder,
  helperText,
}: ControlledSocialSecurityFieldProps<TFieldValues>): ReactNode {
  return (
    <ControlledPatternField
      name={name}
      control={control}
      label={label}
      showField={showField}
      format="###-##-####"
      mask={mask}
      placeholder={placeholder}
      helperText={helperText}
      type="tel"
      inputMode="numeric"
    />
  );
}
