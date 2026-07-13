"use client";

import { Box, IconButton } from "@mui/material";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { annotate } from "rough-notation";
import { usePenAccent } from "@/contexts/PenAccentContext";
import { DRAW_MS } from "@/lib/pitchTiming";
import { Category } from "@/data/projects";

type IconConfig = {
  src: string;
  alt: string;
  showWhen: Category;
};

type FishCalloutProps = {
  category: Category;
  onFishClick: () => void;
  icons: readonly IconConfig[];
  /** When to draw the attention circle, or `null` until the timing is known. */
  calloutDelayMs: number | null;
};

export default function FishCallout({
  category,
  onFishClick,
  icons,
  calloutDelayMs,
}: FishCalloutProps) {
  const { stroke } = usePenAccent();
  const fishWrapRef = useRef<HTMLDivElement>(null);
  const annotationRef = useRef<ReturnType<typeof annotate> | null>(null);
  const strokeRef = useRef(stroke);
  strokeRef.current = stroke;
  const [showHint, setShowHint] = useState(false);
  // Fire exactly once, the first time a real delay is available.
  const scheduledRef = useRef(false);

  useEffect(() => {
    if (calloutDelayMs == null || scheduledRef.current) return;
    scheduledRef.current = true;

    const timer = setTimeout(() => {
      setShowHint(true);
      if (!fishWrapRef.current) return;
      const annotation = annotate(fishWrapRef.current, {
        type: "circle",
        color: strokeRef.current,
        strokeWidth: 2.5,
        padding: 10,
        animate: true,
        animationDuration: DRAW_MS,
      });
      annotation.show();
      annotationRef.current = annotation;
    }, calloutDelayMs);

    return () => {
      clearTimeout(timer);
      try {
        annotationRef.current?.remove();
      } catch {
        // ignore
      }
      annotationRef.current = null;
    };
  }, [calloutDelayMs]);

  useEffect(() => {
    const ann = annotationRef.current;
    if (ann?.isShowing()) {
      ann.color = stroke;
    }
  }, [stroke]);

  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        width: "100%",
        flexShrink: 0,
        overflow: "visible",
        pr: { xs: 1, sm: 2 },
        pt: { xs: 2, sm: 3 },
        pb: { xs: 3, sm: 2 },
        gap: { xs: 0.5, sm: 0.75 },
      }}
    >
      {/* Only the label + arrow wait for showHint; fish stays visible from the first paint */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: { xs: 0.4, sm: 0.5 },
          opacity: showHint ? 1 : 0,
          transform: showHint ? "translateX(0)" : "translateX(8px)",
          transition: "opacity 0.45s ease, transform 0.45s ease",
          pointerEvents: "none",
          maxWidth: { xs: "calc(100% - 120px)", sm: "none" },
        }}
        aria-hidden
      >
        {/* Arrow graphic: Arrow by QuiverAI — https://quiver.ai */}
        <Box
          component="svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 201 126"
          fill="none"
          sx={{
            color: stroke,
            flexShrink: 0,
            width: { xs: 85, sm: 105 },
            height: "auto",
            aspectRatio: "201 / 126",
            display: "block",
            mr: "8px",
            transform: "rotate(-25deg)",
            transformOrigin: "center center",
          }}
        >
          <path
            d="m198.2 93.51c-10.48-0.22-23.12-7.74-37.97-19.72-1.06-0.85-2.52 0.08-2.21 1.48 1.9 8.64 3.6 14.52 8.88 20.54-5.15 0.5-9.64 0.47-10.61 0.5-22.04 0.63-45.58-0.34-60.86-11.24-1.43-1.01-2.73-2.1-3.89-3.26 12.35-5.24 24.12-17.24 24.12-29.32 0-8.53-4.74-15.9-14.59-15.9-12.81 0-21.09 12.86-21.09 23.5 0 7.73 3.95 15.16 9.48 21.4-8.64 3.02-19.38 5.69-29.34 5.69-15.14 0-24.73-9.21-24.73-24.34 0-12.82 10.3-29.6 10.3-42.41 0-11.15-7.08-19.02-19.65-19.02-10.15 0-19.31 7.32-23.6 11.31-2.12 2.14-0.32 1.77 1.62 0.72 7.46-5.4 14.17-10.51 22.61-10.51 10.27 0 17.74 5.28 17.74 17.1 0 10.63-9.89 27.74-9.89 42.48 0 14.75 8.62 26.75 25.4 26.75 10.37 0 21.31-2.14 30.01-5.61 13.37 11.47 31.3 14.27 53.78 14.39 7.51 0.05 14.6-0.7 22.68-1.83-4.82 8.17-7.37 17.1-7.76 26.72-0.04 1.25 1.73 1.55 2.19 0.4 7.23-16.42 17.35-21.07 37.38-27.91 1.09-0.39 1.12-1.88 0-1.91zm-115.4-33.05c0-11.18 7.87-21.49 18.5-21.49 8.53 0 12.5 6.66 12.5 13.91 0 11.1-11.02 22.95-21.98 27.33-5.19-5.66-9.02-12.74-9.02-19.75zm78.12 15.35c2.1 1.8 4.5 3.8 7.07 5.71l-2.26 5.6c-1.96-3.21-3.45-7.13-4.81-11.31zm5.81 12.76 2.09-4.45 3-0.05-2.9 5.74-2.19-1.24zm2.15 2.71 4.91-5.21 1.4 0.22-3.23 5.8-3.08-0.81zm0.85 15.53c3.11-5.75 7.24-11.82 9.41-16.5l2.48 0.77c-3.69 4.86-8.18 10.63-11.89 15.73zm3.74-3.52c2.93-4.15 6.44-8.1 9.16-10.81l0.51 1.13-1.65 6.2c-2.82 0.82-5.47 1.86-8.02 3.48zm12.05-6.63 1.24-2.76 5.4 0.02c-2.28 0.73-4.56 1.63-6.64 2.74zm-0.54-0.06c0.27-1.17 0.71-2.42 1.1-3.56l-1.78-0.22 0.68 3.78zm-2.35-4.99-2.9-1.32-2-3.17 1.47-0.24c1.12 0.63 2.62 1.43 4.19 2.1l-0.76 2.63zm-15.59-1.3 1.16-0.4 2.89-0.5-1.71 2.24-2.34-1.34zm-1.42 22.61c-0.39-1.16-0.36-2.46-0.19-3.81l1.79 0.55c-0.58 1.02-1.15 2.12-1.6 3.26zm0.47-4.84c1.46-5.76 4.35-12.06 8.59-15.03l2.24 0.16c-4.25 4.34-7.72 9.43-10.83 14.87zm-0.99-23.4 1.52-2.86 2.22 0.8-2.82 2.28-0.92-0.22z"
            fill="currentColor"
            stroke="currentColor"
            strokeMiterlimit={10}
            strokeWidth={1.7}
          />
        </Box>
      </Box>

      <Box ref={fishWrapRef} sx={{ position: "relative", width: 80, height: 80, flexShrink: 0, overflow: "visible" }}>
        <IconButton
          onClick={onFishClick}
          aria-label="Toggle project category"
          sx={{ position: "relative", width: 80, height: 80, p: 0 }}
        >
          {icons.map(({ src, alt, showWhen }) => (
            <Image
              key={src}
              src={src}
              alt={alt}
              width={64}
              height={64}
              unoptimized
              priority
              style={{
                position: "absolute",
                visibility: category === showWhen ? "visible" : "hidden",
              }}
            />
          ))}
        </IconButton>
      </Box>
    </Box>
  );
}
