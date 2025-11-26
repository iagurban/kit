# @grbn/kit

## Functions

- [cacheKeyFromGraphqlPath](Function.cacheKeyFromGraphqlPath.md)
- [collectRecursiveSelectionPair](Function.collectRecursiveSelectionPair.md)
- [findGqlNodeByPath](Function.findGqlNodeByPath.md)
- [flattenSpreads](Function.flattenSpreads.md)
- [unpackSelectArgs](Function.unpackSelectArgs.md)


# Function: cacheKeyFromGraphqlPath()

```ts
function cacheKeyFromGraphqlPath(info): string;
```

Defined in: [IdeaProjects/kit/kit/src/graphql/cache-key-from-graphql-path.ts:13](https://github.com/iagurban/kit/blob/8f103f270ee7e07174f3b99efd44fc39c626cbff/src/graphql/cache-key-from-graphql-path.ts#L13)

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


# Function: collectRecursiveSelectionPair()

```ts
function collectRecursiveSelectionPair<T>(
   path, 
   f, 
   getCheckedSubpath, 
   fragments, 
   recur): readonly [string, T] | undefined;
```

Defined in: [IdeaProjects/kit/kit/src/graphql/graphql-traverse.ts:192](https://github.com/iagurban/kit/blob/8f103f270ee7e07174f3b99efd44fc39c626cbff/src/graphql/graphql-traverse.ts#L192)

Collects recursive selection pairs based on a GraphQL field and its subpath.

This function is utilized for traversing and processing a GraphQL Abstract Syntax Tree (AST),
extracting a defined recursive selection pair from the provided field and its substructure.
It invokes a recursive gating function to process nested selections when a valid subpath is available.

## Type Parameters

### T `T`

The type parameter associated with the recursive gating function.

## Parameters

### path `string`

The current path in the GraphQL query structure.

### f `GqlASTField`

The current field in the GraphQL AST being processed.

### getCheckedSubpath

(`path`, `f`) => `string` \| `undefined`

A function that determines the subpath for the current field, returning `undefined` if invalid.

### fragments `Record`\<`string`, `GqlASTFragmentDefinition`\>

A record of GraphQL fragment definitions used for resolving fragment spreads.

### recur `RecursiveSelectionGaterFunction`\<`T`\>

A recursive function that processes the selection set and returns gated selections.

## Returns

readonly \[`string`, `T`\] \| `undefined`

A tuple containing the field's name and the result of the recursive processing for its selection set,
or `undefined` if no valid subpath is found.


# Function: findGqlNodeByPath()

```ts
function findGqlNodeByPath(
   path, 
   field, 
   fragments): GqlASTField | null;
```

Defined in: [IdeaProjects/kit/kit/src/graphql/graphql-traverse.ts:88](https://github.com/iagurban/kit/blob/8f103f270ee7e07174f3b99efd44fc39c626cbff/src/graphql/graphql-traverse.ts#L88)

Recursively finds a GraphQL node by traversing a path through a GraphQL Abstract Syntax Tree (AST).

## Parameters

### path

readonly `string`[]

An array of strings representing the path to the node in the GraphQL AST.
                                  Each string corresponds to a field name to traverse.

### field `GqlASTField`

The starting field node in the GraphQL AST to begin the traversal.

### fragments `Record`\<`string`, `GqlASTFragmentDefinition`\>

A mapping of fragment names to their
                                                              corresponding definitions in the GraphQL AST.

## Returns

`GqlASTField` \| `null`

- The GraphQL AST node found at the specified path, or null if the path
                                does not exist in the AST.

## Throws

- Throws an error if the provided path array is empty, as it expects a non-empty path to traverse.


# Function: flattenSpreads()

```ts
function flattenSpreads(fields, fragments): GqlASTField[];
```

Defined in: [IdeaProjects/kit/kit/src/graphql/graphql-traverse.ts:60](https://github.com/iagurban/kit/blob/8f103f270ee7e07174f3b99efd44fc39c626cbff/src/graphql/graphql-traverse.ts#L60)

Recursively processes an array of GraphQL AST fields, fragment spreads, and inline fragment spreads,
and returns a flattened array of `GqlASTField` objects.

## Parameters

### fields

The array of fields, fragment spreads, and inline fragment spreads to be processed.
    It may be `undefined`.

readonly (`GqlASTField` \| `GqlASTFragmentSpread` \| `GqlASTInlineFragmentSpread`)[] | `undefined`

### fragments `Record`\<`string`, `GqlASTFragmentDefinition`\>

A map of fragment definitions, keyed by the fragment name.

## Returns

`GqlASTField`[]

A flattened array containing only `GqlASTField` objects from the input fields,
    including those contained within fragment spreads or inline fragments.


# Function: unpackSelectArgs()

```ts
function unpackSelectArgs<Add>(
   opts, 
   fieldNode, 
   fragments, 
   fieldName): UnpackedBasicSelectionOptions & Add;
```

Defined in: [IdeaProjects/kit/kit/src/graphql/graphql-traverse.ts:131](https://github.com/iagurban/kit/blob/8f103f270ee7e07174f3b99efd44fc39c626cbff/src/graphql/graphql-traverse.ts#L131)

Processes and unpacks selection arguments for a GraphQL field node, combining
user-provided options with information from the GraphQL query AST.

## Type Parameters

### Add `Add` *extends* `Record`\<`string`, `unknown`\>

An additional set of properties that can be extended in the returned object.

## Parameters

### opts `BasicSelectionArgs`\<`Add`\>

Selection options, which may include a path, skip list, check function, or additional properties.

### fieldNode `GqlASTField`

The GraphQL AST field node that serves as the starting point for selection.

### fragments `Record`\<`string`, `GqlASTFragmentDefinition`\>

A mapping of fragment names to their respective GraphQL AST definitions.

### fieldName `string`

The name of the GraphQL field being processed.

## Returns

`UnpackedBasicSelectionOptions` & `Add`

Processed selection data, including the root node, path, skip set, and additional methods for subpath checks and extensions.

## Throws

If the provided path does not exist within the specified field node or fragments.
