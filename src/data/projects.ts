import type { PenAccentPair } from "@/lib/brandColors";
import {
  PEN_ACCENT_CANNON,
  PEN_ACCENT_DEVPLY,
  PEN_ACCENT_FISH_CHARTREUSE,
  PEN_ACCENT_FISH_GOLD,
  PEN_ACCENT_FISH_GREY,
  PEN_ACCENT_FISH_RAINBOW,
  PEN_ACCENT_MUI,
} from "@/lib/brandColors";

export type ProjectItem = {
  id: string;
  imageSrc: string;
  title: string;
  body: string;
  link?: string;
  techStack?: string[];
  lures?: string[];
  /** Rough-notation palette for pitch column + footer when this carousel slide is active. */
  penAccent?: PenAccentPair;
};

export enum Category {
  GENERAL = "general",
  FISHING = "fishing"
}

export const PROJECTS: Record<Category, ProjectItem[]> = {
  [Category.GENERAL]: [
    {
      id: "devply",
      imageSrc: "/icon/devply.png",
      title: "Devply",
      body: "A platform that streamlines municipal development applications by letting planners and developers submit, review, and track applications in a single system. Built to replace fragmented paper driven workflows.",
      link: "https://app.devply.ca",
      techStack: [
        "TypeScript",
        "React",
        "Next.js",
        "Firebase (Auth, Firestore)",
        "Jest",
      ],
      penAccent: PEN_ACCENT_DEVPLY,
    },
    {
      id: "the-cannon-alerts",
      imageSrc: "/icon/TheCannonAlerts.png",
      title: "TheCannonAlerts",
      body: "A real time system that monitors rental listings and alerts subscribers instantly or at their desired interval. Built to solve the problem of missing competitive student rentals.",
      link: "https://thecannonalerts.ca",
      techStack: [
        "Python",
        "TypeScript",
        "React",
        "Next.js",
        "Firebase (Firestore, Functions, Hosting)",
        "Mailgun",
      ],
      penAccent: PEN_ACCENT_CANNON,
    },
    {
      id: "gsm-webhook-messenger",
      imageSrc: "/icon/gsmWebhook.png",
      title: "GSM Webhook Messenger",
      body: "A system that retrieves SMS messages from a 4G/LTE modem and forwards them to Discord in real time. Built to automate account monitoring and notifications for my reselling business.",
      link: "https://github.com/connor1219/GSM-Webhook-Messenger",
      techStack: ["Python"],
      penAccent: PEN_ACCENT_MUI,
    },
    {
      id: "fish",
      imageSrc: "/icon/coming-soon.png",
      title: "Coming Soon",
      techStack: ['Coming Soon'],
      body: "I'm working on more projects to showcase here, but in the meantime you should go click on the fish below. If you happen to have a problem you're looking for help solving I'd love to hear from you, I'm always looking for something new to tackle.",
      penAccent: PEN_ACCENT_MUI,
    },
  ],
  [Category.FISHING]: [
    {
      id: "lake-trout",
      imageSrc: "/icon/lake-trout-catch.webp",
      title: "Lake Trout Jigging",
      body: "My first ever Lake Trout, caught in over 60ft of water. We dropped our lures to the bottom, and within minutes this guy hit.",
      lures: ["1oz tube jigs"],
      penAccent: PEN_ACCENT_FISH_GOLD,
    },
    {
      id: "walleye",
      imageSrc: "/icon/walleye-new-new.webp",
      title: "Walleye Through The Ice",
      body: "We drove kilometres across frozen Lake Winnipeg in a blizzard for this catch. Wild trip, can’t wait to go again.",
      lures: ["Wingdings", "Mugshots", "Dinner Bell's"],
      penAccent: PEN_ACCENT_FISH_CHARTREUSE,
    },
    {
      id: "salmon",
      imageSrc: "/icon/salmon-catch.webp",
      title: "Salmon Run",
      body: "After 30 hours of fishing without a single bite, I finally hooked my first King Salmon. Totally worth the grind.",
      lures: ["Glow spoons", "Rapala J-13's"],
      penAccent: PEN_ACCENT_FISH_GREY,
    },
    {
      id: "rainbow-trout",
      imageSrc: "/icon/rainbow-catch5.jpeg",
      title: "Fall Rainbow Trout",
      body: "My first ever Rainbow! I had tried lure after lure without a bite but right after I tied on my tiny orange rapala I got this guy.",
      lures: ["Jointed Rapalas"],
      penAccent: PEN_ACCENT_FISH_RAINBOW,
    },
    {
      id: "bass",
      imageSrc: "/icon/bass-catch.webp",
      title: "Good ol' Bass Fishing",
      body: "Bass will try and eat just about anything and they're super strong fighters once they're hooked. It's an awesome combo.",
      lures: ["Rapalas", "Swimbaits", "Crankbaits"],
      penAccent: PEN_ACCENT_FISH_CHARTREUSE,
    },
  ],
};
