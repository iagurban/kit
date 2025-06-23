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
  const root: CPsTreeNode = {
    sub: new ExMap(),
    get match() {
      return undefined;
    },
    set match(_s) {
      throw new Error(`can't set match on root`);
    },
  };

  for (const s of samples) {
    if (!s.length) {
      console.warn(`empty string; skipping, remove it`);
      continue;
    }

    let current = root;

    for (let i = 0; ; ++i) {
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
      let current = root;
      let lastMatch: string | undefined = undefined;
      for (let i = pos; ; ++i) {
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
