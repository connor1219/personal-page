"use client";

import { Box, Link, Typography } from "@mui/material";
import { Patrick_Hand } from "next/font/google";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
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
        <PenUnderline>
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
        <PenHighlight>
          full stack developer
        </PenHighlight>{" "}
        and currently the{" "}
        <PenUnderline>
          sole engineer
        </PenUnderline>{" "}
        at Value Connect, a real estate appraisal software startup. Every day I take messy, ambiguous
        problems and turn them into systems that actually work, ship fast, and scale.
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
        Before Value Connect, I{" "}
        <PenCircle>
          built and operated
        </PenCircle>{" "}
        a software driven resale business generating{" "}
        <PenUnderline>
          over $450,000
        </PenUnderline>{" "}
        in revenue, using automation and web scraping to identify and act on
        real market opportunities.
      </Typography>

      {/* <Typography
        variant="body1"
        sx={{
          fontSize: { xs: "1.05rem", sm: "1.15rem" },
          lineHeight: 1.65,
          color: "text.secondary",
          m: 0,
        }}
      >
        Recently, I{" "}
        <PenHighlight>
          Co-Founded a B2B SaaS
        </PenHighlight>{" "}
        called Orbit, a compliance and automation first CRM for merchant cash
        advance lenders. I spent months learning the industry deeply enough to
        build something genuinely better than what exists today. Orbit runs a
        lender&apos;s entire deal flow, from broker submission through
        underwriting, contracts, and funding, turning messy inbound submissions
        into clean, actionable pipeline, and it&apos;s already at{" "}
        <PenUnderline>
          $24,000 ARR
        </PenUnderline>
        .
      </Typography> */}

      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: "1.05rem", sm: "1.15rem" },
          lineHeight: 1.65,
          color: "text.secondary",
          m: 0,
        }}
      >
        At Value Connect, I{" "}
        <PenHighlight multiline={false}>
          lead all development
        </PenHighlight>
        , owning everything across the frontend, backend, and
        infrastructure. I&apos;ve shipped countless high impact features,
        and <PenHighlight>implemented autonomous AI agents</PenHighlight> to automate repetitive tasks saving our team of 4{" "}
        <PenUnderline>
          over 20 hours per week
        </PenUnderline>
        , all while{" "}
        <PenHighlight multiline>
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
        I have experience working with{" "}
        <PenHighlight multiline>
          TypeScript, React, Java, Python, AWS, mySQL, Postgres, Terraform (IAC), React Native, and much more
        </PenHighlight>
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
        If you want someone who can take ownership{" "}
        <PenHighlight multiline={false}>
          end to end
        </PenHighlight>{" "}
        and actually deliver,{" "}
        <PenUnderline>
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
