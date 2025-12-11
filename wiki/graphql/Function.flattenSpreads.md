# Function: flattenSpreads()

```ts
function flattenSpreads(fields, fragments): GqlASTField[];
```

Defined in: [IdeaProjects/kit/kit/src/graphql/graphql-traverse.ts:81](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/graphql/graphql-traverse.ts#L81)

Recursively processes an array of GraphQL AST fields, fragment spreads, and inline fragment spreads,
and returns a flattened array of `GqlASTField` objects.

## Parameters

### fields

The array of fields, fragment spreads, and inline fragment spreads to be processed.
    It may be `undefined`.

readonly (
\| [`GqlASTField`](TypeAlias.GqlASTField.md)
\| [`GqlASTFragmentSpread`](TypeAlias.GqlASTFragmentSpread.md)
\| [`GqlASTInlineFragmentSpread`](TypeAlias.GqlASTInlineFragmentSpread.md))[] | `undefined`

### fragments

`Record`\<`string`, [`GqlASTFragmentDefinition`](TypeAlias.GqlASTFragmentDefinition.md)\>

A map of fragment definitions, keyed by the fragment name.

## Returns

[`GqlASTField`](TypeAlias.GqlASTField.md)[]

A flattened array containing only `GqlASTField` objects from the input fields,
    including those contained within fragment spreads or inline fragments.
