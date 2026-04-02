"use client";

import { Box, Link, Typography } from "@mui/material";
import { Patrick_Hand } from "next/font/google";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { dAfterGreeting } from "@/lib/pitchTiming";
import TypewriterGreeting from "@/components/TypewriterGreeting";
import {
  PenCircle,
  PenHighlight,
  PenUnderline,
} from "@/components/PenAnnotations";

const patrickHand = Patrick_Hand({
  weight: ["400"],
  subsets: ["latin"],
});

export default function PitchColumn() {
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
        sx={{
          fontSize: { xs: "1.05rem", sm: "1.15rem" },
          lineHeight: 1.65,
          color: "text.secondary",
          m: 0,
        }}
      >
        I&apos;m based in{" "}
        <PenUnderline delay={dAfterGreeting(0)}>
          Toronto, Canada
        </PenUnderline>
        .
      </Typography>

      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: "1.05rem", sm: "1.15rem" },
          lineHeight: 1.65,
          color: "text.secondary",
          m: 0,
        }}
      >
        I&apos;m a{" "}
        <PenHighlight delay={dAfterGreeting(1)}>
          full stack developer
        </PenHighlight>{" "}
        and the{" "}
        <PenUnderline delay={dAfterGreeting(2)}>
          sole engineer
        </PenUnderline>{" "}
        behind real products in production. At my core, I take messy, ambiguous
        problems and turn them into systems that actually work, ship, and scale.
      </Typography>

      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: "1.05rem", sm: "1.15rem" },
          lineHeight: 1.65,
          color: "text.secondary",
          m: 0,
        }}
      >
        I&apos;ve{" "}
        <PenCircle delay={dAfterGreeting(3)}>
          built and operated
        </PenCircle>{" "}
        a software driven resale business generating{" "}
        <PenUnderline delay={dAfterGreeting(4)}>
          over $450,000
        </PenUnderline>{" "}
        in revenue, using automation and web scraping to identify and act on
        real market opportunities.
      </Typography>

      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: "1.05rem", sm: "1.15rem" },
          lineHeight: 1.65,
          color: "text.secondary",
          m: 0,
        }}
      >
        Currently, I{" "}
        <PenHighlight delay={dAfterGreeting(5)} multiline={false}>
          lead all development
        </PenHighlight>{" "}
        at Value Connect, owning everything across the frontend, backend, and
        infrastructure. I&apos;ve shipped high impact features, optimized core
        workflows, and refactored systems to improve full page load times by{" "}
        <PenUnderline delay={dAfterGreeting(6)}>
          78%
        </PenUnderline>
        , all while{" "}
        <PenHighlight delay={dAfterGreeting(7)} multiline>
          working directly with stakeholders
        </PenHighlight>{" "}
        to solve real business problems.
      </Typography>

      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: "1.05rem", sm: "1.15rem" },
          lineHeight: 1.65,
          color: "text.secondary",
          m: 0,
        }}
      >
        If you want someone who can take ownership{" "}
        <PenHighlight delay={dAfterGreeting(8)} multiline={false}>
          end to end
        </PenHighlight>{" "}
        and actually deliver,{" "}
        <PenUnderline delay={dAfterGreeting(9)}>
          let&apos;s talk
        </PenUnderline>.
      </Typography>

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
