/**
 * Single shared promise so webfont loading runs in parallel with the Vara greeting.
 * Pen annotations await this; by the time their stagger fires, it usually resolves instantly.
 */
let fontsReady: Promise<void> | undefined;

export function ensureFontsReady(): Promise<void> {
  if (typeof document === "undefined") {
    return Promise.resolve();
  }
  if (!fontsReady) {
    fontsReady =
      document.fonts?.ready?.then(() => undefined) ?? Promise.resolve();
  }
  return fontsReady;
}
