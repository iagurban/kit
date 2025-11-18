export const allStringCodePoints = (s: string): number[] => {
  const r: number[] = [];
  for (let i = 0; ; i++) {
    const cp = s.codePointAt(i);
    if (cp === undefined) {
      break;
    }
    r.push(cp);
  }
  return r;
};

export const allCodePoints = <T extends string | readonly string[]>(s: T): number[] => {
  if (typeof s !== 'string') {
    return s.flatMap(allCodePoints);
  }
  return allStringCodePoints(s);
};

export const isUppercase = (word: string): boolean => /\p{Lu}/u.test(word);

/**
 * Binary search to find a key in sorted array
 *
 * TODO replace usage with lodash's binarySearch
 */
export const binaryStringSearch = (sorted: readonly string[], key: string): number => {
  let left = 0;
  let right = sorted.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (sorted[mid] === key) {
      return mid;
    }
    if (sorted[mid] < key) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
};

export const formatDuration = (durationInMs: number): string => {
  const seconds = Math.floor(durationInMs / 1000);
  const milliseconds = durationInMs % 1000;
  return `${seconds}.${String(milliseconds).padStart(3, '0')}s`;
};
