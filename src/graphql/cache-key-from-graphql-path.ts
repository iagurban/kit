import type { GraphQLResolveInfo } from 'graphql';
import type { Path } from 'graphql/jsutils/Path';

/**
 * Turns the "info.path" object into a unique string key.
 * e.g., { prev: { key: "message" }, key: "author" } -> "message.author"
 *
 * Replaces numbers with empty strings since they are array indexes, and they
 * are not affecting on cache uniquity. But they are preserved in the key to
 * not mess with similar keys:
 * { prev: { prev: { key: "message" }, key: 0 }, key: "author" } -> "message..author"
 */
export function cacheKeyFromGraphqlPath(info: Pick<GraphQLResolveInfo, `path`>): string {
  let curr: Path | undefined = info.path;
  const path = [];
  while (curr) {
    path.unshift(typeof curr.key === `number` ? `` : curr.key);
    curr = curr.prev;
  }
  return path.join('.');
}
