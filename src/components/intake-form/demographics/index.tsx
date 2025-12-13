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
    .regex(/^\d+$/, { message: "TOMIS must contain only digits" })
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
  maritalStatus: z.enum(["Single", "Married", "Divorced"]),
  hasChildren: z.enum(["Yes", "No"]),
  numberOfChildren: z.string(),
  isPregnant: z.enum(["Yes", "No"]),
  currentEmployment: z.string().min(1, { message: "This field is required" }),
  employmentContactInfo: z
    .string()
    .min(1, { message: "This field is required" }),
  employmentStartDate: z.string().min(1, { message: "Start date is required" }),
  employmentEndDate: z.string().min(1, { message: "End date is required" }),
  servedInMilitary: z.enum(["Yes", "No"]),
  militaryBranch: z.enum([
    "Army",
    "Navy",
    "Air Force",
    "Marines",
    "Coast Guard",
  ]),
  militaryStartDate: z.string(),
  militaryEndDate: z.string(),
  militaryDischarge: z.string(),
  hasHighSchoolDiploma: z.enum(["Yes", "No"]),
  hasGED: z.enum(["Yes", "No"]),
  hasCollegeDegree: z.enum(["Yes", "No"]),
  hasDriversLicense: z.enum(["Yes", "No"]),
  driversLicenseNumber: z
    .string()
    .regex(/^[A-Z0-9]+$/i, {
      message: "Driver's license must contain only letters and numbers",
    })
    .min(1),
  dlIssueDate: z.string(),
  dlExpDate: z.string(),
  convictedOfDUI: z.enum(["Yes", "No"]),
  duiYear: z.string(),
  convictedOfSexOffense: z.enum(["Yes", "No"]),
  registeredSexOffender: z.enum(["Yes", "No"]),
  sexOffenseNature: z.string(),
  convictedOfFelony: z.enum(["Yes", "No"]),
  felonyCharges: z.string(),
  onProbationOrParole: z.enum(["Yes", "No"]),
  officerContactInfo: z.string(),
  inRecoveryCourt: z.enum(["Yes", "No"]),
  caseManagerContactInfo: z.string(),
  ongoingLegalIssues: z.string().min(1, { message: "This field is required" }),
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
      maritalStatus: "Single",
      hasChildren: "No",
      numberOfChildren: "",
      isPregnant: "No",
      currentEmployment: "",
      employmentContactInfo: "",
      employmentStartDate: "",
      employmentEndDate: "",
      servedInMilitary: "No",
      militaryBranch: "Army",
      militaryStartDate: "",
      militaryEndDate: "",
      militaryDischarge: "",
      hasHighSchoolDiploma: "No",
      hasGED: "No",
      hasCollegeDegree: "No",
      hasDriversLicense: "No",
      driversLicenseNumber: "12345",
      dlIssueDate: "",
      dlExpDate: "",
      convictedOfDUI: "No",
      duiYear: "",
      convictedOfSexOffense: "No",
      registeredSexOffender: "No",
      sexOffenseNature: "",
      convictedOfFelony: "No",
      felonyCharges: "",
      onProbationOrParole: "No",
      officerContactInfo: "",
      inRecoveryCourt: "No",
      caseManagerContactInfo: "",
      ongoingLegalIssues: "",
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
  const watchHasChildren = watch("hasChildren");
  const watchServedInMilitary = watch("servedInMilitary");
  const watchHasDriversLicense = watch("hasDriversLicense");
  const watchConvictedOfDUI = watch("convictedOfDUI");
  const watchConvictedOfSexOffense = watch("convictedOfSexOffense");
  const watchRegisteredSexOffender = watch("registeredSexOffender");
  const watchConvictedOfFelony = watch("convictedOfFelony");
  const watchOnProbationOrParole = watch("onProbationOrParole");
  const watchInRecoveryCourt = watch("inRecoveryCourt");

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

      <Typography variant="h5" sx={{ mt: 2 }}>
        Other Info
      </Typography>

      <Box sx={formRowStyle}>
        <Controller
          control={control}
          name="maritalStatus"
          render={({ field }) => (
            <FormControl error={!!errors.maritalStatus}>
              <FormLabel>Current Marital Status?</FormLabel>
              <RadioGroup {...field} row>
                <FormControlLabel
                  value="Single"
                  control={<Radio />}
                  label="Single"
                />
                <FormControlLabel
                  value="Married"
                  control={<Radio />}
                  label="Married"
                />
                <FormControlLabel
                  value="Divorced"
                  control={<Radio />}
                  label="Divorced"
                />
              </RadioGroup>
              {errors.maritalStatus && (
                <FormHelperText>{errors.maritalStatus.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />
      </Box>

      <Box sx={formRowStyle}>
        <Controller
          control={control}
          name="hasChildren"
          render={({ field }) => (
            <FormControl error={!!errors.hasChildren}>
              <FormLabel>Do you have any Children?</FormLabel>
              <RadioGroup {...field} row>
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {errors.hasChildren && (
                <FormHelperText>{errors.hasChildren.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />
      </Box>

      {watchHasChildren === "Yes" && (
        <Box sx={formRowStyle}>
          <Controller
            control={control}
            name="numberOfChildren"
            render={({ field }) => (
              <TextField
                {...field}
                label="If so, how many?"
                type="number"
                error={!!errors.numberOfChildren}
                helperText={errors.numberOfChildren?.message}
                fullWidth
              />
            )}
          />
        </Box>
      )}

      <Box sx={formRowStyle}>
        <Controller
          control={control}
          name="isPregnant"
          render={({ field }) => (
            <FormControl error={!!errors.isPregnant}>
              <FormLabel>Pregnant or think you might be?</FormLabel>
              <RadioGroup {...field} row>
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {errors.isPregnant && (
                <FormHelperText>{errors.isPregnant.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />
      </Box>

      <Box sx={formRowStyle}>
        <Controller
          control={control}
          name="currentEmployment"
          render={({ field }) => (
            <TextField
              {...field}
              label="Current Employment"
              error={!!errors.currentEmployment}
              helperText={errors.currentEmployment?.message}
              fullWidth
            />
          )}
        />
      </Box>

      <Box sx={formRowStyle}>
        <Controller
          control={control}
          name="employmentContactInfo"
          render={({ field }) => (
            <TextField
              {...field}
              label="Contact Information"
              error={!!errors.employmentContactInfo}
              helperText={errors.employmentContactInfo?.message}
              fullWidth
            />
          )}
        />
      </Box>

      <Box sx={formRowStyle}>
        <Controller
          control={control}
          name="employmentStartDate"
          render={({ field }) => (
            <DatePicker
              label="Start date for employment"
              value={field.value ? dayjs(field.value) : null}
              onChange={(newValue) => {
                field.onChange(newValue ? newValue.toISOString() : "");
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!errors.employmentStartDate,
                  helperText: errors.employmentStartDate?.message,
                  onBlur: field.onBlur,
                },
              }}
            />
          )}
        />
        <Controller
          control={control}
          name="employmentEndDate"
          render={({ field }) => (
            <DatePicker
              label="End date for employment"
              value={field.value ? dayjs(field.value) : null}
              onChange={(newValue) => {
                field.onChange(newValue ? newValue.toISOString() : "");
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!errors.employmentEndDate,
                  helperText: errors.employmentEndDate?.message,
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
          name="servedInMilitary"
          render={({ field }) => (
            <FormControl error={!!errors.servedInMilitary}>
              <FormLabel>Have you ever served in the Military?</FormLabel>
              <RadioGroup {...field} row>
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {errors.servedInMilitary && (
                <FormHelperText>
                  {errors.servedInMilitary.message}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />
      </Box>

      {watchServedInMilitary === "Yes" && (
        <>
          <Box sx={formRowStyle}>
            <Controller
              control={control}
              name="militaryBranch"
              render={({ field }) => (
                <FormControl error={!!errors.militaryBranch} fullWidth>
                  <FormLabel>Branch</FormLabel>
                  <RadioGroup {...field} row>
                    <FormControlLabel
                      value="Army"
                      control={<Radio />}
                      label="Army"
                    />
                    <FormControlLabel
                      value="Navy"
                      control={<Radio />}
                      label="Navy"
                    />
                    <FormControlLabel
                      value="Air Force"
                      control={<Radio />}
                      label="Air Force"
                    />
                    <FormControlLabel
                      value="Marines"
                      control={<Radio />}
                      label="Marines"
                    />
                    <FormControlLabel
                      value="Coast Guard"
                      control={<Radio />}
                      label="Coast Guard"
                    />
                  </RadioGroup>
                  {errors.militaryBranch && (
                    <FormHelperText>
                      {errors.militaryBranch.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Box>

          <Box sx={formRowStyle}>
            <Controller
              control={control}
              name="militaryStartDate"
              render={({ field }) => (
                <DatePicker
                  label="Start date for service"
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(newValue) => {
                    field.onChange(newValue ? newValue.toISOString() : "");
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.militaryStartDate,
                      helperText: errors.militaryStartDate?.message,
                      onBlur: field.onBlur,
                    },
                  }}
                />
              )}
            />
            <Controller
              control={control}
              name="militaryEndDate"
              render={({ field }) => (
                <DatePicker
                  label="End date for service"
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(newValue) => {
                    field.onChange(newValue ? newValue.toISOString() : "");
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.militaryEndDate,
                      helperText: errors.militaryEndDate?.message,
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
              name="militaryDischarge"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Discharge"
                  error={!!errors.militaryDischarge}
                  helperText={errors.militaryDischarge?.message}
                  fullWidth
                />
              )}
            />
          </Box>
        </>
      )}

      <Box sx={formRowStyle}>
        <Controller
          control={control}
          name="hasHighSchoolDiploma"
          render={({ field }) => (
            <FormControl error={!!errors.hasHighSchoolDiploma}>
              <FormLabel>Highschool Diploma</FormLabel>
              <RadioGroup {...field} row>
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {errors.hasHighSchoolDiploma && (
                <FormHelperText>
                  {errors.hasHighSchoolDiploma.message}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />
      </Box>

      <Box sx={formRowStyle}>
        <Controller
          control={control}
          name="hasGED"
          render={({ field }) => (
            <FormControl error={!!errors.hasGED}>
              <FormLabel>GED</FormLabel>
              <RadioGroup {...field} row>
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {errors.hasGED && (
                <FormHelperText>{errors.hasGED.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />
      </Box>

      <Box sx={formRowStyle}>
        <Controller
          control={control}
          name="hasCollegeDegree"
          render={({ field }) => (
            <FormControl error={!!errors.hasCollegeDegree}>
              <FormLabel>College Degree</FormLabel>
              <RadioGroup {...field} row>
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {errors.hasCollegeDegree && (
                <FormHelperText>
                  {errors.hasCollegeDegree.message}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />
      </Box>

      <Box sx={formRowStyle}>
        <Controller
          control={control}
          name="hasDriversLicense"
          render={({ field }) => (
            <FormControl error={!!errors.hasDriversLicense}>
              <FormLabel>Driver's License</FormLabel>
              <RadioGroup {...field} row>
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {errors.hasDriversLicense && (
                <FormHelperText>
                  {errors.hasDriversLicense.message}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />
      </Box>

      {watchHasDriversLicense === "Yes" && (
        <>
          <Box sx={formRowStyle}>
            <Controller
              control={control}
              name="driversLicenseNumber"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="DL#"
                  error={!!errors.driversLicenseNumber}
                  helperText={errors.driversLicenseNumber?.message}
                  fullWidth
                />
              )}
            />
          </Box>

          <Box sx={formRowStyle}>
            <Controller
              control={control}
              name="dlIssueDate"
              render={({ field }) => (
                <DatePicker
                  label="Issue Date"
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(newValue) => {
                    field.onChange(newValue ? newValue.toISOString() : "");
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.dlIssueDate,
                      helperText: errors.dlIssueDate?.message,
                      onBlur: field.onBlur,
                    },
                  }}
                />
              )}
            />
            <Controller
              control={control}
              name="dlExpDate"
              render={({ field }) => (
                <DatePicker
                  label="Exp. Date"
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(newValue) => {
                    field.onChange(newValue ? newValue.toISOString() : "");
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.dlExpDate,
                      helperText: errors.dlExpDate?.message,
                      onBlur: field.onBlur,
                    },
                  }}
                />
              )}
            />
          </Box>
        </>
      )}

      <Box sx={formRowStyle}>
        <Controller
          control={control}
          name="convictedOfDUI"
          render={({ field }) => (
            <FormControl error={!!errors.convictedOfDUI}>
              <FormLabel>
                Have you ever been convicted of a DUI, DWI, or any other related
                crime?
              </FormLabel>
              <RadioGroup {...field} row>
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {errors.convictedOfDUI && (
                <FormHelperText>{errors.convictedOfDUI.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />
      </Box>

      {watchConvictedOfDUI === "Yes" && (
        <Box sx={formRowStyle}>
          <Controller
            control={control}
            name="duiYear"
            render={({ field }) => (
              <TextField
                {...field}
                label="If yes, what year?"
                error={!!errors.duiYear}
                helperText={errors.duiYear?.message}
                fullWidth
              />
            )}
          />
        </Box>
      )}

      <Box sx={formRowStyle}>
        <Controller
          control={control}
          name="convictedOfSexOffense"
          render={({ field }) => (
            <FormControl error={!!errors.convictedOfSexOffense}>
              <FormLabel>
                Have you ever been convicted of a sex offense?
              </FormLabel>
              <RadioGroup {...field} row>
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {errors.convictedOfSexOffense && (
                <FormHelperText>
                  {errors.convictedOfSexOffense.message}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />
      </Box>

      <Box sx={formRowStyle}>
        <Controller
          control={control}
          name="registeredSexOffender"
          render={({ field }) => (
            <FormControl error={!!errors.registeredSexOffender}>
              <FormLabel>Are you a registered sex offender?</FormLabel>
              <RadioGroup {...field} row>
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {errors.registeredSexOffender && (
                <FormHelperText>
                  {errors.registeredSexOffender.message}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />
      </Box>

      {(watchConvictedOfSexOffense === "Yes" ||
        watchRegisteredSexOffender === "Yes") && (
        <Box sx={formRowStyle}>
          <Controller
            control={control}
            name="sexOffenseNature"
            render={({ field }) => (
              <TextField
                {...field}
                label="If so, what was the nature of your crime?"
                error={!!errors.sexOffenseNature}
                helperText={errors.sexOffenseNature?.message}
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
          name="convictedOfFelony"
          render={({ field }) => (
            <FormControl error={!!errors.convictedOfFelony}>
              <FormLabel>Have you ever been convicted of a felony?</FormLabel>
              <RadioGroup {...field} row>
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {errors.convictedOfFelony && (
                <FormHelperText>
                  {errors.convictedOfFelony.message}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />
      </Box>

      {watchConvictedOfFelony === "Yes" && (
        <Box sx={formRowStyle}>
          <Controller
            control={control}
            name="felonyCharges"
            render={({ field }) => (
              <TextField
                {...field}
                label="Please list your charge(s)"
                error={!!errors.felonyCharges}
                helperText={errors.felonyCharges?.message}
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
          name="onProbationOrParole"
          render={({ field }) => (
            <FormControl error={!!errors.onProbationOrParole}>
              <FormLabel>On probation or parole?</FormLabel>
              <RadioGroup {...field} row>
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {errors.onProbationOrParole && (
                <FormHelperText>
                  {errors.onProbationOrParole.message}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />
      </Box>

      {watchOnProbationOrParole === "Yes" && (
        <Box sx={formRowStyle}>
          <Controller
            control={control}
            name="officerContactInfo"
            render={({ field }) => (
              <TextField
                {...field}
                label="Officer name and contact information"
                error={!!errors.officerContactInfo}
                helperText={errors.officerContactInfo?.message}
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
          name="inRecoveryCourt"
          render={({ field }) => (
            <FormControl error={!!errors.inRecoveryCourt}>
              <FormLabel>In Recovery Court/Drug Court, or DRC?</FormLabel>
              <RadioGroup {...field} row>
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {errors.inRecoveryCourt && (
                <FormHelperText>
                  {errors.inRecoveryCourt.message}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />
      </Box>

      {watchInRecoveryCourt === "Yes" && (
        <Box sx={formRowStyle}>
          <Controller
            control={control}
            name="caseManagerContactInfo"
            render={({ field }) => (
              <TextField
                {...field}
                label="Case manager name and contact information"
                error={!!errors.caseManagerContactInfo}
                helperText={errors.caseManagerContactInfo?.message}
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
          name="ongoingLegalIssues"
          render={({ field }) => (
            <TextField
              {...field}
              label="Describe any current on-going legal issues (e.g., DCS, future court dates, warrants, etc.)"
              error={!!errors.ongoingLegalIssues}
              helperText={errors.ongoingLegalIssues?.message}
              multiline
              rows={4}
              fullWidth
            />
          )}
        />
      </Box>

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
