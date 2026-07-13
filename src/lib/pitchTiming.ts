/** Keep in sync with rough-notation timing in PitchColumn / FishingColumn. */
export const DRAW_MS = 420;
/** Gap after each stroke before the next one starts (pitch + fishing column). */
export const PAUSE_BETWEEN_MS = 420;
export const step = DRAW_MS + PAUSE_BETWEEN_MS;

/** Greeting string for Vara (`TypewriterGreeting`). */
export const GREETING_TEXT = "Hi, I'm Connor Morgan";
/** Vara stroke-draw duration for the full greeting (ms). */
export const VARA_GREETING_DURATION_MS = 2000;
/** Brief pause after the drawing finishes before pen animations begin. */
export const GREETING_PAD_MS = 280;
export const GREETING_ANIMATION_TOTAL_MS =
  VARA_GREETING_DURATION_MS + GREETING_PAD_MS;

/**
 * Stagger offset for pen annotation slot `n` (after the greeting finishes).
 * Slots are assigned automatically in source order by `PenSequenceProvider`;
 * see `@/contexts/PenSequenceContext`.
 */
export function dAfterGreeting(n: number): number {
  return GREETING_ANIMATION_TOTAL_MS + n * step;
}
