"use client";

import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { ReactNode } from "react";
import { Control, Controller, FieldError } from "react-hook-form";

type ControlledRadioButtonsProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  errors?: FieldError;
  label: string;
  name: string;
  options: { value: string; label: string }[];
};

export default function ControlledRadioButtons({
  control,
  errors,
  label,
  name,
  options,
}: ControlledRadioButtonsProps): ReactNode {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControl error={!!errors} sx={{ marginBottom: "1rem" }}>
          <FormLabel>{label}</FormLabel>
          <RadioGroup {...field} row>
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </RadioGroup>
          {errors && <FormHelperText>{errors.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}
