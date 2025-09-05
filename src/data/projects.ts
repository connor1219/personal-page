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
      link: "https://devply.com",
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
    { id: "lake-trout", imageSrc: "/icon/lake-trout-catch.webp", title: "Lake Trout Jigging", body: "In over 60ft of water we decided to drop our lures to the bottom of the lake and not 2 minutes after getting there, we had this guy on." },
    { id: "salmon", imageSrc: "/icon/salmon-catch.webp", title: "Salmon Run", body: "My first ever King Salmon, probably my proudest fishing moment. I had spent easily 30 hours fishing over the course of a week without even a bite but on my last day of fishing this guy slammed my glow spoon." },
    { id: "walleye", imageSrc: "/icon/walleye-catch.webp", title: "Walleye Through The Ice", body: "I flew out to Winnipeg in a snowstorm and drove several kilometres on the ice of Lake Winnipeg for this pic. We even broke through the ice at one point driving back home. It was a crazy trip, can't wait to do it again next year!" },
  ],
};