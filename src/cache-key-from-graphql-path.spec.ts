import { GraphQLResolveInfo } from 'graphql';
import { Path } from 'graphql/jsutils/Path';

import { cacheKeyFromGraphqlPath } from './cache-key-from-graphql-path';

function buildPath(...keys: Array<string | number>): Path {
  let prev: Path | undefined = undefined;
  for (const key of keys) {
    prev = { prev, key } as Path;
  }
  // At least one key is expected in all our test cases
  return prev as Path;
}

describe('cacheKeyFromGraphqlPath', () => {
  it('serializes a simple two-level path', () => {
    const path = buildPath('message', 'author');
    const info = { path } as Pick<GraphQLResolveInfo, 'path'>;

    expect(cacheKeyFromGraphqlPath(info)).toBe('message.author');
  });

  it('serializes paths containing numeric keys (e.g., list indexes)', () => {
    const path = buildPath('messages', 0, 'author');
    const info = { path } as Pick<GraphQLResolveInfo, 'path'>;

    expect(cacheKeyFromGraphqlPath(info)).toBe('messages..author');
  });

  it('serializes a single-segment path', () => {
    const path = buildPath('me');
    const info = { path } as Pick<GraphQLResolveInfo, 'path'>;

    expect(cacheKeyFromGraphqlPath(info)).toBe('me');
  });

  it('serializes a deeper nested path preserving order from root to leaf', () => {
    const path = buildPath('query', 'messages', 3, 'replies', 1, 'author', 'name');
    const info = { path } as Pick<GraphQLResolveInfo, 'path'>;

    expect(cacheKeyFromGraphqlPath(info)).toBe('query.messages..replies..author.name');
  });
});
