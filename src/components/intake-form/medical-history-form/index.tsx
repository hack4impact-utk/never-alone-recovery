"use client";

import { Add, Delete } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { ReactNode } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import ControlledDatePicker from "@/components/common/forms/controlled-date-picker";
import ControlledRadioButtons from "@/components/common/forms/controlled-radio-buttons";
import ControlledTextField from "@/components/common/forms/controlled-text-box";

import { IntakeFormValues } from "../intake-form-schema";

export default function MedicalHistoryForm(): ReactNode {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<IntakeFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "medicalHistory.disabilitiesReceived",
  });

  const watchReceiveBenefits = watch("medicalHistory.receiveBenefits");
  const watchIsDisabled = watch("medicalHistory.isDisabled");
  const watchReceivesDisability = watch("medicalHistory.receivesDisability");
  const watchHasMentalHealthRecs = watch("medicalHistory.hasMentalHealthRecs");
  const watchParticipatingInTreatment = watch(
    "medicalHistory.participatingInTreatment",
  );
  const watchHasChildren = watch("medicalHistory.hasChildren");
  const watchServedInMilitary = watch("medicalHistory.servedInMilitary");
  const watchHasDriversLicense = watch("medicalHistory.hasDriversLicense");
  const watchConvictedOfDUI = watch("medicalHistory.convictedOfDUI");
  const watchConvictedOfSexOffense = watch(
    "medicalHistory.convictedOfSexOffense",
  );
  const watchRegisteredSexOffender = watch(
    "medicalHistory.registeredSexOffender",
  );
  const watchConvictedOfFelony = watch("medicalHistory.convictedOfFelony");
  const watchOnProbationOrParole = watch("medicalHistory.onProbationOrParole");
  const watchInRecoveryCourt = watch("medicalHistory.inRecoveryCourt");

  const multiFieldRowSx = { display: "flex", gap: 2, flexWrap: "wrap" };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
        Medical History
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          "& .MuiTextField-root": { mb: "0 !important" },
          "& .MuiFormControl-root": { mb: "0 !important" },
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          General Medical Information
        </Typography>

        <Box sx={multiFieldRowSx}>
          <ControlledTextField
            control={control}
            errors={errors.medicalHistory?.surgeries}
            label="Surgeries"
            name="medicalHistory.surgeries"
            multiline
            rows={3}
          />

          <ControlledTextField
            control={control}
            errors={errors.medicalHistory?.allergies}
            label="Allergies"
            name="medicalHistory.allergies"
            multiline
            rows={3}
          />
        </Box>

        <Box sx={multiFieldRowSx}>
          <ControlledTextField
            control={control}
            errors={errors.medicalHistory?.medications}
            label="Current Medications"
            name="medicalHistory.medications"
            multiline
            rows={3}
          />

          <ControlledTextField
            control={control}
            errors={errors.medicalHistory?.insurance}
            label="Insurance"
            name="medicalHistory.insurance"
          />
        </Box>

        <ControlledRadioButtons
          control={control}
          errors={errors.medicalHistory?.receiveBenefits}
          label="Do you receive benefits?"
          name="medicalHistory.receiveBenefits"
          options={[
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ]}
        />

        {watchReceiveBenefits === "Yes" && (
          <ControlledTextField
            control={control}
            errors={errors.medicalHistory?.benefitsDesc}
            label="Benefits Description"
            name="medicalHistory.benefitsDesc"
            multiline
            rows={2}
          />
        )}

        <ControlledRadioButtons
          control={control}
          errors={errors.medicalHistory?.isDisabled}
          label="Are you disabled?"
          name="medicalHistory.isDisabled"
          options={[
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ]}
        />

        {watchIsDisabled === "Yes" && (
          <ControlledTextField
            control={control}
            errors={errors.medicalHistory?.disabilityDesc}
            label="Disability Description"
            name="medicalHistory.disabilityDesc"
            multiline
            rows={2}
          />
        )}

        <ControlledRadioButtons
          control={control}
          errors={errors.medicalHistory?.receivesDisability}
          label="Do you receive disability payments?"
          name="medicalHistory.receivesDisability"
          options={[
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ]}
        />

        {watchReceivesDisability === "Yes" && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Disabilities Received
            </Typography>

            {fields.map((field, index) => (
              <Box
                key={field.id}
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                }}
              >
                <ControlledTextField
                  control={control}
                  errors={
                    errors.medicalHistory?.disabilitiesReceived?.[index]?.reason
                  }
                  label="Reason"
                  name={`medicalHistory.disabilitiesReceived.${index}.reason`}
                />

                <ControlledTextField
                  control={control}
                  errors={
                    errors.medicalHistory?.disabilitiesReceived?.[index]?.amount
                  }
                  label="Amount"
                  name={`medicalHistory.disabilitiesReceived.${index}.amount`}
                />

                <Button
                  type="button"
                  color="error"
                  variant="outlined"
                  onClick={() => remove(index)}
                  disabled={fields.length === 1}
                  startIcon={<Delete />}
                >
                  Remove
                </Button>
              </Box>
            ))}

            <Button
              type="button"
              variant="outlined"
              onClick={() => append({ reason: "", amount: "" })}
              startIcon={<Add />}
            >
              Add Disability Entry
            </Button>
          </Box>
        )}

        <ControlledRadioButtons
          control={control}
          errors={errors.medicalHistory?.receivesFoodStamps}
          label="Do you receive food stamps?"
          name="medicalHistory.receivesFoodStamps"
          options={[
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ]}
        />

        <ControlledRadioButtons
          control={control}
          errors={errors.medicalHistory?.hasMentalHealthRecs}
          label="Do you have mental health records?"
          name="medicalHistory.hasMentalHealthRecs"
          options={[
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ]}
        />

        {watchHasMentalHealthRecs === "Yes" && (
          <ControlledTextField
            control={control}
            errors={errors.medicalHistory?.mentalHealthRecs}
            label="Mental Health Records"
            name="medicalHistory.mentalHealthRecs"
            multiline
            rows={2}
          />
        )}

        <ControlledRadioButtons
          control={control}
          errors={errors.medicalHistory?.participatingInTreatment}
          label="Are you participating in treatment?"
          name="medicalHistory.participatingInTreatment"
          options={[
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ]}
        />

        {watchParticipatingInTreatment === "Yes" && (
          <Box sx={multiFieldRowSx}>
            <ControlledTextField
              control={control}
              errors={errors.medicalHistory?.typeOfTreatment}
              label="Type of Treatment"
              name="medicalHistory.typeOfTreatment"
            />

            <ControlledTextField
              control={control}
              errors={errors.medicalHistory?.howOften}
              label="How Often"
              name="medicalHistory.howOften"
            />

            <ControlledTextField
              control={control}
              errors={errors.medicalHistory?.locationOfTreatment}
              label="Location of Treatment"
              name="medicalHistory.locationOfTreatment"
            />
          </Box>
        )}

        <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
          Family and Employment
        </Typography>

        <ControlledRadioButtons
          control={control}
          errors={errors.medicalHistory?.maritalStatus}
          label="Marital Status"
          name="medicalHistory.maritalStatus"
          options={[
            { value: "Single", label: "Single" },
            { value: "Married", label: "Married" },
            { value: "Divorced", label: "Divorced" },
          ]}
        />

        <ControlledRadioButtons
          control={control}
          errors={errors.medicalHistory?.hasChildren}
          label="Do you have children?"
          name="medicalHistory.hasChildren"
          options={[
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ]}
        />

        {watchHasChildren === "Yes" && (
          <ControlledTextField
            control={control}
            errors={errors.medicalHistory?.numberOfChildren}
            label="Number of Children"
            name="medicalHistory.numberOfChildren"
          />
        )}

        <ControlledRadioButtons
          control={control}
          errors={errors.medicalHistory?.isPregnant}
          label="Are you pregnant?"
          name="medicalHistory.isPregnant"
          options={[
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ]}
        />

        <Box sx={multiFieldRowSx}>
          <ControlledTextField
            control={control}
            errors={errors.medicalHistory?.currentEmployment}
            label="Current Employment"
            name="medicalHistory.currentEmployment"
          />

          <ControlledTextField
            control={control}
            errors={errors.medicalHistory?.employmentContactInfo}
            label="Employment Contact Info"
            name="medicalHistory.employmentContactInfo"
          />
        </Box>

        <Box sx={multiFieldRowSx}>
          <ControlledDatePicker
            control={control}
            errors={errors.medicalHistory?.employmentStartDate}
            label="Employment Start Date"
            name="medicalHistory.employmentStartDate"
          />

          <ControlledDatePicker
            control={control}
            errors={errors.medicalHistory?.employmentEndDate}
            label="Employment End Date"
            name="medicalHistory.employmentEndDate"
          />
        </Box>

        <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
          Military and Education
        </Typography>

        <ControlledRadioButtons
          control={control}
          errors={errors.medicalHistory?.servedInMilitary}
          label="Have you served in the military?"
          name="medicalHistory.servedInMilitary"
          options={[
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ]}
        />

        {watchServedInMilitary === "Yes" && (
          <>
            <ControlledRadioButtons
              control={control}
              errors={errors.medicalHistory?.militaryBranch}
              label="Military Branch"
              name="medicalHistory.militaryBranch"
              options={[
                { value: "Army", label: "Army" },
                { value: "Navy", label: "Navy" },
                { value: "Air Force", label: "Air Force" },
                { value: "Marines", label: "Marines" },
                { value: "Coast Guard", label: "Coast Guard" },
              ]}
            />

            <Box sx={multiFieldRowSx}>
              <ControlledDatePicker
                control={control}
                errors={errors.medicalHistory?.militaryStartDate}
                label="Military Start Date"
                name="medicalHistory.militaryStartDate"
              />

              <ControlledDatePicker
                control={control}
                errors={errors.medicalHistory?.militaryEndDate}
                label="Military End Date"
                name="medicalHistory.militaryEndDate"
              />
            </Box>

            <ControlledTextField
              control={control}
              errors={errors.medicalHistory?.militaryDischarge}
              label="Military Discharge"
              name="medicalHistory.militaryDischarge"
            />
          </>
        )}

        <ControlledRadioButtons
          control={control}
          errors={errors.medicalHistory?.hasHighSchoolDiploma}
          label="High School Diploma"
          name="medicalHistory.hasHighSchoolDiploma"
          options={[
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ]}
        />

        <ControlledRadioButtons
          control={control}
          errors={errors.medicalHistory?.hasGED}
          label="GED"
          name="medicalHistory.hasGED"
          options={[
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ]}
        />

        <ControlledRadioButtons
          control={control}
          errors={errors.medicalHistory?.hasCollegeDegree}
          label="College Degree"
          name="medicalHistory.hasCollegeDegree"
          options={[
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ]}
        />

        <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
          Driver and Legal Information
        </Typography>

        <ControlledRadioButtons
          control={control}
          errors={errors.medicalHistory?.hasDriversLicense}
          label="Do you have a driver's license?"
          name="medicalHistory.hasDriversLicense"
          options={[
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ]}
        />

        {watchHasDriversLicense === "Yes" && (
          <>
            <ControlledTextField
              control={control}
              errors={errors.medicalHistory?.driversLicenseNumber}
              label="Driver's License Number"
              name="medicalHistory.driversLicenseNumber"
            />

            <Box sx={multiFieldRowSx}>
              <ControlledDatePicker
                control={control}
                errors={errors.medicalHistory?.dlIssueDate}
                label="Driver's License Issue Date"
                name="medicalHistory.dlIssueDate"
              />

              <ControlledDatePicker
                control={control}
                errors={errors.medicalHistory?.dlExpDate}
                label="Driver's License Expiration Date"
                name="medicalHistory.dlExpDate"
              />
            </Box>
          </>
        )}

        <ControlledRadioButtons
          control={control}
          errors={errors.medicalHistory?.convictedOfDUI}
          label="Have you been convicted of DUI?"
          name="medicalHistory.convictedOfDUI"
          options={[
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ]}
        />

        {watchConvictedOfDUI === "Yes" && (
          <ControlledTextField
            control={control}
            errors={errors.medicalHistory?.duiYear}
            label="Year of DUI Conviction"
            name="medicalHistory.duiYear"
          />
        )}

        <ControlledRadioButtons
          control={control}
          errors={errors.medicalHistory?.convictedOfSexOffense}
          label="Have you been convicted of a sex offense?"
          name="medicalHistory.convictedOfSexOffense"
          options={[
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ]}
        />

        <ControlledRadioButtons
          control={control}
          errors={errors.medicalHistory?.registeredSexOffender}
          label="Are you a registered sex offender?"
          name="medicalHistory.registeredSexOffender"
          options={[
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ]}
        />

        {(watchConvictedOfSexOffense === "Yes" ||
          watchRegisteredSexOffender === "Yes") && (
          <ControlledTextField
            control={control}
            errors={errors.medicalHistory?.sexOffenseNature}
            label="Nature of Sex Offense"
            name="medicalHistory.sexOffenseNature"
            multiline
            rows={2}
          />
        )}

        <ControlledRadioButtons
          control={control}
          errors={errors.medicalHistory?.convictedOfFelony}
          label="Have you been convicted of a felony?"
          name="medicalHistory.convictedOfFelony"
          options={[
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ]}
        />

        {watchConvictedOfFelony === "Yes" && (
          <ControlledTextField
            control={control}
            errors={errors.medicalHistory?.felonyCharges}
            label="Felony Charges"
            name="medicalHistory.felonyCharges"
            multiline
            rows={2}
          />
        )}

        <ControlledRadioButtons
          control={control}
          errors={errors.medicalHistory?.onProbationOrParole}
          label="Are you on probation or parole?"
          name="medicalHistory.onProbationOrParole"
          options={[
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ]}
        />

        {watchOnProbationOrParole === "Yes" && (
          <ControlledTextField
            control={control}
            errors={errors.medicalHistory?.officerContactInfo}
            label="Officer Contact Information"
            name="medicalHistory.officerContactInfo"
          />
        )}

        <ControlledRadioButtons
          control={control}
          errors={errors.medicalHistory?.inRecoveryCourt}
          label="Are you in recovery court?"
          name="medicalHistory.inRecoveryCourt"
          options={[
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ]}
        />

        {watchInRecoveryCourt === "Yes" && (
          <ControlledTextField
            control={control}
            errors={errors.medicalHistory?.caseManagerContactInfo}
            label="Case Manager Contact Information"
            name="medicalHistory.caseManagerContactInfo"
          />
        )}

        <ControlledTextField
          control={control}
          errors={errors.medicalHistory?.ongoingLegalIssues}
          label="Any Ongoing Legal Issues?"
          name="medicalHistory.ongoingLegalIssues"
          multiline
          rows={3}
        />
      </Box>
    </Box>
  );
}
