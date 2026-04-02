/**
 * Devply landing / app theme (see devply `landingConstants`, `devplyTheme`):
 * primary #77B882, primary dark #5a9664, hero bg #1B2726, page light #f6f7f7.
 */
export const DEVPLY_PRIMARY = "#77B882";
export const DEVPLY_PRIMARY_DARK = "#5a9664";

/** For `rgba(...)` — matches DEVPLY_PRIMARY */
export const DEVPLY_PRIMARY_RGB = "119, 184, 130";

/** TheCannonAlerts primary / cannon.yellow — see that repo `theme.ts`. */
export const CANNON_PRIMARY_RGB = "234, 179, 8";

/** MUI `palette.primary.main` as RGB — matches PRIMARY_BLUE. */
export const PRIMARY_BLUE_RGB = "25, 118, 210";

export type PenAccentPair = {
  highlight: string;
  stroke: string;
};

/** Rough-notation: highlight fill + underline/circle stroke (0.44 / 0.88). */
export const PEN_ACCENT_DEVPLY: PenAccentPair = {
  highlight: `rgba(${DEVPLY_PRIMARY_RGB}, 0.44)`,
  stroke: `rgba(${DEVPLY_PRIMARY_RGB}, 0.88)`,
};

export const PEN_ACCENT_CANNON: PenAccentPair = {
  highlight: `rgba(${CANNON_PRIMARY_RGB}, 0.44)`,
  stroke: `rgba(${CANNON_PRIMARY_RGB}, 0.88)`,
};

export const PEN_ACCENT_MUI: PenAccentPair = {
  highlight: `rgba(${PRIMARY_BLUE_RGB}, 0.44)`,
  stroke: `rgba(${PRIMARY_BLUE_RGB}, 0.88)`,
};

/** Lake trout — warm gold */
export const FISH_GOLD_RGB = "212, 175, 55";
export const PEN_ACCENT_FISH_GOLD: PenAccentPair = {
  highlight: `rgba(${FISH_GOLD_RGB}, 0.44)`,
  stroke: `rgba(${FISH_GOLD_RGB}, 0.88)`,
};

/** Walleye & bass — yellowy chartreuse / olive */
export const FISH_CHARTREUSE_RGB = "132, 155, 60";
export const PEN_ACCENT_FISH_CHARTREUSE: PenAccentPair = {
  highlight: `rgba(${FISH_CHARTREUSE_RGB}, 0.44)`,
  stroke: `rgba(${FISH_CHARTREUSE_RGB}, 0.88)`,
};

/** Salmon — cool grey */
export const FISH_GREY_RGB = "100, 116, 139";
export const PEN_ACCENT_FISH_GREY: PenAccentPair = {
  highlight: `rgba(${FISH_GREY_RGB}, 0.44)`,
  stroke: `rgba(${FISH_GREY_RGB}, 0.88)`,
};

/** Rainbow trout — pinky purple */
export const FISH_RAINBOW_RGB = "168, 85, 160";
export const PEN_ACCENT_FISH_RAINBOW: PenAccentPair = {
  highlight: `rgba(${FISH_RAINBOW_RGB}, 0.44)`,
  stroke: `rgba(${FISH_RAINBOW_RGB}, 0.88)`,
};

/**
 * Solid accent for fish callout / legacy imports — matches `PEN_ACCENT_*`.stroke opacity.
 */
export const DEVPLY_ACCENT = PEN_ACCENT_DEVPLY.stroke;

/**
 * MUI `palette.primary.main` — project links, carousel titles, footer icons.
 */
export const PRIMARY_BLUE = "#1976d2";
