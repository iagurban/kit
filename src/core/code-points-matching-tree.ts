import { ExMap } from './collections/ex-map';
import { notNull } from './flow/not-null';

type CPsTreeNode = { match?: string; sub?: CPsTree };

type CPsTree = ExMap<number, CPsTreeNode>;

/**
 * Constructs a tree structure (matching tree) that maps a set of strings to
 * their respective Unicode code points for efficient prefix matching.
 *
 * @param {Iterable<string>} samples - An iterable collection of strings to build the tree from.
 * Each string will be broken into its Unicode code points and stored in a structure
 * suitable for prefix matching.
 *
 * @returns {Object} An object containing:
 *   - `tree`: The root of the constructed prefix-matching tree.
 *   - `match`: A function that takes an input string and a starting position
 *              and returns the longest matching substring found in the tree
 *              or `undefined` if no match exists.
 */
export const makeMatchingTree = (
  samples: Iterable<string>
): { tree: CPsTree; match: (input: string, pos: number) => string | undefined } => {
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
