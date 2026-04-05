import dayjs from "dayjs";
import { PDFDocument } from "pdf-lib";

import { YesNo } from "@/utils/form/validations";
import {
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
  circlePosition: { x: number; y: number },
  value: YesNo,
): void => {
  if (value === "Yes") {
    addCircleToPdf(pdf, page, {
      x: circlePosition.x,
      y: circlePosition.y,
    });
  } else if (value === "No") {
    addCircleToPdf(pdf, page, {
      x: circlePosition.x + 37,
      y: circlePosition.y,
    });
  }
};

export const annotateDemographicPdf = (
  pdf: PDFDocument,
  { demographic }: IntakeFormValues,
): void => {
  const form = pdf.getForm();

  addFieldsToPdf(form, demographic);

  addTextToPdf(form, "age", calculateAge(demographic.dateOfBirth));

  addYesNoCircleToPdf(pdf, 0, { x: 362, y: 217 }, demographic.receiveBenefits);
  addYesNoCircleToPdf(pdf, 0, { x: 327, y: 171 }, demographic.isDisabled);
  addYesNoCircleToPdf(
    pdf,
    0,
    { x: 218, y: 127 },
    demographic.receivesDisability,
  );

  addYesNoCircleToPdf(
    pdf,
    1,
    { x: 218, y: 602 },
    demographic.receivesFoodStamps,
  );
  addYesNoCircleToPdf(
    pdf,
    1,
    { x: 327, y: 578 },
    demographic.hasMentalHealthRecs,
  );
  addYesNoCircleToPdf(
    pdf,
    1,
    { x: 435, y: 535 },
    demographic.participatingInTreatment,
  );
  addYesNoCircleToPdf(pdf, 1, { x: 220, y: 420 }, demographic.hasChildren);
  addYesNoCircleToPdf(pdf, 1, { x: 290, y: 309 }, demographic.servedInMilitary);
  addYesNoCircleToPdf(
    pdf,
    1,
    { x: 183, y: 263 },
    demographic.hasHighSchoolDiploma,
  );
  addYesNoCircleToPdf(pdf, 1, { x: 292, y: 263 }, demographic.hasGED);
  addYesNoCircleToPdf(pdf, 1, { x: 471, y: 263 }, demographic.hasCollegeDegree);
  addYesNoCircleToPdf(
    pdf,
    1,
    { x: 183, y: 242 },
    demographic.hasDriversLicense,
  );
  addYesNoCircleToPdf(pdf, 1, { x: 435, y: 195 }, demographic.convictedOfDUI);
  addYesNoCircleToPdf(
    pdf,
    1,
    { x: 325, y: 150 },
    demographic.convictedOfSexOffense,
  );
  addYesNoCircleToPdf(
    pdf,
    1,
    { x: 290, y: 130 },
    demographic.registeredSexOffender,
  );

  addYesNoCircleToPdf(
    pdf,
    2,
    { x: 290, y: 580 },
    demographic.convictedOfFelony,
  );
  addYesNoCircleToPdf(
    pdf,
    2,
    { x: 255, y: 465 },
    demographic.onProbationOrParole,
  );
  addYesNoCircleToPdf(pdf, 2, { x: 290, y: 355 }, demographic.inRecoveryCourt);
};
