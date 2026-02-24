"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

import { Balance } from "@/types/balance";

type RentContextType = {
  clientBalances: Balance[];
  setClientBalances: Dispatch<SetStateAction<Balance[]>>;
};

const RentContext = createContext<RentContextType | undefined>(undefined);

type RentProviderProps = {
  children: ReactNode;
  initialClientBalances: Balance[];
};

export default function RentProvider({
  children,
  initialClientBalances,
}: RentProviderProps): ReactNode {
  const [clientBalances, setClientBalances] = useState<Balance[]>(
    initialClientBalances,
  );

  return (
    <RentContext.Provider value={{ clientBalances, setClientBalances }}>
      {children}
    </RentContext.Provider>
  );
}

export const useRentContext = (): RentContextType => {
  const context = useContext(RentContext);
  if (!context) {
    throw new Error("useRentContext must be used within a RentProvider");
  }
  return context;
};
