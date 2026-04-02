"use client";

import { useEffect, useRef } from "react";
import { annotate } from "rough-notation";
import { usePenAccent } from "@/contexts/PenAccentContext";
import { ensureFontsReady } from "@/lib/fontReady";
import { DRAW_MS } from "@/lib/pitchTiming";

/** Default inset for circle annotations (top, right, bottom, left). */
export const DEFAULT_CIRCLE_PADDING: [number, number, number, number] = [8, 14, 8, 14];

type RoughAnn = ReturnType<typeof annotate>;

type PenBaseProps = {
  children: React.ReactNode;
  delay?: number;
  /** When set, overrides `PenAccentProvider` for this annotation only. */
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
  color: colorProp,
  animationDuration = DRAW_MS,
  multiline = true,
}: PenBaseProps & { multiline?: boolean }) {
  const { highlight: ctxHighlight } = usePenAccent();
  const color = colorProp ?? ctxHighlight;
  const ref = useRef<HTMLSpanElement>(null);
  const annotationRef = useRef<RoughAnn | null>(null);
  const colorRef = useRef(color);
  colorRef.current = color;

  useEffect(() => {
    if (!ref.current) return;
    let cancelled = false;
    const timer = setTimeout(() => {
      void (async () => {
        await readyToMeasure(ref.current);
        if (cancelled || !ref.current) return;
        const annotation = annotate(ref.current!, {
          type: "highlight",
          color: colorRef.current,
          multiline,
          iterations: 1,
          padding: [2, 4],
          animate: true,
          animationDuration,
        });
        annotation.show();
        annotationRef.current = annotation;
      })();
    }, delay);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      try {
        annotationRef.current?.remove();
      } catch {
        // ignore
      }
      annotationRef.current = null;
    };
  }, [delay, animationDuration, multiline]);

  useEffect(() => {
    const ann = annotationRef.current;
    if (ann?.isShowing()) {
      ann.color = color;
    }
  }, [color]);

  return (
    <span ref={ref} className="inline align-baseline">
      {children}
    </span>
  );
}

export function PenUnderline({
  children,
  delay = 0,
  color: colorProp,
  animationDuration = DRAW_MS,
}: PenBaseProps) {
  const { stroke: ctxStroke } = usePenAccent();
  const color = colorProp ?? ctxStroke;
  const ref = useRef<HTMLSpanElement>(null);
  const annotationRef = useRef<RoughAnn | null>(null);
  const colorRef = useRef(color);
  colorRef.current = color;

  useEffect(() => {
    if (!ref.current) return;
    let cancelled = false;
    const timer = setTimeout(() => {
      void (async () => {
        await readyToMeasure(ref.current);
        if (cancelled || !ref.current) return;
        const annotation = annotate(ref.current!, {
          type: "underline",
          color: colorRef.current,
          strokeWidth: 2.5,
          padding: 2,
          animate: true,
          animationDuration,
          multiline: true,
        });
        annotation.show();
        annotationRef.current = annotation;
      })();
    }, delay);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      try {
        annotationRef.current?.remove();
      } catch {
        // ignore
      }
      annotationRef.current = null;
    };
  }, [delay, animationDuration]);

  useEffect(() => {
    const ann = annotationRef.current;
    if (ann?.isShowing()) {
      ann.color = color;
    }
  }, [color]);

  return (
    <span ref={ref} className="inline align-baseline">
      {children}
    </span>
  );
}

export function PenCircle({
  children,
  delay = 0,
  color: colorProp,
  animationDuration = DRAW_MS,
  multiline = true,
  padding = DEFAULT_CIRCLE_PADDING,
  preWrap = false,
}: PenBaseProps & {
  multiline?: boolean;
  padding?: number | [number, number] | [number, number, number, number];
  preWrap?: boolean;
}) {
  const { stroke: ctxStroke } = usePenAccent();
  const color = colorProp ?? ctxStroke;
  const ref = useRef<HTMLSpanElement>(null);
  const annotationRef = useRef<RoughAnn | null>(null);
  const colorRef = useRef(color);
  colorRef.current = color;

  useEffect(() => {
    if (!ref.current) return;
    let cancelled = false;
    const timer = setTimeout(() => {
      void (async () => {
        await readyToMeasure(ref.current);
        if (cancelled || !ref.current) return;
        const annotation = annotate(ref.current!, {
          type: "circle",
          color: colorRef.current,
          multiline,
          strokeWidth: 2,
          padding,
          animate: true,
          animationDuration,
        });
        annotation.show();
        annotationRef.current = annotation;
      })();
    }, delay);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      try {
        annotationRef.current?.remove();
      } catch {
        // ignore
      }
      annotationRef.current = null;
    };
  }, [delay, animationDuration, multiline, padding, preWrap]);

  useEffect(() => {
    const ann = annotationRef.current;
    if (ann?.isShowing()) {
      ann.color = color;
    }
  }, [color]);

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
