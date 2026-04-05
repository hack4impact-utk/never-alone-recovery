"use client";

import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  GridProps,
} from "@mui/material";
import { ReactNode } from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

type ControlledCheckboxProps<TFieldValues extends FieldValues> =
  CheckboxProps & {
    name: FieldPath<TFieldValues>;
    control: Control<TFieldValues>;
    label: string;
    gridProps?: GridProps;
  };

export default function ControlledCheckbox<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  gridProps,
  ...rest
}: ControlledCheckboxProps<TFieldValues>): ReactNode {
  return (
    <Grid {...gridProps}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <FormControl error={!!error}>
            <FormControlLabel
              label={label}
              control={
                <Checkbox
                  {...rest}
                  checked={!!field.value}
                  onChange={(event) => {
                    field.onChange(event.target.checked);
                  }}
                  name={field.name}
                />
              }
            />
            {error ? <FormHelperText>{error.message}</FormHelperText> : null}
          </FormControl>
        )}
      />
    </Grid>
  );
}
