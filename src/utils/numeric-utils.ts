export const snap = (x: number, step: number, mode?: 'ceil' | 'floor' | 'round') =>
  (mode ? Math[mode] : Math.round)(x / step) * step;

export const scaleFrom01 = (v: number, min: number, max: number) => v * (max - min) + min;

export const scaleTo01 = (v: number, min: number, max: number) => (v - min) / (max - min);

export const scale = (v: number, fromMin: number, fromMax: number, toMin: number, toMax: number) =>
  scaleFrom01(scaleTo01(v, fromMin, fromMax), toMin, toMax);

export const clamp = (v: number, min: number, max: number) => {
  if (min > max) {
    throw new Error(`min must be less than max`);
  }
  return Math.min(Math.max(v, min), max);
};
