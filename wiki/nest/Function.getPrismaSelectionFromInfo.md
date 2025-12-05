# Function: getPrismaSelectionFromInfo()

```ts
function getPrismaSelectionFromInfo(info, opts?): 
  | {
[key: string]: RecurSelect;
}
  | undefined;
```

Defined in: [IdeaProjects/kit/kit/src/nest/decorators/prisma-selection.decorator.ts:49](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/decorators/prisma-selection.decorator.ts#L49)

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
