# Function: getUniversalSelectionFromInfo()

```ts
function getUniversalSelectionFromInfo(info, opts?): UniversalSelection;
```

Defined in: [IdeaProjects/kit/kit/src/nest/decorators/universal-selection.decorator.ts:121](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/decorators/universal-selection.decorator.ts#L121)

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
