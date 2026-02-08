"use client";

import { TextField } from "@mui/material";
import { ReactNode } from "react";
import { Control, Controller, FieldError } from "react-hook-form";

type ControlledTextFieldProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  errors?: FieldError;
  label: string;
  name: string;
  multiline?: boolean;
  rows?: number;
};

export default function ControlledTextField({
  control,
  errors,
  label,
  name,
  multiline = false,
  rows = 1,
}: ControlledTextFieldProps): ReactNode {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          error={!!errors}
          helperText={errors?.message}
          multiline={multiline}
          rows={rows}
          fullWidth
          sx={{ marginBottom: "1rem" }}
        />
      )}
    />
  );
}
