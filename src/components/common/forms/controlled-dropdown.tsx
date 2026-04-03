"use client";

import {
  FormControl,
  FormHelperText,
  Grid,
  GridProps,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import { ReactNode } from "react";
import {
  Control,
  Controller,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

export type FormSelectOption = {
  label: string;
  value: string | number;
};

type ControlledDropdownProps<T extends FieldValues> = SelectProps & {
  name: UseControllerProps<T>["name"];
  control: Control<T>;
  label: string;
  options: FormSelectOption[];
  gridProps?: GridProps;
};

export default function ControlledDropdown<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  options,
  gridProps,
  ...rest
}: ControlledDropdownProps<TFieldValues>): ReactNode {
  return (
    <Grid {...gridProps}>
      <Controller
        name={name}
        control={control}
        defaultValue={"" as never}
        render={({ field, fieldState: { error } }) => (
          <FormControl fullWidth error={!!error}>
            <InputLabel id={`${name}-label`}>{label}</InputLabel>
            <Select
              {...field}
              {...rest}
              labelId={`${name}-label`}
              label={label}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {error && <FormHelperText>{error.message}</FormHelperText>}
          </FormControl>
        )}
      />
    </Grid>
  );
}
