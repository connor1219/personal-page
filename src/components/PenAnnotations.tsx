"use client";

import { useEffect, useRef } from "react";
import { annotate } from "rough-notation";
import { DRAW_MS } from "@/lib/pitchTiming";

/** Default inset for circle annotations (top, right, bottom, left). */
export const DEFAULT_CIRCLE_PADDING: [number, number, number, number] = [8, 14, 8, 14];

export const penColors = {
  highlightYellow: "rgba(253, 230, 138, 0.48)",
  highlightMint: "rgba(167, 243, 208, 0.55)",
  highlightBlue: "rgba(147, 197, 253, 0.5)",
  underlinePink: "rgba(251, 182, 209, 0.85)",
  underlineCoral: "rgba(251, 146, 60, 0.75)",
  circleViolet: "rgba(167, 139, 250, 0.9)",
  highlightMarker: "rgba(251, 191, 36, 0.44)",
};

type PenBaseProps = {
  children: React.ReactNode;
  delay?: number;
  color?: string;
  animationDuration?: number;
};

export function PenHighlight({
  children,
  delay = 0,
  color = penColors.highlightYellow,
  animationDuration = DRAW_MS,
  multiline = true,
}: PenBaseProps & { multiline?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    let annotation: ReturnType<typeof annotate> | undefined;
    const timer = setTimeout(() => {
      annotation = annotate(ref.current!, {
        type: "highlight",
        color,
        multiline,
        iterations: 1,
        padding: [2, 4],
        animate: true,
        animationDuration,
      });
      annotation.show();
    }, delay);
    return () => {
      clearTimeout(timer);
      try {
        annotation?.remove();
      } catch {
        // ignore
      }
    };
  }, [color, delay, animationDuration, multiline]);

  return (
    <span ref={ref} className="inline align-baseline">
      {children}
    </span>
  );
}

export function PenUnderline({
  children,
  delay = 0,
  color = penColors.underlinePink,
  animationDuration = DRAW_MS,
}: PenBaseProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    let annotation: ReturnType<typeof annotate> | undefined;
    const timer = setTimeout(() => {
      annotation = annotate(ref.current!, {
        type: "underline",
        color,
        strokeWidth: 2.5,
        padding: 2,
        animate: true,
        animationDuration,
      });
      annotation.show();
    }, delay);
    return () => {
      clearTimeout(timer);
      try {
        annotation?.remove();
      } catch {
        // ignore
      }
    };
  }, [color, delay, animationDuration]);

  return (
    <span ref={ref} className="inline align-baseline">
      {children}
    </span>
  );
}

export function PenCircle({
  children,
  delay = 0,
  color = penColors.circleViolet,
  animationDuration = DRAW_MS,
  multiline = true,
  padding = DEFAULT_CIRCLE_PADDING,
  /**
   * `white-space: pre-wrap` on the wrapper so you can use `\n` in the string to
   * choose line breaks. Rough-notation then draws one ellipse per line box
   * (with `multiline: true`). Prefer this over a `<pre>` block, which is
   * monospace and not appropriate inside body copy.
   */
  preWrap = false,
}: PenBaseProps & {
  multiline?: boolean;
  padding?: number | [number, number] | [number, number, number, number];
  preWrap?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    let annotation: ReturnType<typeof annotate> | undefined;
    const timer = setTimeout(() => {
      annotation = annotate(ref.current!, {
        type: "circle",
        color,
        multiline,
        strokeWidth: 2,
        padding,
        animate: true,
        animationDuration,
      });
      annotation.show();
    }, delay);
    return () => {
      clearTimeout(timer);
      try {
        annotation?.remove();
      } catch {
        // ignore
      }
    };
  }, [color, delay, animationDuration, multiline, padding, preWrap]);

  return (
    <span
      ref={ref}
      className="inline align-baseline"
      style={preWrap ? { whiteSpace: "pre-wrap" } : undefined}
    >
      {children}
    </span>
  );
}
