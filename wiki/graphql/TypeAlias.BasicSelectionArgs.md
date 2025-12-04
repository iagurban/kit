# Type Alias: BasicSelectionArgs\<Add\>

```ts
type BasicSelectionArgs<Add> = readonly string[] | BasicSelectionArgsObject & Add | undefined;
```

Defined in: [IdeaProjects/kit/kit/src/graphql/graphql-traverse.ts:132](https://github.com/iagurban/kit/blob/78aea32be2811f93b17aa1de9430feb1fbc049c8/src/graphql/graphql-traverse.ts#L132)

Arguments for basic selection.

## Type Parameters

### Add

`Add` *extends* `Record`\<`string`, `unknown`\>
