export const snap = (x: number, step: number, mode?: 'ceil' | 'floor' | 'round') =>
  (mode ? Math[mode] : Math.round)(x / step) * step;
