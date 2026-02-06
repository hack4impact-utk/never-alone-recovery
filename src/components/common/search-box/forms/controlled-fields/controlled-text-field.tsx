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
};

export default function ControlledTextField({
  control,
  errors,
  label,
  name,
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
          fullWidth
          sx={{ marginBottom: "1rem", maxWidth: "350px", display: "block" }}
        />
      )}
    />
  );
}
