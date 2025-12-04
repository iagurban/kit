# Function: getUniversalSelectionFromInfo()

```ts
function getUniversalSelectionFromInfo(info, opts?): UniversalSelection;
```

Defined in: [IdeaProjects/kit/kit/src/nest/decorators/universal-selection.decorator.ts:121](https://github.com/iagurban/kit/blob/78aea32be2811f93b17aa1de9430feb1fbc049c8/src/nest/decorators/universal-selection.decorator.ts#L121)

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
