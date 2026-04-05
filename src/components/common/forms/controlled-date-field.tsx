"use client";

import { GridProps, TextFieldProps } from "@mui/material";
import { ReactNode } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

import ControlledTextField from "./controlled-text-field";

type ControlledDateFieldProps<TFieldValues extends FieldValues> =
  TextFieldProps & {
    name: FieldPath<TFieldValues>;
    control: Control<TFieldValues>;
    gridProps?: GridProps;
    showField?: boolean;
  };

export default function ControlledDateField<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  showField = true,
  ...rest
}: ControlledDateFieldProps<TFieldValues>): ReactNode {
  return (
    <ControlledTextField
      name={name}
      control={control}
      type="date"
      label={label}
      showField={showField}
      slotProps={{ inputLabel: { shrink: true } }}
      {...rest}
    />
  );
}
