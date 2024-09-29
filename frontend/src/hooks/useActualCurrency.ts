"use client";

import { useContext } from "react";
import { ChangeCurrencyContext } from "../context/ChangeCurrency";

export const useActualCurrency = () => {
  const context = useContext(ChangeCurrencyContext);
  if (!context) {
    throw new Error(
      "useActualCurrency must be used within a ChangeCurrencyProvider"
    );
  }
  return context;
};
