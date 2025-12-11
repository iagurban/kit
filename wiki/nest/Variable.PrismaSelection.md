# Variable: PrismaSelection()

```ts
const PrismaSelection: (...dataOrPipes) => ParameterDecorator;
```

Defined in: [IdeaProjects/kit/kit/src/nest/decorators/prisma-selection.decorator.ts:80](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/nest/decorators/prisma-selection.decorator.ts#L80)

A decorator that extracts the Prisma selection object from a GraphQL execution context.

## Parameters

### dataOrPipes

...(
  \| `BasicSelectionArgs`\<`Record`\<`never`, `never`\>\>
  \| `PipeTransform`\<`any`, `any`\>
  \| `Type`\<`PipeTransform`\<`any`, `any`\>\>)[]

## Returns

`ParameterDecorator`
