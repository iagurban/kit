import { Nullish } from '@gurban/kit/utils/types';

export type MatchTree<T> = {
  children: { [key: string]: MatchTree<T> };
  match?: { value: T; path: string[] };
};

export type Match<T> = Exclude<MatchTree<T>[`match`], Nullish>;

export const pathSplitFn = (s: string) => s.split('/').filter(Boolean);
export const byLetterSplitFn = (s: string) => Array.from(s);

export type MatchTreeFn<T, Key> = (
  path: Key
) => (Match<T> & { isPartial: boolean; original: string[] }) | undefined;

export const createMatchTree = <T, Key>(
  items: T[],
  path: (o: T) => Key,
  split: (key: Key) => string[]
): MatchTreeFn<T, Key> => {
  const tree: MatchTree<T> = { children: {} };

  const add = (fullPath: string[], restPath: string[], value: T, node: MatchTree<T>): void => {
    if (restPath.length === 0) {
      node.match = { value, path: fullPath };
    } else {
      const [first, ...rest] = restPath;
      if (!node.children[first]) {
        node.children[first] = { children: {} };
      }
      add(fullPath, rest, value, node.children[first]);
    }
  };

  for (const value of items) {
    const parts = split(path(value));
    add(parts, parts, value, tree);
  }

  const match = (
    restPath: string[],
    lastMatch: Match<T> | undefined,
    node: MatchTree<T>
  ): Match<T> | undefined => {
    const newMatch = node.match || lastMatch;
    if (restPath.length === 0) {
      return newMatch;
    }

    const [first, ...rest] = restPath;
    const child = node.children[first];
    return child ? match(rest, newMatch, child) : newMatch;
  };

  return path => {
    const parts = split(path);
    const matched = match(parts, undefined, tree);
    return matched && { ...matched, original: parts, isPartial: matched.path.length !== parts.length };
  };
};
