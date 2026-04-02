"use client";

import * as React from "react";
import type { PenAccentPair } from "@/lib/brandColors";

const PenAccentContext = React.createContext<PenAccentPair | null>(null);

export function PenAccentProvider({
  value,
  children,
}: {
  value: PenAccentPair;
  children: React.ReactNode;
}) {
  return (
    <PenAccentContext.Provider value={value}>
      {children}
    </PenAccentContext.Provider>
  );
}

export function usePenAccent(): PenAccentPair {
  const ctx = React.useContext(PenAccentContext);
  if (!ctx) {
    throw new Error("usePenAccent must be used within PenAccentProvider");
  }
  return ctx;
}
