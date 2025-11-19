# Function: flattenSpreads()

```ts
function flattenSpreads(fields, fragments): GqlASTField[];
```

Defined in: [IdeaProjects/kit/kit/src/graphql/graphql-traverse.ts:60](https://github.com/iagurban/kit/blob/6e66fe680955a3080903eeaad4a49a9a0b2845a0/src/graphql/graphql-traverse.ts#L60)

Recursively processes an array of GraphQL AST fields, fragment spreads, and inline fragment spreads,
and returns a flattened array of `GqlASTField` objects.

## Parameters

### fields

The array of fields, fragment spreads, and inline fragment spreads to be processed.
    It may be `undefined`.

readonly (`GqlASTField` \| `GqlASTFragmentSpread` \| `GqlASTInlineFragmentSpread`)[] | `undefined`

### fragments

`Record`\<`string`, `GqlASTFragmentDefinition`\>

A map of fragment definitions, keyed by the fragment name.

## Returns

`GqlASTField`[]

A flattened array containing only `GqlASTField` objects from the input fields,
    including those contained within fragment spreads or inline fragments.
