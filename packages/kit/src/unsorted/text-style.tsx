import { CSSProperties } from 'react';

import type { TRBL } from './dynamic-rect';

export enum TextAlign {
  Start = 'start',
  Center = 'center',
  End = 'end',
  Justify = 'justify',
}

export type TextStyleSnapshot = {
  size: number | string;
  family: string;
  weight: CSSProperties['fontWeight'];

  align: TextAlign;
  justify: TextAlign;

  paragraphOffset: number;
  lineSpacing: number;
  paragraphSpacing: number;

  padding: TRBL;
};

export type FaceSignature = `s:${
  | number
  | string}&w:${CSSProperties['fontWeight']}&f:${string}&ls:${string}&lh:${string}&st:${CSSProperties['fontStyle']}`;

export type FaceConfig = Pick<TextStyleSnapshot, 'size' | 'family' | 'weight'> & {
  fontStyle?: CSSProperties['fontStyle'];
  letterSpacing?: string | number;
  lineHeight?: number | string;
};

export const faceSignature = (o: FaceConfig): FaceSignature =>
  `s:${o.size}&w:${o.weight}&f:${o.family}&ls:${o.letterSpacing ?? ''}&lh:${o.lineHeight ?? ''}&st:${
    o.fontStyle || ''
  }`;
