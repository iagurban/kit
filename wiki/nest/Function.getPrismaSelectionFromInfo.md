# Function: getPrismaSelectionFromInfo()

```ts
function getPrismaSelectionFromInfo(info, opts?): 
  | {
[key: string]: RecurSelect;
}
  | undefined;
```

Defined in: [IdeaProjects/kit/kit/src/nest/decorators/prisma-selection.decorator.ts:49](https://github.com/iagurban/kit/blob/78aea32be2811f93b17aa1de9430feb1fbc049c8/src/nest/decorators/prisma-selection.decorator.ts#L49)

Extracts the Prisma selection object from a GraphQL info object.

## Parameters

### info

`GqlContextInfo`

The GraphQL info object.

### opts?

`BasicSelectionArgs`\<`Record`\<`never`, `never`\>\>

Options for the selection.

## Returns

  \| \{
\[`key`: `string`\]: `RecurSelect`;
\}
  \| `undefined`

The Prisma selection object.
