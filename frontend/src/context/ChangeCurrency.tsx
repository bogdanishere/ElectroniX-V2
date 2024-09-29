"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type Currency = "USD" | "EUR" | "GBP" | "JPY" | "RON";

interface ChangeCurrencyContextType {
  currency: Currency;
  setCurrency: Dispatch<SetStateAction<Currency>>;
}

export const ChangeCurrencyContext = createContext<
  ChangeCurrencyContextType | undefined
>(undefined);

export default function ChangeCurrencyProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [currency, setCurrency] = useState<Currency>("USD");

  return (
    <ChangeCurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </ChangeCurrencyContext.Provider>
  );
}
