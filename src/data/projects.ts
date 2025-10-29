export type ProjectItem = {
  id: string;
  imageSrc: string;
  title: string;
  body: string;
  link?: string;
};

export enum Category {
  GENERAL = "general",
  FISHING = "fishing"
}

export const PROJECTS: Record<Category, ProjectItem[]> = {
  [Category.GENERAL]: [
    {
      id: "devply",
      imageSrc: "/icon/devply2.png",
      title: "Devply",
      body: "A two-sided municipal development application tracking system for City Planners and Developers",
      link: "https://app.devply.ca",
    },
    {
      id: "fish",
      imageSrc: "/icon/coming-soon.png",
      title: "Coming Soon",
      body: "I don't really have anything else tech related to showcase, so just go click on the fish.",
    },
  ],
  [Category.FISHING]: [
    { id: "bass", imageSrc: "/icon/bass-catch.webp", title: "Good ol' Bass Fishing", body: "Bass will try and eat just about anything and they're unrelenting fighters once they're hooked. It's an awesome combo." },
    { id: "lake-trout", imageSrc: "/icon/lake-trout-catch.webp", title: "Lake Trout Jigging", body: "In over 60ft of water we dropped our lures to the bottom, and within minutes this guy hit." },
    { id: "salmon", imageSrc: "/icon/salmon-catch.webp", title: "Salmon Run", body: "After 30 hours with no bites, I finally hooked my first King Salmon on the last day. Totally worth the grind." },
    { id: "walleye", imageSrc: "/icon/walleye-catch.webp", title: "Walleye Through The Ice", body: "We drove kilometres across frozen Lake Winnipeg in a blizzard for this catch. Wild trip—can’t wait to go again." },
  ],
};