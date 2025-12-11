# Function: unpackSelectArgs()

```ts
function unpackSelectArgs<Add>(
   opts, 
   fieldNode, 
   fragments, 
   fieldName): UnpackedBasicSelectionOptions & Add;
```

Defined in: [IdeaProjects/kit/kit/src/graphql/graphql-traverse.ts:155](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/graphql/graphql-traverse.ts#L155)

Processes and unpacks selection arguments for a GraphQL field node, combining
user-provided options with information from the GraphQL query AST.

## Type Parameters

### Add

`Add` *extends* `Record`\<`string`, `unknown`\>

An additional set of properties that can be extended in the returned object.

## Parameters

### opts

[`BasicSelectionArgs`](TypeAlias.BasicSelectionArgs.md)\<`Add`\>

Selection options, which may include a path, skip list, check function, or additional properties.

### fieldNode

[`GqlASTField`](TypeAlias.GqlASTField.md)

The GraphQL AST field node that serves as the starting point for selection.

### fragments

`Record`\<`string`, [`GqlASTFragmentDefinition`](TypeAlias.GqlASTFragmentDefinition.md)\>

A mapping of fragment names to their respective GraphQL AST definitions.

### fieldName

`string`

The name of the GraphQL field being processed.

## Returns

`UnpackedBasicSelectionOptions` & `Add`

Processed selection data, including the root node, path, skip set, and additional methods for subpath checks and extensions.

## Throws

If the provided path does not exist within the specified field node or fragments.
