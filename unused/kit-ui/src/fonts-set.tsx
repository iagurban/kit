'use client';

import { Inter, Merriweather } from '@next/font/google';
import type { CSSProperties } from 'react';

import { AccentChooser } from './accent-chooser.ts';
import type { FaceMeasurers } from './face-measurer.ts';
import { FontInfo } from './font-info.ts';

// Literata
// Marmelad
// Merriweather_Sans
// Nunito
// Didact_Gothic
// Alegreya

// const sansFont = Didact_Gothic({
//   weight: '400',
//   display: 'swap',
//   subsets: ['latin-ext', 'cyrillic', 'latin', 'cyrillic-ext'],
// });

// Gabriela
// Kurale
const readingFont = Merriweather({
  weight: ['300', '400', '700', '900'],
  preload: true,
  display: 'swap',
  subsets: ['latin-ext', 'cyrillic', 'latin', 'cyrillic-ext'],
});

// Sofia Sans
const sansFont = Inter({
  // weight: '400',
  preload: true,
  display: 'swap',
  subsets: ['latin-ext', 'cyrillic', 'latin', 'cyrillic-ext'],
});

export type AllFonts = {
  reading: FontInfo;
  sans: FontInfo;
};

const flipStyle: Partial<CSSProperties> = { transform: 'scaleX(-1)' };

export const createAllFonts = (m: FaceMeasurers): AllFonts => {
  const defaultAccents = new AccentChooser({
    ld: [
      0,
      [
        { c: '\u02C6', shift: 0, shiftUp: 1 },
        { c: '\u0311', shift: -1, style: { transform: 'translateX(1px)' } },
        { c: '\u2303', shift: -1 },
        { c: '\u02ED', shift: -1 },
      ],
    ],
    sd: [
      0,
      [
        { c: '\u02DD', shift: -1, style: flipStyle },
        { c: '\u2036', shift: -1, shiftUp: 0 },
      ],
    ],
    lu: [0, [{ c: '\u0060', style: flipStyle }]],
    su: [0, [{ c: '\u0060' }, { c: '\u02B9', style: flipStyle, shift: -1 }, '\u02CB', '\u0314', '\u0060']],
    l: [0, [{ c: '\u02C9', shift: -1, shiftUp: 0 }]],
  });

  return {
    reading: new FontInfo(m, readingFont, { boldValue: 700 }, defaultAccents),
    sans: new FontInfo(m, sansFont, { boldValue: 700 }, defaultAccents),
  };
};
