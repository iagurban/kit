# Function: findGqlNodeByPath()

```ts
function findGqlNodeByPath(
   path, 
   field, 
   fragments): GqlASTField | null;
```

Defined in: [IdeaProjects/kit/kit/src/graphql/graphql-traverse.ts:109](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/graphql/graphql-traverse.ts#L109)

Recursively finds a GraphQL node by traversing a path through a GraphQL Abstract Syntax Tree (AST).

## Parameters

### path

readonly `string`[]

An array of strings representing the path to the node in the GraphQL AST.
                                  Each string corresponds to a field name to traverse.

### field

[`GqlASTField`](TypeAlias.GqlASTField.md)

The starting field node in the GraphQL AST to begin the traversal.

### fragments

`Record`\<`string`, [`GqlASTFragmentDefinition`](TypeAlias.GqlASTFragmentDefinition.md)\>

A mapping of fragment names to their
                                                              corresponding definitions in the GraphQL AST.

## Returns

[`GqlASTField`](TypeAlias.GqlASTField.md) \| `null`

- The GraphQL AST node found at the specified path, or null if the path
                                does not exist in the AST.

## Throws

- Throws an error if the provided path array is empty, as it expects a non-empty path to traverse.
