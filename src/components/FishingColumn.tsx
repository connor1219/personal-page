"use client";

import { Box, Link, Typography } from "@mui/material";
import { Patrick_Hand } from "next/font/google";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import {
  PenCircle,
  PenHighlight,
  PenUnderline,
} from "@/components/PenAnnotations";
import { dAfterGreeting } from "@/lib/pitchTiming";
import TypewriterGreeting from "@/components/TypewriterGreeting";

const patrickHand = Patrick_Hand({
  weight: ["400"],
  subsets: ["latin"],
});

export default function FishingColumn() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        textAlign: "left",
        gap: 2,
        maxWidth: 560,
        width: "100%",
      }}
      className={patrickHand.className}
    >
      <TypewriterGreeting
        sx={{
          lineHeight: 1.15,
          color: "text.primary",
          m: 0,
        }}
      />

      <Typography
        variant="body1"
        component="p"
        sx={{
          fontSize: { xs: "1.05rem", sm: "1.15rem" },
          lineHeight: 1.65,
          color: "text.secondary",
          m: 0,
        }}
      >
        I&apos;m a{" "}
        <PenCircle delay={dAfterGreeting(0)} multiline={false}>
          fisherman
        </PenCircle>{" "}
        based out of Wasaga Beach, Ontario.
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
        <Typography
          variant="body1"
          component="p"
          sx={{
            fontSize: { xs: "1.05rem", sm: "1.15rem" },
            lineHeight: 1.65,
            color: "text.secondary",
            m: 0,
          }}
        >
          I&apos;ve been fishing for basically{" "}
          <PenHighlight delay={dAfterGreeting(1)} multiline={false}>
            all my life
          </PenHighlight>
          , and it&apos;s how I love to spend my free weekends. So far I&apos;ve caught lake
          trout, walleye, salmon, rainbow trout, and bass, a few of those trips are in the
          carousel here. I recently bought a small{" "}
          <PenUnderline delay={dAfterGreeting(2)}>
            fishing boat
          </PenUnderline>
          , ask me about it!
        </Typography>

        <Typography
          variant="body1"
          component="p"
          sx={{
            fontSize: { xs: "1.05rem", sm: "1.15rem" },
            lineHeight: 1.65,
            color: "text.secondary",
            m: 0,
          }}
        >
          This year I&apos;m hoping to land my first{" "}
          <PenHighlight delay={dAfterGreeting(3)}>
            brown trout
          </PenHighlight>{" "}
          and my first{" "}
          <PenHighlight delay={dAfterGreeting(4)}>
            Atlantic trout
          </PenHighlight>
          . If you&apos;re ever looking for a fishing buddy, give me a holler.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          color: "primary.main",
          mt: 1,
        }}
      >
        <Link
          href="https://www.linkedin.com/in/connor-morgan-custom"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          sx={{ color: "inherit" }}
        >
          <FaLinkedin size={24} />
        </Link>
        <Link
          href="https://github.com/connor1219"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          sx={{ color: "inherit" }}
        >
          <FaGithub size={24} />
        </Link>
        <Link
          href="mailto:connormorgan@live.ca?subject=Hey%20Connor&body=Hey%20Connor%2C%0A%0AAwesome%20fish%20pics%20man"
          aria-label="Email"
          sx={{ color: "inherit" }}
        >
          <FaEnvelope size={24} />
        </Link>
      </Box>
    </Box>
  );
}
