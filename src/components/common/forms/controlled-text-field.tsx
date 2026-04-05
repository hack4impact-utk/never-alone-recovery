"use client";

import { TextField, TextFieldProps } from "@mui/material";
import { ReactNode } from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

type ControlledTextFieldProps<TFieldValues extends FieldValues> =
  TextFieldProps & {
    name: FieldPath<TFieldValues>;
    control: Control<TFieldValues>;
    showField?: boolean;
  };

export default function ControlledTextField<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  showField = true,
  ...rest
}: ControlledTextFieldProps<TFieldValues>): ReactNode {
  return showField ? (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...rest}
          label={label}
          error={!!error}
          helperText={error ? error.message : rest.helperText}
          fullWidth
        />
      )}
    />
  ) : null;
}
