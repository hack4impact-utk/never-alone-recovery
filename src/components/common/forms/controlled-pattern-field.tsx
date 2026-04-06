"use client";

import { TextField, TextFieldProps } from "@mui/material";
import { ReactNode } from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { PatternFormat } from "react-number-format";

type ControlledPatternFieldProps<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  format: string;
  showField?: boolean;
  mask?: string;
  placeholder?: string;
  helperText?: TextFieldProps["helperText"];
  type?: "text" | "password" | "tel";
  inputMode?:
    | "text"
    | "search"
    | "email"
    | "tel"
    | "url"
    | "none"
    | "numeric"
    | "decimal";
};

export default function ControlledPatternField<
  TFieldValues extends FieldValues,
>({
  name,
  control,
  label,
  format,
  showField = true,
  mask = "_",
  placeholder,
  helperText,
  type = "text",
  inputMode,
}: ControlledPatternFieldProps<TFieldValues>): ReactNode {
  return showField ? (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <PatternFormat
          customInput={TextField}
          label={label}
          fullWidth
          format={format}
          mask={mask}
          type={type}
          value={field.value ?? ""}
          name={field.name}
          placeholder={placeholder}
          onBlur={field.onBlur}
          onValueChange={({ formattedValue }) => {
            field.onChange(formattedValue);
          }}
          error={!!error}
          helperText={error ? error.message : helperText}
          inputMode={inputMode}
        />
      )}
    />
  ) : null;
}
