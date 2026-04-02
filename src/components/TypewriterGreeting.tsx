"use client";

import { Box, useTheme } from "@mui/material";
import type { TypographyProps } from "@mui/material";
import { useEffect, useId, useRef } from "react";
import { ensureFontsReady } from "@/lib/fontReady";
import {
  GREETING_TEXT,
  VARA_GREETING_DURATION_MS,
} from "@/lib/pitchTiming";

const VARA_FONT_PATH = "/fonts/vara/shadows-into-light.json";

type TypewriterGreetingProps = {
  className?: string;
  sx?: TypographyProps["sx"];
  onComplete?: () => void;
};

export default function TypewriterGreeting({
  className,
  sx,
  onComplete,
}: TypewriterGreetingProps) {
  const theme = useTheme();
  const reactId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const hostId = `vara-greeting-${reactId}`;
  const containerRef = useRef<HTMLDivElement>(null);
  const onCompleteRef = useRef(onComplete);
  const completedRef = useRef(false);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    void ensureFontsReady();

    completedRef.current = false;
    let cancelled = false;

    (async () => {
      const mod = await import("vara/lib/vara.min.js");
      const VaraCtor = (mod as { default?: unknown }).default ?? mod;
      if (cancelled || !el.isConnected) return;

      el.innerHTML = "";
      el.id = hostId;

      const color =
        typeof theme.palette.text.primary === "string"
          ? theme.palette.text.primary
          : "#1a1a1a";

      const fontSize = window.matchMedia("(min-width: 600px)").matches
        ? 40
        : 32;

      const instance = new (VaraCtor as new (
        selector: string,
        fontUrl: string,
        texts: unknown[],
        options?: unknown
      ) => {
        ready: (cb: () => void) => void;
        animationEnd: (cb: (id: string | number, group: unknown) => void) => void;
      })(`#${hostId}`, VARA_FONT_PATH, [
        {
          text: GREETING_TEXT,
          fontSize,
          strokeWidth: 1.25,
          color,
          duration: VARA_GREETING_DURATION_MS,
          id: "greeting",
        },
      ], { textAlign: "left" });

      instance.ready(() => {
        instance.animationEnd(() => {
          if (cancelled || completedRef.current) return;
          completedRef.current = true;
          onCompleteRef.current?.();
        });
      });
    })();

    return () => {
      cancelled = true;
      el.removeAttribute("id");
      el.innerHTML = "";
    };
  }, [hostId, theme.palette.text.primary]);

  return (
    <Box
      ref={containerRef}
      component="div"
      className={className}
      role="status"
      aria-label={GREETING_TEXT}
      sx={{
        minHeight: { xs: "2.75rem", sm: "3.25rem" },
        width: "100%",
        "& svg": { overflow: "visible" },
        ...sx,
      }}
    />
  );
}
