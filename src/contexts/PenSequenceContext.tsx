"use client";

import * as React from "react";
import { dAfterGreeting } from "@/lib/pitchTiming";

/**
 * Auto-incrementing timing for pen annotations.
 *
 * Instead of hand-numbering every `delay={dAfterGreeting(n)}`, each Pen
 * component claims the next slot in render (= source) order. The first
 * annotation in a provider animates first, the next one a `step` later, and so
 * on. Add, remove, or reorder annotations and the timing re-flows for free.
 */
type PenSequence = {
  /** Claim the next slot index (0-based). Call exactly once per annotation. */
  claim: () => number;
};

const PenSequenceContext = React.createContext<PenSequence | null>(null);

export function PenSequenceProvider({
  children,
  onSettle,
}: {
  children: React.ReactNode;
  /** Reports the total number of slots claimed, once mounted. */
  onSettle?: (count: number) => void;
}) {
  const counterRef = React.useRef(0);

  const value = React.useMemo<PenSequence>(
    () => ({ claim: () => counterRef.current++ }),
    []
  );

  const onSettleRef = React.useRef(onSettle);
  onSettleRef.current = onSettle;
  React.useEffect(() => {
    onSettleRef.current?.(counterRef.current);
  }, []);

  return (
    <PenSequenceContext.Provider value={value}>
      {children}
    </PenSequenceContext.Provider>
  );
}

/**
 * Returns the auto-sequenced delay (ms) for one annotation, or `null` when
 * rendered outside a `PenSequenceProvider` (callers fall back to their explicit
 * `delay` prop). The slot is claimed once per component instance and stays
 * stable across re-renders.
 */
export function usePenSequenceDelay(): number | null {
  const ctx = React.useContext(PenSequenceContext);
  const indexRef = React.useRef<number | null>(null);

  if (ctx && indexRef.current === null) {
    indexRef.current = ctx.claim();
  }

  return indexRef.current === null ? null : dAfterGreeting(indexRef.current);
}
