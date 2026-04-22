"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

import { DonorTotal } from "@/types/donor-total";

type DonorContextType = {
  donorTotals: DonorTotal[];
  setDonorTotals: Dispatch<SetStateAction<DonorTotal[]>>;
};

const DonorContext = createContext<DonorContextType | undefined>(undefined);

type DonorProviderProps = {
  children: ReactNode;
  initialDonorTotals: DonorTotal[];
};

export default function DonorProvider({
  children,
  initialDonorTotals,
}: DonorProviderProps): ReactNode {
  const [donorTotals, setDonorTotals] =
    useState<DonorTotal[]>(initialDonorTotals);

  return (
    <DonorContext.Provider value={{ donorTotals, setDonorTotals }}>
      {children}
    </DonorContext.Provider>
  );
}

export const useDonorContext = (): DonorContextType => {
  const context = useContext(DonorContext);
  if (!context) {
    throw new Error("useDonorContext must be used within a DonorProvider");
  }
  return context;
};
