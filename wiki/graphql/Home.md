# @grbn/kit

## Functions

- [cacheKeyFromGraphqlPath](Function.cacheKeyFromGraphqlPath.md)


# Function: cacheKeyFromGraphqlPath()

```ts
function cacheKeyFromGraphqlPath(info): string;
```

Defined in: [IdeaProjects/kit/kit/src/graphql/cache-key-from-graphql-path.ts:13](https://github.com/iagurban/kit/blob/88f6c87858ca712c618c2fee11d3d113250c16fc/src/graphql/cache-key-from-graphql-path.ts#L13)

Turns the "info.path" object into a unique string key.
e.g., { prev: { key: "message" }, key: "author" } -> "message.author"

Replaces numbers with empty strings since they are array indexes, and they
are not affecting on cache uniquity. But they are preserved in the key to
not mess with similar keys:
{ prev: { prev: { key: "message" }, key: 0 }, key: "author" } -> "message..author"

## Parameters

### info `Pick`\<`GraphQLResolveInfo`, `"path"`\>

## Returns

`string`
