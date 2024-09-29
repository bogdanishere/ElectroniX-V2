"use client";

import { useContext } from "react";
import { ButtonsFunctionalityContext } from "../context/ButtonsFunctionalityContext";

export function useButtonsFunctionality() {
  const context = useContext(ButtonsFunctionalityContext);
  if (!context) {
    throw new Error(
      "useButtonsFunctionality must be used within a ButtonsFunctionalityProvider"
    );
  }
  return context;
}
