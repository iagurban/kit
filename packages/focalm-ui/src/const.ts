import { hsl } from 'chroma.ts';

import { scaleFrom01 } from './utils/numeric';

export const dangerColorMantine = 'red.6';

export const pointSizeRem = 1;
export const gainHueFor0 = 1;
export const gainHueFor1 = 140;

export const gainHue = (r: number) => scaleFrom01(r, gainHueFor0, gainHueFor1);

export const gainPointColor = (gain: number) => hsl(gainHue(gain), 0.8, 0.4).hex();
export const gainBadgeColor = (gain: number) => hsl(gainHue(gain), 0.6, 0.4).hex();

export const lightColor = (hue: number) => hsl(hue, 0.8, 0.8).hex();
