declare module "vara/lib/vara.min.js" {
  type VaraTextBlock = {
    text: string;
    fontSize?: number;
    strokeWidth?: number;
    color?: string;
    id?: string | number;
    duration?: number;
    textAlign?: "left" | "center" | "right";
    x?: number;
    y?: number;
    delay?: number;
    autoAnimation?: boolean;
    queued?: boolean;
    letterSpacing?: number | Record<string, number>;
    fromCurrentPosition?: { x?: boolean; y?: boolean };
  };

  type VaraOptions = {
    fontSize?: number;
    strokeWidth?: number;
    color?: string;
    duration?: number;
    textAlign?: "left" | "center" | "right";
    autoAnimation?: boolean;
    queued?: boolean;
    letterSpacing?: number | Record<string, number>;
  };

  class Vara {
    constructor(
      selector: string,
      fontUrl: string,
      texts: VaraTextBlock[],
      options?: VaraOptions
    );
    ready(callback: () => void): void;
    animationEnd(callback: (id: string | number, group: unknown) => void): void;
    draw(id: string | number | undefined, duration?: number): void;
    get(id: string | number): unknown;
    playAll(): void;
  }

  export = Vara;
}
