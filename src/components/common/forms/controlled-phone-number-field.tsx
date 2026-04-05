"use client";

import { TextField, TextFieldProps } from "@mui/material";
import { ReactNode } from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { PatternFormat } from "react-number-format";

type ControlledPhoneNumberFieldProps<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  showField?: boolean;
  format?: string;
  mask?: string;
  placeholder?: string;
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
  placeholder,
  helperText,
}: ControlledPhoneNumberFieldProps<TFieldValues>): ReactNode {
  return showField ? (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <PatternFormat
          customInput={TextField}
          label={label}
          fullWidth
          type="tel"
          format={format}
          mask={mask}
          value={field.value ?? ""}
          name={field.name}
          placeholder={placeholder}
          onBlur={field.onBlur}
          onValueChange={({ formattedValue }) => {
            field.onChange(formattedValue);
          }}
          error={!!error}
          helperText={error ? error.message : helperText}
        />
      )}
    />
  ) : null;
}
