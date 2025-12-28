import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { M_PLUS_Rounded_1c } from "next/font/google";
import { PROJECTS, ProjectItem } from "@/data/projects";
import "@/styles/globals.css";

const mPlusRounded = M_PLUS_Rounded_1c({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: mPlusRounded.style.fontFamily,
  },
  palette: {
    background: {
      default: "#F7F7F7",
    },
  },
});

export default function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const buildUrl = (src: string) => {
      const u = new URL("/_next/image", window.location.origin);
      u.searchParams.set("url", src);
      u.searchParams.set("w", "1200");
      u.searchParams.set("q", "75");
      return u.toString();
    };

    // Extract all image sources from PROJECTS object
    const allSrcs = Array.from(
      new Set(
        Object.values(PROJECTS)
          .flat()
          .map((p: ProjectItem) => p.imageSrc)
      )
    );

    allSrcs.forEach((src) => {
      const img = new Image();
      img.decoding = "async";
      img.fetchPriority = "low";
      img.src = buildUrl(src);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <title>Connor Morgan</title>
      </Head>
      <main className={mPlusRounded.className}>
        <Component {...pageProps} />
      </main>
    </ThemeProvider>
  );
}

