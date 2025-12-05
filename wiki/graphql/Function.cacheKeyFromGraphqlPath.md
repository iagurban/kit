# Function: cacheKeyFromGraphqlPath()

```ts
function cacheKeyFromGraphqlPath(info): string;
```

Defined in: [IdeaProjects/kit/kit/src/graphql/cache-key-from-graphql-path.ts:13](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/graphql/cache-key-from-graphql-path.ts#L13)

Turns the "info.path" object into a unique string key.
e.g., { prev: { key: "message" }, key: "author" } -> "message.author"

Replaces numbers with empty strings since they are array indexes, and they
are not affecting on cache uniquity. But they are preserved in the key to
not mess with similar keys:
{ prev: { prev: { key: "message" }, key: 0 }, key: "author" } -> "message..author"

## Parameters

### info

`Pick`\<`GraphQLResolveInfo`, `"path"`\>

## Returns

`string`
