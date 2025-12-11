# Function: getUniversalSelectionFromInfo()

```ts
function getUniversalSelectionFromInfo(info, opts?): UniversalSelection;
```

Defined in: [IdeaProjects/kit/kit/src/nest/decorators/universal-selection.decorator.ts:121](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/nest/decorators/universal-selection.decorator.ts#L121)

Extracts the universal selection object from a GraphQL info object.

## Parameters

### info

`GqlContextInfo`

The GraphQL info object.

### opts?

[`UniversalSelectionArgs`](TypeAlias.UniversalSelectionArgs.md)

Options for the selection.

## Returns

[`UniversalSelection`](Interface.UniversalSelection.md)

The universal selection object.
