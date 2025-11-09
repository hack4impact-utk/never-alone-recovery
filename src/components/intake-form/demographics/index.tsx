/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, FormControl, FormControlLabel, FormHelperText,FormLabel, Radio, RadioGroup,TextField, Typography  } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useSnackbar } from "notistack";
import { CSSProperties, ReactNode, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const formRowStyle = {
  display: "flex",
  gap: 2,
}

const formStyle: CSSProperties = {
  width: "90%",
  maxWidth: "900px",
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
}

const demographicFormSchema = z.object({
  firstName: z.string().min(1, { message: "First Name is required" }),
  middleName: z.string().min(1, { message: "Middle Name is required" }),
  lastName: z.string().min(1, { message: "last Name is required" }),
  ssn: z.string().length(11),
  dob: z.string(),
  gender: z.enum(["male", "female"]),
  tomis: z.string().regex(/^\d+$/, "TOMIS must be numeric").length(8, { message: "TOMIS is required" }),
  email: z.email({ message: "Please enter a valid email address" }),
  message: z.string().min(1, { message: "Message is required" }),
  lastKnownAddress: z.string().min(1, { message: "Address is required" }),
  cleanTime: z.string().min(1, { message: "This field is required" }),
  drugOfChoice: z.string().min(1, { message: "This field is required" }),
  priorRecoveryExperience: z.string().min(1, { message: "This field is required" }),
});

type DemographicFormValues = z.infer<typeof demographicFormSchema>;

export default function DemographicForm(): ReactNode {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DemographicFormValues>({
    resolver: zodResolver(demographicFormSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      ssn: "",
      dob: new Date().toISOString().split("T")[0],
      gender: "male",
      tomis: "",
      email: "",
      message: "",
      lastKnownAddress: "",
      cleanTime: "",
      drugOfChoice: "",
      priorRecoveryExperience: "",
    }
  });

  const onSubmit = (data: DemographicFormValues): void => {
    setIsLoading(true);

    // eslint-disable-next-line no-console
    console.log(data);

    const successMessage = `Hellu!`

    enqueueSnackbar(successMessage, {
      variant: "success",
    });

    setIsLoading(false);
    setIsDisabled(false);
  };

  return (
    <form style={formStyle} onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4">Demographics</Typography>
      <Box sx={formRowStyle}>
        
        <Controller
          control={control}
          name="firstName"
          render={({ field }) => (
            <TextField
              {...field}
              label="First Name"
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              fullWidth
            />
          )}
        />
        
        <Controller
          control={control}
          name="middleName"
          render={({ field }) => (
            <TextField
              {...field}
              label="Middle Name"
              error={!!errors.middleName}
              helperText={errors.middleName?.message}
              fullWidth
            />
          )}
        />
        
        <Controller
          control={control}
          name="lastName"
          render={({ field }) => (
            <TextField
              {...field}
              label="Last Name"
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              fullWidth
            />
          )}
        />
      </Box>

      <Box sx={formRowStyle}>
        <Controller
          control={control}
          name="ssn"
          render={({ field }) => (
            <TextField
              {...field}
              label="SSN"
              error={!!errors.ssn}
              helperText={errors.ssn?.message}
              fullWidth
            />
          )}
        />
        <Controller
          control={control}
          name="dob"
          render={({ field }) => (
            <DatePicker
              label="Date of Birth"
              value={field.value ? dayjs(field.value) : null}
              onChange={(newValue) => {
                field.onChange(newValue ? newValue.toISOString() : '');
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!errors.dob,
                  helperText: errors.dob?.message,
                  onBlur: field.onBlur,
                }
              }}
            />
          )}
        />
      </Box>

      <Box sx={formRowStyle}>
        <Controller
          control={control}
          name="gender"
          render={({ field }) => (
            <FormControl error={!!errors.gender}>
              <FormLabel>Gender</FormLabel>
              <RadioGroup {...field} row>
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
              </RadioGroup>
              {errors.gender && (
                <FormHelperText>{errors.gender.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />
      </Box>
      
      <Box sx={formRowStyle}>
        <Controller
          control={control}
          name="tomis"
          render={({ field }) => (
            <TextField
              {...field}
              label="TOMIS"
              error={!!errors.tomis}
              helperText={errors.tomis?.message}
              fullWidth
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              error={!!errors.email}
              helperText={errors.email?.message}
              fullWidth
            />
          )}
        />
      </Box>

      <Box sx={formRowStyle}>
        <Controller
          control={control}
          name="lastKnownAddress"
          render={({ field }) => (
            <TextField
              {...field}
              label="Last Known Address"
              error={!!errors.lastKnownAddress}
              helperText={errors.lastKnownAddress?.message}
              multiline
              rows={2}
              fullWidth
            />
          )}
        />
      </Box>

      <Box sx={formRowStyle}>
        <Controller
          control={control}
          name="cleanTime"
          render={({ field }) => (
            <TextField
              {...field}
              label="Amount of Clean Time"
              error={!!errors.cleanTime}
              helperText={errors.cleanTime?.message}
              fullWidth
            />
          )}
        />

        <Controller
          control={control}
          name="drugOfChoice"
          render={({ field }) => (
            <TextField
              {...field}
              label="Do you have any prior recovery experience?"
              error={!!errors.drugOfChoice}
              helperText={errors.drugOfChoice?.message}
              fullWidth
            />
          )}
        />
      </Box>

      <Box sx={formRowStyle}>
        <Controller
          control={control}
          name="priorRecoveryExperience"
          render={({ field }) => (
            <TextField
              {...field}
              label="Do you have any prior recovery experience?"
              error={!!errors.priorRecoveryExperience}
              helperText={errors.priorRecoveryExperience?.message}
              multiline
              minRows={3}
              fullWidth
            />
          )}
        />
      </Box>

      <Typography variant="h4">Medical History and Benefits</Typography>
  
      <Button
        type="submit"
        variant="contained"
      >
        Submit
      </Button>
    </form>
  )
}