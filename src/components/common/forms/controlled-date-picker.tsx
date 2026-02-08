"use client";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { ReactNode } from "react";
import { Control, Controller, FieldError } from "react-hook-form";

type ControlledDatePickerProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  errors?: FieldError;
  label: string;
  name: string;
};

export default function ControlledDatePicker({
  control,
  errors,
  label,
  name,
}: ControlledDatePickerProps): ReactNode {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <DatePicker
          label={label}
          value={dayjs(field.value)}
          slotProps={{
            textField: {
              fullWidth: true,
              error: !!errors,
              helperText: errors?.message,
              onBlur: field.onBlur,
            },
          }}
        />
      )}
    />
  );
}
