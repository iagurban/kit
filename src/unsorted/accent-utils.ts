import { notNull } from '../utils/flow/flow-utils';

export const accentChars = {
  ld: '″', // long down (⁀)
  sd: '‶', // short down (‶)
  lu: '′', // long up (′)
  su: '‵', // short up (‵)
  l: '‾', // long unstressed (‾)
} as const;

const accentTypesSet = new Set(Object.keys(accentChars));

export type AccentType = keyof typeof accentChars;

export const accentCharsEntries = Object.entries(accentChars) as [AccentType, string][];

export const isAccentType = (a: string): a is AccentType => accentTypesSet.has(a);

const codeToAccent = new Map(
  Object.entries(accentChars).map(([a, s]) => [notNull(s.codePointAt(0)), a as AccentType])
);

export const accentToCode = Object.fromEntries(
  Object.entries(accentChars).map(([a, s]) => [a, notNull(s.codePointAt(0))])
) as Record<AccentType, number>;

export const parseAccent = (c: number) => codeToAccent.get(c);

export const assertAccentType = (a: string): AccentType => {
  if (!isAccentType(a)) {
    throw new Error(`unknown accent type ${a}`);
  }
  return a;
};
