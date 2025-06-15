import { aguDisplayFont, aguDisplayFontFallback } from './fonts/agu-display';
import { artifikaFont } from './fonts/artifika';
import { breeSerifFont } from './fonts/bree-serif';
import { bungeeInlineFont, bungeeInlineFontFallback } from './fonts/bungee-inline';
import { cherrySwashFont, cherrySwashFontFallback } from './fonts/cherry-swash';
import { creteRoundFont } from './fonts/crete-round';
import { enriquetaFont } from './fonts/enriqueta';
import { geostarFont, geostarFontFallback } from './fonts/geostar';
import { hanumanFont } from './fonts/hanuman';
import { kumarOneOutlineFont, kumarOneOutlineFontFallback } from './fonts/kumar-one-outline';
import { lustriaFont } from './fonts/lustria';
import { monaspaceXenonFont } from './fonts/monaspace-xenon';
import { notoNastaliqUrduFont } from './fonts/noto-nastaliq-urdu';
import { notoSerifDevanagariFont } from './fonts/noto-serif-devanagari';
import { portLligatSlabFont } from './fonts/port-lligat-slab';
import { ribeyeMarrowFont, ribeyeMarrowFontFallback } from './fonts/ribeye-marrow';
import { ryeFont, ryeFontFallback } from './fonts/rye';
import { slabo27pxFont } from './fonts/slabo-27px';
import { suwannaphumFont } from './fonts/suwannaphum';
import { tourneyFont, tourneyFontFallback } from './fonts/tourney';

const font = (name: string, fallback?: string) => `"${name}"` + (fallback ? `, ${fallback}` : '');

export const fonts = {
  kumarOneOutline: font(kumarOneOutlineFont, kumarOneOutlineFontFallback),
  aguDisplay: font(aguDisplayFont, aguDisplayFontFallback),
  artifika: font(artifikaFont),
  bungeeInline: font(bungeeInlineFont, bungeeInlineFontFallback),
  cherrySwash: font(cherrySwashFont, cherrySwashFontFallback),
  hanuman: font(hanumanFont),
  geostar: font(geostarFont, geostarFontFallback),
  ribeyeMarrow: font(ribeyeMarrowFont, ribeyeMarrowFontFallback),
  rye: font(ryeFont, ryeFontFallback),

  // serif
  notoNastaliqUrdu: font(notoNastaliqUrduFont),
  monaspaceXenon: font(monaspaceXenonFont),
  lustria: font(lustriaFont),
  breeSerif: font(breeSerifFont),
  notoSerifDevanagari: font(notoSerifDevanagariFont),
  portLligatSlab: font(portLligatSlabFont),
  slabo27px: font(slabo27pxFont),
  suwannaphum: font(suwannaphumFont),
  tourney: font(tourneyFont, tourneyFontFallback),

  // sans
  enriqueta: font(enriquetaFont),
  creteRound: font(creteRoundFont),
} as const;
