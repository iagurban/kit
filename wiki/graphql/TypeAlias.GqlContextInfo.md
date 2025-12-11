# Type Alias: GqlContextInfo

```ts
type GqlContextInfo = object;
```

Defined in: [IdeaProjects/kit/kit/src/graphql/graphql-traverse.ts:186](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/graphql/graphql-traverse.ts#L186)

Information about the current GraphQL context.

## Properties

### fieldName {#fieldname}

```ts
fieldName: string;
```

Defined in: [IdeaProjects/kit/kit/src/graphql/graphql-traverse.ts:190](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/graphql/graphql-traverse.ts#L190)

The name of the field being resolved.

***

### fieldNodes {#fieldnodes}

```ts
fieldNodes: GqlASTField[];
```

Defined in: [IdeaProjects/kit/kit/src/graphql/graphql-traverse.ts:194](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/graphql/graphql-traverse.ts#L194)

The AST nodes for the field being resolved.

***

### fragments {#fragments}

```ts
fragments: Record<string, GqlASTFragmentDefinition>;
```

Defined in: [IdeaProjects/kit/kit/src/graphql/graphql-traverse.ts:198](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/graphql/graphql-traverse.ts#L198)

A map of fragment definitions.
