# Type Alias: BasicSelectionArgs\<Add\>

```ts
type BasicSelectionArgs<Add> = readonly string[] | BasicSelectionArgsObject & Add | undefined;
```

Defined in: [IdeaProjects/kit/kit/src/graphql/graphql-traverse.ts:132](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/graphql/graphql-traverse.ts#L132)

Arguments for basic selection.

## Type Parameters

### Add

`Add` *extends* `Record`\<`string`, `unknown`\>
