# Variable: PrismaSelection()

```ts
const PrismaSelection: (...dataOrPipes) => ParameterDecorator;
```

Defined in: [IdeaProjects/kit/kit/src/nest/decorators/prisma-selection.decorator.ts:80](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/decorators/prisma-selection.decorator.ts#L80)

A decorator that extracts the Prisma selection object from a GraphQL execution context.

## Parameters

### dataOrPipes

...(
  \| `BasicSelectionArgs`\<`Record`\<`never`, `never`\>\>
  \| `PipeTransform`\<`any`, `any`\>
  \| `Type`\<`PipeTransform`\<`any`, `any`\>\>)[]

## Returns

`ParameterDecorator`
