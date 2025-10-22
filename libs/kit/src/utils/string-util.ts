import { ExMap } from '../collections/ex-map';
import { notNull } from './flow-utils';

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

type CPsTreeNode = { match?: string; sub?: CPsTree };
type CPsTree = ExMap<number, CPsTreeNode>;

export const makeMatchingTree = (samples: Iterable<string>) => {
  const root = {
    sub: new ExMap() as CPsTree,
  };

  for (const s of samples) {
    const firstCp = s.codePointAt(0);
    if (firstCp === undefined) {
      console.warn(`empty string; skipping, remove it`);
      continue;
    }

    let current = root.sub.getOrCreate(firstCp, () => ({}));

    for (let i = 1; ; ++i) {
      const cp = s.codePointAt(i);
      if (cp === undefined) {
        notNull(current).match = s;
        break;
      }

      current = (current.sub ||= new ExMap()).getOrCreate(cp, () => ({}));
    }
  }
  return {
    tree: root.sub,
    match: (input: string, pos: number): string | undefined => {
      const firstCp = input.codePointAt(pos);
      if (firstCp === undefined) {
        return undefined;
      }

      const firstCurrent = root.sub.get(firstCp);
      if (!firstCurrent) {
        return undefined;
      }

      let current = firstCurrent;
      let lastMatch = current.match;

      for (let i = pos + 1; ; ++i) {
        const cp = input.codePointAt(i);
        const next = cp !== undefined && current.sub?.get(cp);
        if (!next) {
          return lastMatch;
        }
        current = next;
        if (current.match !== undefined) {
          lastMatch = current.match;
        }
      }
    },
  };
};

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
