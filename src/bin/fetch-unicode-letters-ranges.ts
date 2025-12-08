#!yarn tsx

import { nodeFetch } from '../node';

type Range = [number, number];

/**
 * Parses DerivedCoreProperties.txt, extracting ranges for the given property.
 */
function parseRanges(text: string, property: string): Range[] {
  const ranges: Range[] = [];

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) {
      continue;
    }

    const pre = line.split('#')[0];
    const parts = pre.split(';').map(s => s.trim());
    if (parts[1] !== property) {
      continue;
    }

    const rp = parts[0];
    if (rp.includes('..')) {
      const [s, e] = rp.split('..');
      ranges.push([parseInt(s, 16), parseInt(e, 16)]);
    } else {
      const cp = parseInt(rp, 16);
      ranges.push([cp, cp]);
    }
  }

  ranges.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  return ranges;
}

/**
 * Computes the intersection of two sorted, non-overlapping range lists.
 */
function intersectRanges(a: Range[], b: Range[]): Range[] {
  const result: Range[] = [];
  let i = 0,
    j = 0;
  while (i < a.length && j < b.length) {
    const [a0, a1] = a[i];
    const [b0, b1] = b[j];
    const start = Math.max(a0, b0);
    const end = Math.min(a1, b1);
    if (start <= end) {
      result.push([start, end]);
    }
    if (a1 < b1) {
      i++;
    } else {
      j++;
    }
  }
  return result;
}

/**
 * Subtracts list `subs` of ranges from list `base`. Both must be sorted, non-overlapping.
 */
function subtractRanges(base: Range[], subs: Range[]): Range[] {
  const result: Range[] = [];
  let j = 0;
  for (const [b0, b1] of base) {
    let cursor = b0;
    while (j < subs.length && subs[j][1] < b0) {
      j++;
    }
    while (j < subs.length && subs[j][0] <= b1) {
      const [s0, s1] = subs[j];
      if (s0 > cursor) {
        result.push([cursor, s0 - 1]);
      }
      cursor = Math.max(cursor, s1 + 1);
      if (cursor > b1) {
        break;
      }
      j++;
    }
    if (cursor <= b1) {
      result.push([cursor, b1]);
    }
  }
  return result;
}

async function main() {
  const url = 'https://www.unicode.org/Public/15.1.0/ucd/DerivedCoreProperties.txt';
  const text = (await nodeFetch(url)).toString();

  const idStart = parseRanges(text, 'ID_Start');
  const idContinue = parseRanges(text, 'ID_Continue');

  // firstLetter = symbols allowed in first position
  const firstLetter = intersectRanges(idStart, idContinue);

  // notFirstLetterAdditional = symbols allowed after the first position, excluding those only valid as first
  const notFirstLetterAdditional = subtractRanges(idContinue, firstLetter);

  const output = {
    firstLetter,
    notFirstLetterAdditional,
  };

  console.log(JSON.stringify(output));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
