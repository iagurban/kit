# Function: prismaSelectionFromGqlExecutionCtx()

```ts
function prismaSelectionFromGqlExecutionCtx(ctx, opts): 
  | {
[key: string]: RecurSelect;
}
  | undefined;
```

Defined in: [IdeaProjects/kit/kit/src/nest/decorators/prisma-selection.decorator.ts:70](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/decorators/prisma-selection.decorator.ts#L70)

Extracts the Prisma selection object from a GraphQL execution context.

## Parameters

### ctx

`GqlExecutionContext`

The GraphQL execution context.

### opts

`BasicSelectionArgs`\<`Record`\<`never`, `never`\>\>

Options for the selection.

## Returns

  \| \{
\[`key`: `string`\]: `RecurSelect`;
\}
  \| `undefined`

The Prisma selection object.
