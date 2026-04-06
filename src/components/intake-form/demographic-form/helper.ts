import dayjs from "dayjs";
import { PDFDocument } from "pdf-lib";

import { YesNo } from "@/utils/form/validations";
import {
  addBoxToPdf,
  addCircleToPdf,
  addFieldsToPdf,
  addTextToPdf,
} from "@/utils/pdf/annotations";

import { IntakeFormValues } from "../schema";

const calculateAge = (dateOfBirth: string): number => {
  const birthDate = dayjs(dateOfBirth);
  const age = dayjs().diff(birthDate, "year");

  return age;
};

const addYesNoCircleToPdf = (
  pdf: PDFDocument,
  page: number,
  x: number,
  y: number,
  value: YesNo,
): void => {
  if (value === "Yes") {
    addCircleToPdf(pdf, page, x, y);
  } else if (value === "No") {
    addCircleToPdf(pdf, page, x + 37, y);
  }
};

export const annotateDemographicPdf = (
  pdf: PDFDocument,
  { demographic }: IntakeFormValues,
): void => {
  const form = pdf.getForm();

  addFieldsToPdf(form, demographic);

  addTextToPdf(form, "age", calculateAge(demographic.dateOfBirth));

  addYesNoCircleToPdf(pdf, 0, 362, 217, demographic.receiveBenefits);
  addYesNoCircleToPdf(pdf, 0, 327, 171, demographic.isDisabled);
  addYesNoCircleToPdf(pdf, 0, 218, 127, demographic.receivesDisability);

  addYesNoCircleToPdf(pdf, 1, 218, 602, demographic.receivesFoodStamps);
  addYesNoCircleToPdf(pdf, 1, 327, 578, demographic.hasMentalHealthRecs);
  addYesNoCircleToPdf(pdf, 1, 435, 535, demographic.participatingInTreatment);
  addYesNoCircleToPdf(pdf, 1, 220, 420, demographic.hasChildren);
  addYesNoCircleToPdf(pdf, 1, 290, 309, demographic.servedInMilitary);
  addYesNoCircleToPdf(pdf, 1, 183, 263, demographic.hasHighSchoolDiploma);
  addYesNoCircleToPdf(pdf, 1, 292, 263, demographic.hasGED);
  addYesNoCircleToPdf(pdf, 1, 471, 263, demographic.hasCollegeDegree);
  addYesNoCircleToPdf(pdf, 1, 183, 242, demographic.hasDriversLicense);
  addYesNoCircleToPdf(pdf, 1, 435, 195, demographic.convictedOfDUI);
  addYesNoCircleToPdf(pdf, 1, 325, 150, demographic.convictedOfSexOffense);
  addYesNoCircleToPdf(pdf, 1, 290, 130, demographic.registeredSexOffender);

  addYesNoCircleToPdf(pdf, 2, 290, 580, demographic.convictedOfFelony);
  addYesNoCircleToPdf(pdf, 2, 255, 465, demographic.onProbationOrParole);
  addYesNoCircleToPdf(pdf, 2, 290, 355, demographic.inRecoveryCourt);

  if (demographic.militaryStartDate && demographic.militaryEndDate) {
    addTextToPdf(
      form,
      "datesOfService",
      `${demographic.militaryStartDate} to ${demographic.militaryEndDate}`,
    );
  }

  switch (demographic.maritalStatus) {
    case "Single": {
      addBoxToPdf(pdf, 1, 210, 436, 40, 15);

      break;
    }
    case "Married": {
      addBoxToPdf(pdf, 1, 315, 436, 50, 15);

      break;
    }
    case "Divorced": {
      addBoxToPdf(pdf, 1, 425, 436, 50, 15);

      break;
    }
  }
};
