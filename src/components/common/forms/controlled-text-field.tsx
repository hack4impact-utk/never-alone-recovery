"use client";

import { Grid, GridProps, TextField, TextFieldProps } from "@mui/material";
import { ReactNode } from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

type ControlledTextFieldProps<TFieldValues extends FieldValues> =
  TextFieldProps & {
    name: FieldPath<TFieldValues>;
    control: Control<TFieldValues>;
    gridProps?: GridProps;
  };

export default function ControlledTextField<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  gridProps,
  ...rest
}: ControlledTextFieldProps<TFieldValues>): ReactNode {
  return (
    <Grid {...gridProps}>
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
    </Grid>
  );
}
