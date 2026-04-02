/**
 * Devply landing / app theme (see devply `landingConstants`, `devplyTheme`):
 * primary #77B882, primary dark #5a9664, hero bg #1B2726, page light #f6f7f7.
 */
export const DEVPLY_PRIMARY = "#77B882";
export const DEVPLY_PRIMARY_DARK = "#5a9664";

/** For `rgba(...)` — matches DEVPLY_PRIMARY */
export const DEVPLY_PRIMARY_RGB = "119, 184, 130";

/**
 * Fish callout circle, arrow SVG, and any solid Devply accent UI.
 * Keep in sync with rough-notation strokes in `PenAnnotations`.
 */
export const DEVPLY_ACCENT = `rgba(${DEVPLY_PRIMARY_RGB}, 0.92)`;

/**
 * MUI `palette.primary.main` — project links, carousel titles, footer icons.
 * Not used for rough-notation or fish callout (those use Devply green).
 */
export const PRIMARY_BLUE = "#1976d2";
