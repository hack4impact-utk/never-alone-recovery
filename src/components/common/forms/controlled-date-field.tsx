"use client";

import { TextFieldProps } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { ReactNode } from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

type ControlledDateFieldProps<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  showField?: boolean;
  helperText?: TextFieldProps["helperText"];
  placeholder?: string;
};

const DATE_FORMAT = "MM/DD/YYYY";

export default function ControlledDateField<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  showField = true,
  helperText,
  placeholder,
}: ControlledDateFieldProps<TFieldValues>): ReactNode {
  if (!showField) {
    return null;
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          label={label}
          value={field.value ? dayjs(field.value, DATE_FORMAT) : null}
          format={DATE_FORMAT}
          onChange={(selectedDate) => {
            field.onChange(
              selectedDate ? selectedDate.format(DATE_FORMAT) : "",
            );
          }}
          slotProps={{
            textField: {
              error: Boolean(error),
              fullWidth: true,
              helperText: error ? error.message : helperText,
              inputProps: {
                placeholder: placeholder ?? DATE_FORMAT,
              },
            },
          }}
        />
      )}
    />
  );
}
