# Function: collectRecursiveSelectionPair()

```ts
function collectRecursiveSelectionPair<T>(
   path, 
   f, 
   getCheckedSubpath, 
   fragments, 
   recur): readonly [string, T] | undefined;
```

Defined in: [IdeaProjects/kit/kit/src/graphql/graphql-traverse.ts:228](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/graphql/graphql-traverse.ts#L228)

Collects recursive selection pairs based on a GraphQL field and its subpath.

This function is utilized for traversing and processing a GraphQL Abstract Syntax Tree (AST),
extracting a defined recursive selection pair from the provided field and its substructure.
It invokes a recursive gating function to process nested selections when a valid subpath is available.

## Type Parameters

### T

`T`

The type parameter associated with the recursive gating function.

## Parameters

### path

`string`

The current path in the GraphQL query structure.

### f

[`GqlASTField`](TypeAlias.GqlASTField.md)

The current field in the GraphQL AST being processed.

### getCheckedSubpath

(`path`, `f`) => `string` \| `undefined`

A function that determines the subpath for the current field, returning `undefined` if invalid.

### fragments

`Record`\<`string`, [`GqlASTFragmentDefinition`](TypeAlias.GqlASTFragmentDefinition.md)\>

A record of GraphQL fragment definitions used for resolving fragment spreads.

### recur

`RecursiveSelectionGaterFunction`\<`T`\>

A recursive function that processes the selection set and returns gated selections.

## Returns

readonly \[`string`, `T`\] \| `undefined`

A tuple containing the field's name and the result of the recursive processing for its selection set,
or `undefined` if no valid subpath is found.
