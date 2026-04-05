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
import {
  Control,
  Controller,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

type FormRadioOption = {
  label: string;
  value: string;
};

type ControlledRadioButtonProps<T extends FieldValues> = {
  name: UseControllerProps<T>["name"];
  control: Control<T>;
  label: string;
  options: FormRadioOption[];
  row?: boolean;
  showField?: boolean;
};

export default function ControlledRadioButton<
  TFieldValues extends FieldValues,
>({
  name,
  control,
  label,
  options,
  row = true,
  showField = true,
}: ControlledRadioButtonProps<TFieldValues>): ReactNode {
  return showField ? (
    <Controller
      name={name}
      control={control}
      defaultValue={"" as never}
      render={({ field, fieldState: { error } }) => (
        <FormControl error={!!error}>
          <FormLabel id={`${name}-label`}>{label}</FormLabel>
          <RadioGroup
            aria-labelledby={`${name}-label`}
            name={field.name}
            row={row}
            sx={{ mt: 0.25, gap: 0.5 }}
            value={field.value ?? ""}
            onChange={(event) => {
              field.onChange(event.target.value);
            }}
          >
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                sx={{ ml: 0, mr: 1 }}
                control={<Radio size="small" sx={{ p: 0.5 }} />}
                label={option.label}
              />
            ))}
          </RadioGroup>
          {error ? <FormHelperText>{error.message}</FormHelperText> : null}
        </FormControl>
      )}
    />
  ) : null;
}
