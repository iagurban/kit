export type PathMatchTreeOptions = {
  separator?: string;
  wildcard?: string;
  validate?: (part: string) => boolean;
};

export type PathMatchLeaf<Payload> = {
  path: readonly string[];
  payload: Payload;
  wildcardsCount: number;
};

export type PathMatchNode<Payload> = {
  children?: Record<string, PathMatchNode<Payload>>;
  wildcard?: PathMatchNode<Payload>;
  leaf?: PathMatchLeaf<Payload>;
  exactLeaf?: PathMatchLeaf<Payload>;
};

export type PathMatchStrictResult<Payload> = {
  leaf: PathMatchLeaf<Payload>;
  matched: string[];
  exact?: boolean;
};

export type PathMatchResult<Payload> = PathMatchStrictResult<Payload> & {
  rest?: string;
};

export type PathMatchTree<Payload> = {
  matchStart: (path: string) => PathMatchResult<Payload> | null;
  matchStrict: (path: string) => PathMatchStrictResult<Payload> | null;
};

export const pathMatchTree = <Payload>(
  paths: readonly (readonly [string, Payload])[],
  options?: PathMatchTreeOptions
): PathMatchTree<Payload> => {
  const {
    separator = '/',
    wildcard = '*',
    validate = (s: string) => /^[a-zA-Z0-9_-]+$/.test(s),
  } = options ?? {};

  const tree: PathMatchNode<Payload> = {};

  const terminatedSymbol = `$`;

  const addPath = (path: string, payload: Payload) => {
    let position = path.startsWith(separator) ? separator.length : 0;
    let wildcardsCount = 0;
    const [pathCharsLength, leafKey] = path.endsWith(terminatedSymbol)
      ? ([path.length - terminatedSymbol.length, `exactLeaf`] as const)
      : ([path.length, `leaf`] as const);

    const processNode = (node: PathMatchNode<Payload>, pathArray: string[]) => {
      const newPosition = path.indexOf(separator, position);
      if (newPosition === position) {
        throw new Error(`Two consecutive separators in path`);
      }

      const [part, preIsLast] =
        newPosition === -1
          ? // take part and isLast
            [path.slice(position, pathCharsLength), true]
          : [path.slice(position, newPosition), false];
      position = newPosition + separator.length;

      const isLast = position >= pathCharsLength /* true if it's nothing after the separator */ || preIsLast;

      if (part === wildcard) {
        ++wildcardsCount;
        node.wildcard ||= {};
        if (isLast) {
          node.wildcard[leafKey] = { path: [...pathArray, wildcard], payload, wildcardsCount };
        } else {
          processNode(node.wildcard, [...pathArray, wildcard]);
        }
        return;
      }

      if (!validate(part)) {
        throw new Error(`Invalid path part: "${part}"`);
      }

      const child = ((node.children ||= {})[part] ||= {});
      if (isLast) {
        child[leafKey] = { path: pathArray.concat(part), payload, wildcardsCount };
      } else {
        processNode(child, pathArray.concat(part));
      }
    };

    processNode(tree, []);
  };

  for (const [path, payload] of paths) {
    addPath(path, payload);
  }

  const matchStart = (path: string): PathMatchResult<Payload> | null => {
    const pathCharsLength = path.endsWith(separator) ? path.length - separator.length : path.length;

    const getBetterMatch = (
      a: PathMatchResult<Payload> | null,
      b: PathMatchResult<Payload> | null
    ): PathMatchResult<Payload> | null => {
      if (!a) {
        return b;
      }
      if (!b) {
        return a;
      }
      // Prioritize specific matches over wildcard matches if matched is the same length
      if (a.matched.length === b.matched.length) {
        return a.leaf.wildcardsCount < b.leaf.wildcardsCount ? a : b;
      }
      return a.matched.length > b.matched.length ? a : b;
    };

    const getFirstBestMatch = (
      node: PathMatchNode<Payload>,
      currentPosition: number,
      matched: string[],
      isEndOfPath: boolean
    ): PathMatchResult<Payload> | null => {
      if (isEndOfPath) {
        // Path is fully consumed. Prioritize an exact leaf.
        if (node.exactLeaf) {
          return {
            leaf: node.exactLeaf,
            exact: true,
            matched: [...matched],
          };
        }
        if (node.leaf) {
          // If no exact leaf, a normal leaf is a full match.
          return {
            leaf: node.leaf,
            matched: [...matched],
          };
        }
      } else if (node.leaf) {
        const rest = path.slice(currentPosition);
        // Path is not fully consumed, only a normal leaf can be a prefix match.
        return {
          leaf: node.leaf,
          rest: rest.startsWith(separator) ? rest.slice(separator.length) : rest,
          matched: [...matched],
        };
      }

      return null;
    };

    const findLongestMatch = (
      node: PathMatchNode<Payload>,
      currentPosition: number,
      matched: string[]
    ): PathMatchResult<Payload> | null => {
      const isEndOfPath = currentPosition >= pathCharsLength;
      const bestMatch = getFirstBestMatch(node, currentPosition, matched, isEndOfPath);
      if (isEndOfPath) {
        return bestMatch;
      }

      const nextSeparatorPosition = path.indexOf(separator, currentPosition);
      if (nextSeparatorPosition === currentPosition) {
        throw new Error(`Two consecutive separators in path`);
      }

      const [part, nextPosition] =
        nextSeparatorPosition === -1
          ? [path.slice(currentPosition), pathCharsLength]
          : [path.slice(currentPosition, nextSeparatorPosition), nextSeparatorPosition + separator.length];

      matched.push(part);

      let deeperMatch: PathMatchResult<Payload> | null = null;
      const child = node.children?.[part];
      if (child) {
        deeperMatch = findLongestMatch(child, nextPosition, matched);
      }

      const wildcardNode = node.wildcard;
      if (wildcardNode) {
        const wildcardMatch = findLongestMatch(wildcardNode, nextPosition, matched);
        deeperMatch = getBetterMatch(deeperMatch, wildcardMatch);
      }

      matched.pop();

      return getBetterMatch(bestMatch, deeperMatch);
    };

    return findLongestMatch(tree, path.startsWith(separator) ? separator.length : 0, []);
  };

  return {
    matchStart,
    matchStrict: (path: string): PathMatchStrictResult<Payload> | null => {
      const result = matchStart(path);
      return result && !result.rest ? { leaf: result.leaf, matched: result.matched } : null;
    },
  };
};
