"use client";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ReactNode } from "react";

type DateLocalizationProviderProps = {
  children: ReactNode;
};

export default function DateLocalizationProvider({
  children,
}: DateLocalizationProviderProps): ReactNode {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {children}
    </LocalizationProvider>
  );
}
