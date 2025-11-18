"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Add, Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useSnackbar } from "notistack";
import { CSSProperties, ReactNode, useState } from "react";
import {
  Controller,
  FieldErrors,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { z } from "zod";

const formRowStyle = {
  display: "flex",
  gap: 2,
};

const formStyle: CSSProperties = {
  width: "90%",
  maxWidth: "900px",
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const demographicFormSchema = z.object({
  firstName: z.string().min(1, { message: "First Name is required" }),
  middleName: z.string().min(1, { message: "Middle Name is required" }),
  lastName: z.string().min(1, { message: "Last Name is required" }),
  ssn: z.string().length(11, { message: "SSN is required" }),
  dob: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["male", "female"]),
  tomis: z
    .string()
    .regex(/^\d+$/)
    .length(8, { message: "TOMIS must be 8 digits" }),
  email: z.email({ message: "Please enter a valid email address" }),
  lastKnownAddress: z.string().min(1, { message: "Address is required" }),
  cleanTime: z.string().min(1, { message: "This field is required" }),
  drugOfChoice: z.string().min(1, { message: "This field is required" }),
  priorRecoveryExperience: z
    .string()
    .min(1, { message: "This field is required" }),
  surgeries: z.string().min(1, { message: "This field is required" }),
  allergies: z.string().min(1, { message: "This field is required" }),
  medications: z.string().min(1, { message: "This field is required" }),
  insurance: z.string().min(1, { message: "This field is required" }),
  receiveBenefits: z.enum(["Yes", "No"]),
  benefitsDesc: z.string(),
  isDisabled: z.enum(["Yes", "No"]),
  disabilityDesc: z.string(),
  receivesDisability: z.enum(["Yes", "No"]),
  disabilitiesReceived: z.array(
    z.object({
      reason: z.string(),
      amount: z.string(),
    }),
  ),
  receivesFoodStamps: z.enum(["Yes", "No"]),
  hasMentalHealthRecs: z.enum(["Yes", "No"]),
  mentalHealthRecs: z.string(),
  participatingInTreatment: z.enum(["Yes", "No"]),
  typeOfTreatment: z.string(),
  howOften: z.string(),
  locationOfTreatment: z.string(),
});

type DemographicFormValues = z.infer<typeof demographicFormSchema>;

export default function DemographicForm(): ReactNode {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<DemographicFormValues>({
    resolver: zodResolver(demographicFormSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      ssn: "",
      dob: "",
      gender: "female",
      tomis: "",
      email: "",
      lastKnownAddress: "",
      cleanTime: "",
      drugOfChoice: "",
      priorRecoveryExperience: "",
      surgeries: "",
      allergies: "",
      medications: "",
      insurance: "",
      receiveBenefits: "No",
      benefitsDesc: "",
      isDisabled: "No",
      disabilityDesc: "",
      receivesDisability: "No",
      disabilitiesReceived: [{ reason: "", amount: "" }],
      receivesFoodStamps: "No",
      hasMentalHealthRecs: "No",
      mentalHealthRecs: "",
      participatingInTreatment: "No",
      typeOfTreatment: "",
      howOften: "",
      locationOfTreatment: "",
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "disabilitiesReceived",
  });

  const watchReceiveBenefits = watch("receiveBenefits");
  const watchIsDisabled = watch("isDisabled");
  const watchReceivesDisability = watch("receivesDisability");
  const watchHasMentalHealthRecs = watch("hasMentalHealthRecs");
  const watchParticipatingInTreatment = watch("participatingInTreatment");

  const onSubmit = (data: DemographicFormValues): void => {
    setIsLoading(true);

    // eslint-disable-next-line no-console
    console.log("Form Data:", data);

    const successMessage = `Submitted successfully!`;
    enqueueSnackbar(successMessage, {
      variant: "success",
    });
    setIsLoading(false);
    setIsDisabled(false);
  };

  const onError = (errors: FieldErrors<DemographicFormValues>): void => {
    // eslint-disable-next-line no-console
    console.log("Validation Errors:", errors);
    enqueueSnackbar("Please fix the errors in the form.", {
      variant: "error",
    });
  };

  return (
    <form style={formStyle} onSubmit={handleSubmit(onSubmit, onError)}>
      <Typography align="center" variant="h5" sx={{ mt: 2 }}>
        Intake Form
      </Typography>
      <Typography variant="h5">Demographics</Typography>
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
                field.onChange(newValue ? newValue.toISOString() : "");
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!errors.dob,
                  helperText: errors.dob?.message,
                  onBlur: field.onBlur,
                },
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
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
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
              label="Drug of Choice"
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

      <Typography variant="h5">Medical History and Benefits</Typography>

      <Box sx={formRowStyle}>
        <Controller
          control={control}
          name="surgeries"
          render={({ field }) => (
            <TextField
              {...field}
              label="Surgeries"
              error={!!errors.surgeries}
              helperText={errors.surgeries?.message}
              fullWidth
            />
          )}
        />

        <Controller
          control={control}
          name="allergies"
          render={({ field }) => (
            <TextField
              {...field}
              label="Allergies"
              error={!!errors.allergies}
              helperText={errors.allergies?.message}
              fullWidth
            />
          )}
        />
      </Box>

      <Box sx={formRowStyle}>
        <Controller
          control={control}
          name="medications"
          render={({ field }) => (
            <TextField
              {...field}
              label="Medications"
              error={!!errors.medications}
              helperText={errors.medications?.message}
              fullWidth
            />
          )}
        />

        <Controller
          control={control}
          name="insurance"
          render={({ field }) => (
            <TextField
              {...field}
              label="Insurance"
              error={!!errors.insurance}
              helperText={errors.insurance?.message}
              fullWidth
            />
          )}
        />
      </Box>

      <Box sx={formRowStyle}>
        <Controller
          control={control}
          name="receiveBenefits"
          render={({ field }) => (
            <FormControl error={!!errors.receiveBenefits}>
              <FormLabel>
                Do you currently receive any state or federal benefits?
              </FormLabel>
              <RadioGroup {...field} row>
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {errors.receiveBenefits && (
                <FormHelperText>
                  {errors.receiveBenefits.message}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />
      </Box>

      {watchReceiveBenefits === "Yes" && (
        <Box sx={formRowStyle}>
          <Controller
            control={control}
            name="benefitsDesc"
            render={({ field }) => (
              <TextField
                {...field}
                label="What do you receive?"
                error={!!errors.benefitsDesc}
                helperText={errors.benefitsDesc?.message}
                multiline
                rows={3}
                fullWidth
              />
            )}
          />
        </Box>
      )}

      <Box sx={formRowStyle}>
        <Controller
          control={control}
          name="isDisabled"
          render={({ field }) => (
            <FormControl error={!!errors.isDisabled}>
              <FormLabel>Are you disabled (mentally or physically)?</FormLabel>
              <RadioGroup {...field} row>
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {errors.isDisabled && (
                <FormHelperText>{errors.isDisabled.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />
      </Box>

      {watchIsDisabled === "Yes" && (
        <Box sx={formRowStyle}>
          <Controller
            control={control}
            name="disabilityDesc"
            render={({ field }) => (
              <TextField
                {...field}
                label="Please describe"
                error={!!errors.disabilityDesc}
                helperText={errors.disabilityDesc?.message}
                multiline
                rows={3}
                fullWidth
              />
            )}
          />
        </Box>
      )}

      <Box sx={formRowStyle}>
        <Controller
          control={control}
          name="receivesDisability"
          render={({ field }) => (
            <FormControl error={!!errors.receivesDisability}>
              <FormLabel>Do you receive disability?</FormLabel>
              <RadioGroup {...field} row>
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {errors.receivesDisability && (
                <FormHelperText>
                  {errors.receivesDisability.message}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />
      </Box>

      {watchReceivesDisability === "Yes" && (
        <>
          {fields.map((field, index) => (
            <Box key={field.id} sx={formRowStyle}>
              <Controller
                control={control}
                name={`disabilitiesReceived.${index}.reason`}
                render={({ field }) => <TextField {...field} label="Reason" />}
              />
              <Controller
                control={control}
                name={`disabilitiesReceived.${index}.amount`}
                render={({ field }) => (
                  <TextField {...field} label="Amount $" type="number" />
                )}
              />
              {index > 0 && (
                <Button onClick={() => remove(index)} endIcon={<Delete />}>
                  Remove
                </Button>
              )}
            </Box>
          ))}
          <Button
            onClick={() => append({ reason: "", amount: "" })}
            variant="contained"
            endIcon={<Add />}
            sx={{ alignSelf: "flex-start" }}
          >
            Add
          </Button>
        </>
      )}

      <Box sx={formRowStyle}>
        <Controller
          control={control}
          name="receivesFoodStamps"
          render={({ field }) => (
            <FormControl error={!!errors.receivesFoodStamps}>
              <FormLabel>Do you receive food stamps?</FormLabel>
              <RadioGroup {...field} row>
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {errors.receivesFoodStamps && (
                <FormHelperText>
                  {errors.receivesFoodStamps.message}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />
      </Box>

      <Box sx={formRowStyle}>
        <Controller
          control={control}
          name="hasMentalHealthRecs"
          render={({ field }) => (
            <FormControl error={!!errors.hasMentalHealthRecs}>
              <FormLabel>
                Do you have any mental health recommendations?
              </FormLabel>
              <RadioGroup {...field} row>
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {errors.hasMentalHealthRecs && (
                <FormHelperText>
                  {errors.hasMentalHealthRecs.message}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />
      </Box>

      {watchHasMentalHealthRecs === "Yes" && (
        <Box sx={formRowStyle}>
          <Controller
            control={control}
            name="mentalHealthRecs"
            render={({ field }) => (
              <TextField
                {...field}
                label="Please explain"
                error={!!errors.mentalHealthRecs}
                helperText={errors.mentalHealthRecs?.message}
                multiline
                rows={3}
                fullWidth
              />
            )}
          />
        </Box>
      )}

      <Box sx={formRowStyle}>
        <Controller
          control={control}
          name="participatingInTreatment"
          render={({ field }) => (
            <FormControl error={!!errors.participatingInTreatment}>
              <FormLabel>
                Are you currently participating in mental health treatment?
              </FormLabel>
              <RadioGroup {...field} row>
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {errors.participatingInTreatment && (
                <FormHelperText>
                  {errors.participatingInTreatment.message}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />
      </Box>

      {watchParticipatingInTreatment === "Yes" && (
        <>
          <Box sx={formRowStyle}>
            <Controller
              control={control}
              name="typeOfTreatment"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Type of Treatment"
                  error={!!errors.typeOfTreatment}
                  helperText={errors.typeOfTreatment?.message}
                  fullWidth
                />
              )}
            />
            <Controller
              control={control}
              name="howOften"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="How Often"
                  error={!!errors.howOften}
                  helperText={errors.howOften?.message}
                  fullWidth
                />
              )}
            />
            <Controller
              control={control}
              name="locationOfTreatment"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Location of Treatment"
                  error={!!errors.locationOfTreatment}
                  helperText={errors.locationOfTreatment?.message}
                  fullWidth
                />
              )}
            />
          </Box>
        </>
      )}

      <Button
        type="submit"
        variant="contained"
        disabled={isLoading || isDisabled}
        loading={isLoading}
      >
        Submit
      </Button>
    </form>
  );
}
