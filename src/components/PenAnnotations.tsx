"use client";

import { useEffect, useRef } from "react";
import { annotate } from "rough-notation";
import { ensureFontsReady } from "@/lib/fontReady";
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

/** Safari (esp. iOS) can return stale rects if we measure before paint settles. */
function isIOSOrIPadOS(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function flushLayout(el: HTMLElement | null): void {
  if (!el) return;
  void el.offsetHeight;
}

function afterNextPaint(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });
}

/** Fonts + layout flush; on iOS, wait an extra frame so getClientRects matches paint. */
async function readyToMeasure(el: HTMLElement | null): Promise<void> {
  await ensureFontsReady();
  flushLayout(el);
  if (isIOSOrIPadOS()) {
    await afterNextPaint();
    flushLayout(el);
  }
}

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
    let cancelled = false;
    let annotation: ReturnType<typeof annotate> | undefined;
    const timer = setTimeout(() => {
      void (async () => {
        await readyToMeasure(ref.current);
        if (cancelled || !ref.current) return;
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
      })();
    }, delay);
    return () => {
      cancelled = true;
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
    let cancelled = false;
    let annotation: ReturnType<typeof annotate> | undefined;
    const timer = setTimeout(() => {
      void (async () => {
        await readyToMeasure(ref.current);
        if (cancelled || !ref.current) return;
        annotation = annotate(ref.current!, {
          type: "underline",
          color,
          strokeWidth: 2.5,
          padding: 2,
          animate: true,
          animationDuration,
          multiline: true,
        });
        annotation.show();
      })();
    }, delay);
    return () => {
      cancelled = true;
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
  preWrap = false,
}: PenBaseProps & {
  multiline?: boolean;
  padding?: number | [number, number] | [number, number, number, number];
  preWrap?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    let cancelled = false;
    let annotation: ReturnType<typeof annotate> | undefined;
    const timer = setTimeout(() => {
      void (async () => {
        await readyToMeasure(ref.current);
        if (cancelled || !ref.current) return;
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
      })();
    }, delay);
    return () => {
      cancelled = true;
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
