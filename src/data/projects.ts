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
        id: "the-cannon-alerts",
        imageSrc: "/icon/TheCannonAlerts.png",
        title: "TheCannonAlerts",
        body: "A web application that allows users to subscribe to email or discord notifications for new listings posted on TheCannon.ca.",
        link: "https://thecannonalerts.ca",
    },
    {
      id: "devply",
      imageSrc: "/icon/devply.png",
      title: "Devply",
      body: "A two-sided municipal development application tracking system for City Planners and Developers.",
      link: "https://app.devply.ca",
    },
    {
      id: "gsm-webhook-messenger",
      imageSrc: "/icon/gsmWebhook.png",
      title: "GSM Webhook Messenger",
      body: "A multi-threaded system interfacing with a 4G/LTE modem to automatically retrieve and forward SMS messages to Discord.",
      link: "https://github.com/connor1219/GSM-Webhook-Messenger",
    },
    {
      id: "fish",
      imageSrc: "/icon/coming-soon.png",
      title: "Coming Soon",
      body: "I'm working on more projects to showcase here, but in the meantime you should go click on the fish.",
    },
  ],
  [Category.FISHING]: [
    { id: "lake-trout", imageSrc: "/icon/lake-trout-catch.webp", title: "Lake Trout Jigging", body: "My first ever Lake Trout, caught in over 60ft of water. We dropped our lures to the bottom, and within minutes this guy hit." },
    { id: "walleye", imageSrc: "/icon/walleye-new-new.webp", title: "Walleye Through The Ice", body: "We drove kilometres across frozen Lake Winnipeg in a blizzard for this catch. Wild trip, can’t wait to go again." },
    { id: "salmon", imageSrc: "/icon/salmon-catch.webp", title: "Salmon Run", body: "After 30 hours of fishing without a single bite, I finally hooked my first King Salmon. Totally worth the grind." },
    { id: "rainbow-trout", imageSrc: "/icon/rainbow-catch5.jpeg", title: "Fall Rainbow Trout", body: "My first ever Rainbow! I had tried lure after lure without a bite but right after I tied on my tiny orange rapala I got this guy." },
    { id: "bass", imageSrc: "/icon/bass-catch.webp", title: "Good ol' Bass Fishing", body: "Bass will try and eat just about anything and they're super strong fighters once they're hooked. It's an awesome combo." },
  ],
};
