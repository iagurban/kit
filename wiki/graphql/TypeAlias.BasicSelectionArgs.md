# Type Alias: BasicSelectionArgs\<Add\>

```ts
type BasicSelectionArgs<Add> = readonly string[] | BasicSelectionArgsObject & Add | undefined;
```

Defined in: [IdeaProjects/kit/kit/src/graphql/graphql-traverse.ts:132](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/graphql/graphql-traverse.ts#L132)

Arguments for basic selection.

## Type Parameters

### Add

`Add` *extends* `Record`\<`string`, `unknown`\>
