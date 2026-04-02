import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { M_PLUS_Rounded_1c } from "next/font/google";
import { PROJECTS, ProjectItem } from "@/data/projects";
import { ensureFontsReady } from "@/lib/fontReady";
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
  const baseUrl = "https://connormorgan.ca";
  // Static screenshot for LinkedIn and social media
  const ogImageUrl = `${baseUrl}/icon/webPreview.png`;
  // Favicon for Google search results
  const faviconUrl = `${baseUrl}/favicon.ico`;

  React.useEffect(() => {
    void ensureFontsReady();
  }, []);

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
        <meta name="description" content="Connor Morgan - Software Developer" />
        
        {/* Favicon for Google search results */}
        <link rel="icon" href={faviconUrl} />
        <link rel="shortcut icon" href={faviconUrl} />
        <link rel="apple-touch-icon" href={faviconUrl} />
        
        {/* Open Graph / Facebook / LinkedIn - Static screenshot */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={baseUrl} />
        <meta property="og:title" content="Connor Morgan" />
        <meta property="og:description" content="Software Developer" />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        
        {/* Twitter - Static screenshot */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={baseUrl} />
        <meta name="twitter:title" content="Connor Morgan" />
        <meta name="twitter:description" content="Software Developer" />
        <meta name="twitter:image" content={ogImageUrl} />
        
        {/* Google Structured Data - Use favicon */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Connor Morgan",
              "description": "Software Developer",
              "url": baseUrl,
              "image": faviconUrl,
            }),
          }}
        />
      </Head>
      <main className={mPlusRounded.className}>
        <Component {...pageProps} />
      </main>
    </ThemeProvider>
  );
}

